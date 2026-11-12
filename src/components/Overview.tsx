'use client'
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

// The summary card at the top of a results page. It types itself out once per visit to the page.
// The full text is always in the markup (search engines, screen readers, no JS); the typed copy sits on top of it.
export default function Overview({ text, multicolor = false }: { text: string; multicolor?: boolean }) {
    // null = not started (server render), a number = characters typed so far, 'done' = finished.
    const [typed, setTyped] = useState<number | 'done' | null>(null);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setTyped('done'); return; }
        let chars = 0;
        setTyped(0);
        const id = setInterval(() => {
            chars += 4;
            if (chars >= text.length) { clearInterval(id); setTyped('done'); } else setTyped(chars);
        }, 16);
        return () => clearInterval(id);
    }, [text]);

    return (
        <section className={`overview ${multicolor ? 'overview-all' : ''} rounded-2xl px-5 py-5 sm:px-6`}>
            <h2 className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.08em] text-kind">
                <Sparkles className={`w-3.5 h-3.5 ${typeof typed === 'number' ? 'animate-pulse' : ''}`} strokeWidth={2} aria-hidden />Overview
            </h2>
            <p className="relative mt-1.5 max-w-[62ch] text-[17px] leading-[1.6] text-ink" data-typing={typed === 'done' ? 'done' : 'typing'}>
                <span className="overview-full">{text}</span>
                {typeof typed === 'number' && <span className="typing-caret absolute inset-0" aria-hidden>{text.slice(0, typed)}</span>}
            </p>
        </section>
    );
}
