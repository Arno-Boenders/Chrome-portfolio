'use client'
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import OfflineRunner from './OfflineRunner';
import { btn } from '@/lib/ui';

// Pages that already have the game, or where a popup would get in the way.
const SKIP = ['/offline', '/cv'];

export const SITE_RELOAD = 'site-reload';
const CHANCE = 0.2;

/**
 * Easter egg: one in five reloads opens the "no internet" game in a popup.
 * Works with the site's own reload button (every press rolls the dice) and with a real browser refresh
 * (at most once per session, so it never blocks someone who refreshes to fix something).
 */
export default function OfflinePopup() {
    const pathname = usePathname();
    const dialog = useRef<HTMLDialogElement>(null);
    const game = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);
    const path = useRef(pathname);
    path.current = pathname;

    const allowed = () =>
        !SKIP.includes(path.current) && !path.current.startsWith('/games/') && !document.querySelector('canvas[data-runner]');

    // A real browser refresh.
    useEffect(() => {
        const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
        if (nav?.type !== 'reload' || Math.random() >= CHANCE || !allowed()) return;
        try {
            if (sessionStorage.getItem('offline-popup-seen')) return;
            sessionStorage.setItem('offline-popup-seen', '1');
        } catch { /* storage blocked: show it anyway */ }
        // Let the page settle first, so it reads as a hiccup rather than a broken load.
        const id = setTimeout(() => setShow(true), 700);
        return () => clearTimeout(id);
    }, []);   // only on the first render after a load

    // The reload button in the site's toolbar.
    useEffect(() => {
        const onReload = () => { if (Math.random() < CHANCE && allowed()) setShow(true); };
        addEventListener(SITE_RELOAD, onReload);
        return () => removeEventListener(SITE_RELOAD, onReload);
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
