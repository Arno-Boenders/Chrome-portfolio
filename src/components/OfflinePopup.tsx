'use client'
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import OfflineRunner from './OfflineRunner';
import { btn } from '@/lib/ui';

// Pages that already have the game, or where a popup would get in the way.
const SKIP = ['/offline', '/cv'];

/**
 * Easter egg: one in five page refreshes opens the "no internet" game in a popup.
 * Only on a refresh (not on a first visit or when following a link), and never twice in one session.
 */
export default function OfflinePopup() {
    const pathname = usePathname();
    const dialog = useRef<HTMLDialogElement>(null);
    const game = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
        if (nav?.type !== 'reload' || Math.random() >= 0.2) return;
        if (SKIP.includes(pathname) || pathname.startsWith('/games/') || document.querySelector('canvas[data-runner]')) return;
        try {
            if (sessionStorage.getItem('offline-popup-seen')) return;
            sessionStorage.setItem('offline-popup-seen', '1');
        } catch { /* storage blocked: show it anyway */ }
        // Let the page settle first, so it reads as a hiccup rather than a broken load.
        const id = setTimeout(() => setShow(true), 700);
        return () => clearTimeout(id);
        // Only on the first render after a load.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!show) return;
        dialog.current?.showModal();
        // Focus the game, not the button, so Space jumps instead of closing the popup.
        game.current?.focus();
    }, [show]);

    if (!show) return null;
    return (
        <dialog
            ref={dialog}
            onClose={() => setShow(false)}
            onClick={(e) => { if (e.target === dialog.current) dialog.current?.close(); }}
            aria-labelledby="offline-popup-title"
            className="offline-popup m-auto w-[min(760px,calc(100vw-32px))] max-h-[calc(100dvh-32px)] overflow-auto rounded-2xl border border-line bg-page text-ink p-0 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
        >
            <div ref={game} tabIndex={-1} className="no-focus-ring pt-6">
                <OfflineRunner />
            </div>
            <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <h2 id="offline-popup-title" className="mt-4 font-display font-medium text-2xl leading-tight">No internet</h2>
                <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.6] text-snippet">
                    Just kidding. Every now and then a refresh lands you here. Jump a few bugs with Space or a tap, or head back to the site.
                </p>
                <button type="button" onClick={() => dialog.current?.close()} className={`${btn} mt-5`}>Back to the site</button>
            </div>
        </dialog>
    );
}
