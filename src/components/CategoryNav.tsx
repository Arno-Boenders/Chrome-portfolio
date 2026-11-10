'use client'
import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';

export interface Category { id: string; label: string }

interface Props {
    categories: Category[];
    active: string;
    basePath: string;
    className?: string;
}

// One underline bar that slides between tabs (transform only), instead of each
// tab drawing its own border. Before hydration each tab keeps its own border,
// so the page is correct without JavaScript.
export default function CategoryNav({ categories, active, basePath, className = '' }: Props) {
    // Optimistic: highlight the tapped tab now, not after the server answers.
    const [current, setCurrent] = useState(active);
    const [bar, setBar] = useState<{ x: number; w: number } | null>(null);
    const [animate, setAnimate] = useState(false);
    const links = useRef<Record<string, HTMLAnchorElement | null>>({});

    // Keep in sync with the server's answer (back/forward, direct URL).
    const [lastActive, setLastActive] = useState(active);
    if (active !== lastActive) {
        setLastActive(active);
        setCurrent(active);
    }

    useLayoutEffect(() => {
        const measure = () => {
            const el = links.current[current];
            if (el) setBar({ x: el.offsetLeft, w: el.offsetWidth });
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [current]);

    // Enable the transition only after the first placement, so it never slides in from 0 on load.
    useLayoutEffect(() => {
        if (bar && !animate) requestAnimationFrame(() => setAnimate(true));
    }, [bar, animate]);

    return (
        <nav className={className} aria-label="Result types">
            <ul className="relative flex gap-6 text-sm overflow-x-auto whitespace-nowrap">
                {categories.map((c) => {
                    const isActive = c.id === current;
                    const href = c.id === 'all' ? basePath : `${basePath}${basePath.includes('?') ? '&' : '?'}tab=${c.id}`;
                    return (
                        <li key={c.id}>
                            <Link
                                ref={(el) => { links.current[c.id] = el; }}
                                href={href}
                                onClick={() => setCurrent(c.id)}
                                aria-current={isActive ? 'page' : undefined}
                                className={`no-select inline-block pt-3 pb-2.5 border-b-[3px] transition-colors duration-150 ${bar ? 'border-transparent' : isActive ? 'border-accent' : 'border-transparent'} ${isActive ? 'text-accent' : 'text-muted hover:text-ink'}`}
                            >
                                {c.label}
                            </Link>
                        </li>
                    );
                })}
                {bar && (
                    <span
                        aria-hidden
                        className={`absolute left-0 bottom-0 h-[3px] w-px origin-left rounded-t-full bg-accent ${animate ? 'transition-transform duration-200 ease-[var(--ease-out)] motion-reduce:transition-none' : ''}`}
                        style={{ transform: `translateX(${bar.x}px) scaleX(${bar.w})` }}
                    />
                )}
            </ul>
        </nav>
    );
}
