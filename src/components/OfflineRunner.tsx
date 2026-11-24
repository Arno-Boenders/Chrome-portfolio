'use client'
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { profile } from '@/data/profile';

// ---- Pixel art -----------------------------------------------------------
// Each sprite is a grid of letters; every letter is one "pixel" in the colour below. "." is transparent.
// The runner is drawn from Arno's photo: short dark hair, light stubble, white shirt, sage-green blazer.

const COLORS: Record<string, string> = {
    H: '#2b211c', S: '#e8b896', s: '#c9906f', B: '#a9795d', E: '#1d1714', M: '#b4534c',
    W: '#f4f1ea', G: '#8c9b7d', g: '#6d7b60', P: '#2a2d33', K: '#141518',
    R: '#e5484d', r: '#ffb3b3', L: '#d6e6ff',
};

const BODY = [
    '.....HHHHH......',
    '....HHHHHHH.....',
    '....HHSSSSSS....',
    '...sHSSSSESS....',
    '...sSSSSSSSSS...',
    '....SSSSSSSS....',
    '....SBSSSMMS....',
    '.....BBBBBB.....',
    '.......SS.......',
    '.....gWWWg......',
    '....GGWWWGG.....',
    '...GGGWWWGGG....',
    '...GGgWWWGGG....',
    '...GgGWWGGGG....',
    '...GgGGWGGGG....',
    '...SgGGGGGGG....',
    '....GGGGGGG.....',
    '....PPPPPPP.....',
];
const RUN_A = [...BODY, '....PP...PP.....', '...PP.....PP....', '..PP.......PP...', '..KK.......KKK..'];
const RUN_B = [...BODY, '.....PP.PP......', '.....PP.PP......', '.....PP.PP......', '.....KKKKKK.....'];
const JUMP = [...BODY, '....PP..PP......', '....PP..PP......', '...KKK..KKK.....', '................'];
const DUCK = [
    '..........HHHHH.',
    '.........HHSSSS.',
    '........sHSSESSS',
    '...GGGGGGSSSSSS.',
    '..GGGWWWWSBMMS..',
    '..GGGGWWGGBBB...',
    '..GgGGGGGGG.....',
    '..GgGGGGGG......',
    '...PPPPPPPP.....',
    '...PP....PP.....',
    '..PP......PP....',
    '..KK......KKK...',
];
const BUG = [
    '..K......K..',
    '...K....K...',
    '....RRRR....',
    '.KRRRRRRRRK.',
    '..RRrRRrRR..',
    '.KRRRRRRRRK.',
    '..RRRRRRRR..',
    '.K..K..K..K.',
];
const FLY_A = [
    '..LL....LL..',
    '.LLLL..LLLL.',
    '..LLRRRRLL..',
    '...RRRRRR...',
    '..RRrRRrRR..',
    '...RRRRRR...',
    '....K..K....',
];
const FLY_B = [
    '............',
    '....RRRR....',
    '.LLRRRRRRLL.',
    'LLLLRRRRLLLL',
    '..RRrRRrRR..',
    '...RRRRRR...',
    '....K..K....',
];

const PX = 3;                 // size of one sprite pixel on screen
const HEIGHT = 220;           // canvas height in CSS pixels
const GROUND = 178;           // y of the ground line
const FADE = 64;              // width of the soft fade on the left and right edges
const RUNNER_X = FADE + 16;   // the runner stays clear of the fade
const GRAVITY = 2400, JUMP_SPEED = 790;

type Kind = 'bug' | 'bugs' | 'block' | 'fly' | 'skill';
interface Thing { kind: Kind; x: number; y: number; w: number; h: number; label?: string; taken?: boolean }

function drawSprite(ctx: CanvasRenderingContext2D, rows: string[], x: number, y: number) {
    for (let r = 0; r < rows.length; r++) {
        for (let c = 0; c < rows[r].length; c++) {
            const color = COLORS[rows[r][c]];
            if (!color) continue;
            ctx.fillStyle = color;
            ctx.fillRect(Math.round(x + c * PX), Math.round(y + r * PX), PX, PX);
        }
    }
}

