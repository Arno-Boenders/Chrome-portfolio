'use client'
import { useEffect, useRef, useState } from 'react';

export const SITE_RELOAD = 'site-reload';
const CHANCE = 0.2;
// Pages that already show the game, or where losing the page would get in the way.
const SKIP = ['/offline', '/cv'];

/**
 * Easter egg: one in five reloads "loses the connection" and the tab shows the offline game instead of the page.
 * Works with the site's own reload button (every press rolls the dice) and with a real browser refresh
 * (at most once per session, so it never blocks someone who refreshes to fix something).
 * Returns whether the tab is "offline" and a function that brings the page back.
 */
export function useOfflineMoment(pathname: string): [boolean, () => void] {
    const [offline, setOffline] = useState(false);
    const path = useRef(pathname);
    path.current = pathname;

    const allowed = () =>
        !SKIP.includes(path.current) && !path.current.startsWith('/games/') && !document.querySelector('canvas[data-runner]');

    // A real browser refresh.
    useEffect(() => {
        const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
        if (nav?.type !== 'reload' || Math.random() >= CHANCE || !allowed()) return;
        try {
            if (sessionStorage.getItem('offline-moment-seen')) return;
            sessionStorage.setItem('offline-moment-seen', '1');
        } catch { /* storage blocked: show it anyway */ }
        setOffline(true);
    }, []);   // only on the first render after a load

    // The reload button in the site's toolbar.
    useEffect(() => {
        const onReload = () => { if (Math.random() < CHANCE && allowed()) setOffline(true); };
        addEventListener(SITE_RELOAD, onReload);
        return () => removeEventListener(SITE_RELOAD, onReload);
    }, []);

    // Going to another page is like getting the connection back.
    useEffect(() => { setOffline(false); }, [pathname]);

    return [offline, () => setOffline(false)];
}
