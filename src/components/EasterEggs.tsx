'use client'
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

export type Egg = 'gravity' | 'barrel-roll' | 'askew';
const EVENT = 'easter-egg';

/** Searches that set off an easter egg instead of a search. */
export function eggFor(query: string): Egg | null {
    const q = query.trim().toLowerCase();
    if (/^(google )?gravity$/.test(q)) return 'gravity';
    if (/^(do a )?barrel roll$/.test(q)) return 'barrel-roll';
    if (/^(askew|tilt)$/.test(q)) return 'askew';
    return null;
}

export const runEgg = (egg: Egg) => window.dispatchEvent(new CustomEvent<Egg>(EVENT, { detail: egg }));

// What becomes a falling object: whole links and buttons, headings and paragraphs, and each wordmark letter.
const UNITS = '.wordmark-drop > span, a, button, label, h1, h2, h3, p, details, dt, dd > span, .overview, .shot';

function collectUnits(root: HTMLElement): HTMLElement[] {
    const chosen: HTMLElement[] = [];
    for (const el of root.querySelectorAll<HTMLElement>(UNITS)) {
        // Skip anything inside a unit we already have, and any wrapper around one.
        if (chosen.some((c) => c.contains(el)) || el.querySelector(UNITS.split(', ')[0])) continue;
        const r = el.getBoundingClientRect();
        const onScreen = r.bottom > 0 && r.top < innerHeight && r.width > 8 && r.height > 8;
        if (onScreen && getComputedStyle(el).visibility !== 'hidden') chosen.push(el);
    }
    return chosen;
}

/** Hidden extras, set off from the search box. Gravity drops the page's contents to the floor and lets you throw them around. */
export default function EasterEggs() {
    const pathname = usePathname();
    const [gravity, setGravity] = useState(false);
    const stop = useRef<(() => void) | null>(null);

    const stopGravity = useCallback(() => {
        stop.current?.();
        stop.current = null;
        setGravity(false);
    }, []);

    const startGravity = useCallback(async () => {
        if (stop.current) return;
        const root = document.querySelector<HTMLElement>('.page-enter');
        if (!root) return;
        const { Bodies, Body, Composite, Constraint, Engine, Query } = (await import('matter-js')).default;

        const top = document.querySelector('header')?.getBoundingClientRect().bottom ?? 0;
        const units = collectUnits(root);
        const engine = Engine.create({ gravity: { x: 0, y: 1.1 } });
        const items = units.map((el) => {
            const r = el.getBoundingClientRect();
            const body = Bodies.rectangle(r.left + r.width / 2, r.top + r.height / 2, r.width, r.height, { restitution: 0.25, friction: 0.5, frictionAir: 0.012 });
            Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04);
            el.style.transition = 'none';
            el.style.willChange = 'transform';
            return { el, body, x: body.position.x, y: body.position.y };
        });
        const wall = (x: number, y: number, w: number, h: number) => Bodies.rectangle(x, y, w, h, { isStatic: true });
        const T = 200; // wall thickness, thick enough that nothing tunnels through
        Composite.add(engine.world, [
            ...items.map((i) => i.body),
            wall(innerWidth / 2, innerHeight + T / 2, innerWidth * 3, T),
            wall(-T / 2, innerHeight / 2, T, innerHeight * 4),
            wall(innerWidth + T / 2, innerHeight / 2, T, innerHeight * 4),
            wall(innerWidth / 2, top - T / 2 - innerHeight, innerWidth * 3, T),
        ]);

        // Dragging: a soft spring between the pointer and the point where the object was grabbed.
        let grab: Matter.Constraint | null = null;
        const down = (e: PointerEvent) => {
            const point = { x: e.clientX, y: e.clientY };
            const body = Query.point(items.map((i) => i.body), point)[0];
            if (!body) return;
            e.preventDefault();
            grab = Constraint.create({ pointA: point, bodyB: body, pointB: { x: point.x - body.position.x, y: point.y - body.position.y }, stiffness: 0.12, damping: 0.1, length: 0 });
            Composite.add(engine.world, grab);
        };
        const move = (e: PointerEvent) => { if (grab) grab.pointA = { x: e.clientX, y: e.clientY }; };
        const up = () => { if (grab) Composite.remove(engine.world, grab); grab = null; };
        // Fallen links should be thrown, not followed.
        const click = (e: MouseEvent) => { if (root.contains(e.target as Node)) { e.preventDefault(); e.stopPropagation(); } };
        const key = (e: KeyboardEvent) => { if (e.key === 'Escape') stopGravity(); };

        document.addEventListener('pointerdown', down);
        document.addEventListener('pointermove', move);
        document.addEventListener('pointerup', up);
        document.addEventListener('pointercancel', up);
        document.addEventListener('click', click, true);
        document.addEventListener('keydown', key);
        document.documentElement.classList.add('gravity-on');

        let frame = 0, last = performance.now();
        const tick = (now: number) => {
            Engine.update(engine, Math.min(now - last, 32));
            last = now;
            for (const i of items) {
                i.el.style.transform = `translate(${i.body.position.x - i.x}px, ${i.body.position.y - i.y}px) rotate(${i.body.angle}rad)`;
            }
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        setGravity(true);

        stop.current = () => {
            cancelAnimationFrame(frame);
            document.removeEventListener('pointerdown', down);
            document.removeEventListener('pointermove', move);
            document.removeEventListener('pointerup', up);
            document.removeEventListener('pointercancel', up);
            document.removeEventListener('click', click, true);
            document.removeEventListener('keydown', key);
            document.documentElement.classList.remove('gravity-on');
            // Everything flies back to where it belongs.
            for (const { el } of items) {
                el.style.transition = 'transform 700ms cubic-bezier(0.23, 1, 0.32, 1)';
                el.style.transform = '';
                setTimeout(() => { el.style.transition = ''; el.style.willChange = ''; }, 750);
            }
        };
    }, [stopGravity]);

    useEffect(() => {
        const onEgg = (e: Event) => {
            const egg = (e as CustomEvent<Egg>).detail;
            const page = document.body;
            if (egg === 'gravity') startGravity();
            if (egg === 'askew') page.classList.toggle('egg-askew');
            if (egg === 'barrel-roll') {
                page.classList.remove('egg-roll');
                void page.offsetWidth; // restart the animation if it is asked for twice
                page.classList.add('egg-roll');
                page.addEventListener('animationend', () => page.classList.remove('egg-roll'), { once: true });
            }
        };
        window.addEventListener(EVENT, onEgg);
        return () => window.removeEventListener(EVENT, onEgg);
    }, [startGravity]);

    // Going to another page puts everything back.
    useEffect(() => stopGravity, [pathname, stopGravity]);

    if (!gravity) return null;
    return (
        <button
            type="button"
            onClick={stopGravity}
            className="rise pressable fixed z-50 left-1/2 -translate-x-1/2 bottom-[max(20px,env(safe-area-inset-bottom))] px-5 py-2.5 rounded-full bg-ink text-page text-sm font-medium shadow-lg cursor-pointer"
        >
            Put everything back
        </button>
    );
}