const overlap = (a: { x: number; y: number; w: number; h: number }, b: { x: number; y: number; w: number; h: number }) =>
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

/**
 * The "no internet" game, with a pixel Arno instead of a dinosaur.
 * Space or ↑ (or a tap) jumps, ↓ ducks. Bugs end the run; skills are worth bonus commits.
 */
export default function OfflineRunner() {
    const canvas = useRef<HTMLCanvasElement>(null);
    const [result, setResult] = useState<{ score: number; best: number; skills: string[] } | null>(null);

    useEffect(() => {
        const el = canvas.current!;
        const ctx = el.getContext('2d')!;
        let W = 0;
        const colors = { ink: '#202124', muted: '#5f6368', line: '#dadce0', accent: '#1a73e8' };
        const readColors = () => {
            const css = getComputedStyle(document.documentElement);
            colors.ink = css.getPropertyValue('--ink').trim() || colors.ink;
            colors.muted = css.getPropertyValue('--muted').trim() || colors.muted;
            colors.line = css.getPropertyValue('--line').trim() || colors.line;
            colors.accent = css.getPropertyValue('--accent').trim() || colors.accent;
        };
        const resize = () => {
            const dpr = Math.min(devicePixelRatio || 1, 2);
            W = el.clientWidth;
            el.width = Math.round(W * dpr);
            el.height = Math.round(HEIGHT * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.imageSmoothingEnabled = false;
        };
        readColors();
        resize();
        const themeWatch = new MutationObserver(readColors);
        themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        const sizeWatch = new ResizeObserver(resize);
        sizeWatch.observe(el);

        let best = 0;
        try { best = Number(localStorage.getItem('arno-run-best')) || 0; } catch { /* storage blocked */ }

        // Game state
        let state: 'idle' | 'running' | 'over' = 'idle';
        let y = 0, vy = 0, ducking = false, speed = 0, distance = 0, bonus = 0, nextIn = 0, t = 0;
        let things: Thing[] = [];
        let skills = new Set<string>();
        const pebbles = Array.from({ length: 24 }, () => ({ x: Math.random() * 1200, w: 2 + Math.random() * 6 }));
        const scenery = Array.from({ length: 5 }, (_, i) => ({ x: i * 260 + Math.random() * 120, y: 30 + Math.random() * 60, text: ['</>', '{ }', '( )', '=>', '#'][i] }));

        const score = () => Math.floor(distance / 12) + bonus;

        const start = () => {
            state = 'running'; y = 0; vy = 0; ducking = false; speed = 380; distance = 0; bonus = 0; nextIn = 0.6;
            things = []; skills = new Set();
            setResult(null);
        };
        const jump = () => {
            if (state !== 'running') { start(); return; }
            if (y === 0) vy = -JUMP_SPEED;
        };
        const crash = () => {
            state = 'over';
            const s = score();
            best = Math.max(best, s);
            try { localStorage.setItem('arno-run-best', String(best)); } catch { /* storage blocked */ }
            setResult({ score: s, best, skills: [...skills] });
        };

        const spawn = () => {
            const roll = Math.random();
            const x = W + 20;
            if (roll < 0.22) {
                const label = profile.skills[Math.floor(Math.random() * profile.skills.length)];
                ctx.font = `600 12px Outfit, system-ui, sans-serif`;
                const w = ctx.measureText(label).width + 18;
                things.push({ kind: 'skill', x, y: GROUND - 96, w, h: 22, label });
            } else if (roll < 0.45 && distance > 1500) {
                // Flying bugs at three heights: jump over, duck under, or run under.
                const lift = [14, 54, 92][Math.floor(Math.random() * 3)];
                things.push({ kind: 'fly', x, y: GROUND - lift - FLY_A.length * PX, w: 12 * PX, h: FLY_A.length * PX });
            } else if (roll < 0.62) {
                things.push({ kind: 'block', x, y: GROUND - 44, w: 34, h: 44 });
            } else if (roll < 0.78) {
                things.push({ kind: 'bugs', x, y: GROUND - BUG.length * PX, w: 12 * PX * 2 + 4, h: BUG.length * PX });
            } else {
                things.push({ kind: 'bug', x, y: GROUND - BUG.length * PX, w: 12 * PX, h: BUG.length * PX });
            }
        };

        const runnerBox = () => {
            const rows = ducking && y === 0 ? DUCK : RUN_A;
            const h = rows.length * PX;
            // A little smaller than the sprite, so near misses feel fair.
            return { x: RUNNER_X + 3 * PX, y: GROUND + y - h + 2 * PX, w: 9 * PX, h: h - 3 * PX };
        };

        const update = (dt: number) => {
            t += dt;
            if (state !== 'running') return;
            speed = Math.min(920, speed + 11 * dt);
            distance += speed * dt;
            vy += GRAVITY * dt;
            y = Math.min(0, y + vy * dt);
            if (y === 0) vy = 0;
            nextIn -= dt;
            if (nextIn <= 0) { spawn(); nextIn = (0.75 + Math.random() * 0.9) * (520 / speed) + 0.35; }
            for (const th of things) th.x -= speed * dt;
            things = things.filter((th) => th.x + th.w > -20);
            for (const p of pebbles) { p.x -= speed * dt; if (p.x < -10) p.x += W + 20 + Math.random() * 60; }
            for (const s of scenery) { s.x -= speed * 0.15 * dt; if (s.x < -40) s.x += W + 120; }
            const me = runnerBox();
            for (const th of things) {
                if (!overlap(me, { x: th.x + 3, y: th.y + 3, w: th.w - 6, h: th.h - 4 })) continue;
                if (th.kind === 'skill') {
                    if (!th.taken) { th.taken = true; bonus += 25; skills.add(th.label!); }
                } else {
                    crash();
                    return;
                }
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, W, HEIGHT);
            ctx.font = `600 13px ui-monospace, Menlo, monospace`;
            ctx.fillStyle = colors.line;
            for (const s of scenery) ctx.fillText(s.text, s.x, s.y);

            ctx.fillStyle = colors.muted;
            ctx.fillRect(0, GROUND, W, 2);
            for (const p of pebbles) ctx.fillRect(p.x, GROUND + 6 + (p.w % 3) * 4, p.w, 2);

            for (const th of things) {
                if (th.kind === 'bug') drawSprite(ctx, BUG, th.x, th.y);
                else if (th.kind === 'bugs') { drawSprite(ctx, BUG, th.x, th.y); drawSprite(ctx, BUG, th.x + 12 * PX + 4, th.y); }
                else if (th.kind === 'fly') drawSprite(ctx, Math.floor(t * 8) % 2 ? FLY_A : FLY_B, th.x, th.y);
                else if (th.kind === 'block') {
                    ctx.fillStyle = colors.ink;
                    ctx.fillRect(th.x, th.y, th.w, th.h);
                    ctx.font = `700 11px ui-monospace, Menlo, monospace`;
                    ctx.textAlign = 'center';
                    ctx.fillStyle = colors.line;
                    ctx.fillText('404', th.x + th.w / 2, th.y + 26);
                    ctx.textAlign = 'left';
                } else if (!th.taken) {
                    ctx.beginPath();
                    ctx.roundRect(th.x, th.y, th.w, th.h, th.h / 2);
                    ctx.strokeStyle = colors.accent; ctx.lineWidth = 2; ctx.stroke();
                    ctx.fillStyle = colors.ink; ctx.font = `600 12px Outfit, system-ui, sans-serif`;
                    ctx.fillText(th.label!, th.x + 9, th.y + 15);
                }
            }

            const rows = state === 'running' && y < 0 ? JUMP
                : state === 'running' && ducking ? DUCK
                : state === 'running' ? (Math.floor(distance / 38) % 2 ? RUN_A : RUN_B)
                : RUN_A;
            drawSprite(ctx, rows, RUNNER_X, GROUND + y - rows.length * PX);

            ctx.fillStyle = colors.muted;
            ctx.font = `600 14px ui-monospace, Menlo, monospace`;
            ctx.textAlign = 'right';
            const label = `${best ? `best ${best.toLocaleString('en')}   ` : ''}${score().toLocaleString('en')} commits`;
            ctx.fillText(label, W - FADE, 24);
            ctx.textAlign = 'center';
            ctx.fillStyle = colors.ink;
            ctx.font = `600 16px Outfit, system-ui, sans-serif`;
            if (state === 'idle') ctx.fillText('Press Space or tap to run', W / 2, 92);
            if (state === 'over') {
                ctx.fillText('A bug got you.', W / 2, 82);
                ctx.fillStyle = colors.muted;
                ctx.font = `500 14px Outfit, system-ui, sans-serif`;
                ctx.fillText('Space or tap to try again', W / 2, 106);
            }
            ctx.textAlign = 'left';
        };

        let last = performance.now(), raf = 0;
        const loop = (now: number) => {
            update(Math.min((now - last) / 1000, 1 / 30));
            last = now;
            draw();
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        // Keys work anywhere on the page, except while typing in a field.
        const typing = (e: KeyboardEvent) => e.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
        const onKey = (e: KeyboardEvent) => {
            if (typing(e) || e.metaKey || e.ctrlKey || e.altKey) return;
            if (e.code === 'Space' || e.key === 'ArrowUp') { e.preventDefault(); jump(); }
            if (e.key === 'ArrowDown' && state === 'running') { e.preventDefault(); ducking = true; }
        };
        const onKeyUp = (e: KeyboardEvent) => { if (e.key === 'ArrowDown') ducking = false; };
        // Touch: tap to jump, swipe down to duck.
        let touchY = 0;
        const onDown = (e: PointerEvent) => { touchY = e.clientY; jump(); };
        const onMove = (e: PointerEvent) => { if (e.buttons && e.clientY - touchY > 24 && state === 'running') ducking = true; };
        const onUp = () => { ducking = false; };
        addEventListener('keydown', onKey);
        addEventListener('keyup', onKeyUp);
        el.addEventListener('pointerdown', onDown);
        el.addEventListener('pointermove', onMove);
        addEventListener('pointerup', onUp);

        return () => {
            cancelAnimationFrame(raf);
            themeWatch.disconnect();
            sizeWatch.disconnect();
            removeEventListener('keydown', onKey);
            removeEventListener('keyup', onKeyUp);
            el.removeEventListener('pointerdown', onDown);
            el.removeEventListener('pointermove', onMove);
            removeEventListener('pointerup', onUp);
        };
    }, []);

    return (
        <div>
            <canvas
                ref={canvas}
                data-runner
                aria-label="Running game: a pixel Arno jumps over bugs. Press Space or tap to jump, down arrow to duck."
                className="block w-full touch-none select-none outline-none [-webkit-tap-highlight-color:transparent]"
                // Obstacles fade in on the right and out on the left instead of popping at a hard edge.
                style={{
                    height: HEIGHT,
                    maskImage: `linear-gradient(to right, transparent, #000 ${FADE}px, #000 calc(100% - ${FADE}px), transparent)`,
                    WebkitMaskImage: `linear-gradient(to right, transparent, #000 ${FADE}px, #000 calc(100% - ${FADE}px), transparent)`,
                }}
            />
            <p className="sr-only" aria-live="polite">{result ? `Game over. ${result.score} commits.` : ''}</p>
            {result && result.skills.length > 0 && (
                <p className="rise mt-3 flex flex-wrap items-center gap-1.5 text-sm text-muted">
                    Skills picked up:
                    {result.skills.map((s) => <span key={s} className="px-2.5 py-0.5 rounded-full bg-chip text-xs text-ink">{s}</span>)}
                    <Link href="/experience" className="ml-1 text-link hover:underline">See where I use them</Link>
                </p>
            )}
        </div>
    );
}
