'use client'
import { useEffect, useRef, useState } from 'react';

/**
 * Runs a game from public/play/<id>/ in the space below the browser bar.
 * It is fixed to the viewport, so the game gets the whole visible area like a real browser tab.
 */
export default function GameFrame({ id, title }: { id: string; title: string }) {
    const [top, setTop] = useState<number | null>(null);
    const frame = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const header = document.querySelector('header');
        if (!header) return;
        const measure = () => setTop(header.getBoundingClientRect().bottom);
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(header);
        addEventListener('resize', measure);
        // The page itself doesn't scroll while a game is open.
        document.documentElement.style.overflow = 'hidden';
        return () => {
            observer.disconnect();
            removeEventListener('resize', measure);
            document.documentElement.style.overflow = '';
        };
    }, []);

    return (
        <main id="main" tabIndex={-1} className="outline-none">
            <h1 className="sr-only">{title}</h1>
            <iframe
                ref={frame}
                src={`/play/${id}/index.html`}
                title={title}
                onLoad={() => frame.current?.contentWindow?.focus()}
                className="fixed inset-x-0 z-30 w-full border-0 bg-page"
                // An iframe keeps its default 150px height unless it gets one explicitly.
                style={{ top: top ?? 0, height: `calc(100dvh - ${top ?? 0}px)`, visibility: top === null ? 'hidden' : 'visible' }}
                allow="clipboard-write"
            />
        </main>
    );
}
