'use client'
import { useEffect, useRef } from 'react';

// One observer for every Reveal on the page.
let observer: IntersectionObserver | null = null;
function getObserver() {
    observer ??= new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                (entry.target as HTMLElement).dataset.visible = '';
                observer!.unobserve(entry.target);
            }
        },
        { rootMargin: '0px 0px -6% 0px' }
    );
    return observer;
}

interface Props {
    as?: 'div' | 'li' | 'article' | 'section';
    index?: number;       // delays the entrance by its place in a row, so siblings cascade
    className?: string;
    children: React.ReactNode;
}

/** Rises into place the first time it scrolls into view. The motion itself lives in globals.css. */
export default function Reveal({ as: Tag = 'div', index = 0, className, children }: Props) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = getObserver();
        io.observe(el);
        return () => io.unobserve(el);
    }, []);

    return (
        // @ts-expect-error -- one ref type for the handful of plain tags allowed above
        <Tag ref={ref} data-reveal className={className} style={{ '--i': index } as React.CSSProperties}>
            {children}
        </Tag>
    );
}
