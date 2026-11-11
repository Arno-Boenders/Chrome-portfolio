'use client'
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

// Runs in <head> before first paint so there is no light/dark flash.
// A saved choice wins; otherwise follow the browser/OS setting.
export const themeScript = `(function(){document.documentElement.classList.add('js');try{
var s=localStorage.getItem('${STORAGE_KEY}');
var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.classList.toggle('dark',d);
if(s){document.querySelectorAll('meta[name=theme-color]').forEach(function(m){m.setAttribute('content',d?'#303134':'#f1f3f4')})}
}catch(e){}})()`;

type Origin = { x: number; y: number };

const ThemeContext = createContext<{ isDarkMode: boolean; toggleTheme: (origin?: Origin) => void }>({
    isDarkMode: false,
    toggleTheme: () => { },
});

const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';

const apply = (dark: boolean) => {
    document.documentElement.classList.toggle('dark', dark);
    // Status bar follows the chosen theme, not just the OS one.
    document.querySelectorAll('meta[name=theme-color]').forEach((m) => m.setAttribute('content', dark ? '#303134' : '#f1f3f4'));
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setIsDarkMode(document.documentElement.classList.contains('dark'));
        try { localStorage.removeItem('dark-mode'); } catch { } // old key, always set to "false"

        // Keep following the OS setting until the visitor picks a theme themselves.
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = (e: MediaQueryListEvent) => {
            let saved: string | null = null;
            try { saved = localStorage.getItem(STORAGE_KEY); } catch { }
            if (saved) return;
            apply(e.matches);
            setIsDarkMode(e.matches);
        };
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, []);

    // Rare, once-a-visit action: the new theme grows as a circle from the toggle.
    // Reduced motion gets the browser's plain cross-fade; no View Transitions support = instant.
    const toggleTheme = useCallback((origin?: Origin) => {
        const root = document.documentElement;
        const next = !root.classList.contains('dark');
        const commit = () => {
            apply(next);
            setIsDarkMode(next);
            try { localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light'); } catch { }
        };

        if (!document.startViewTransition) return commit();
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce || !origin) return void document.startViewTransition(commit);

        const { x, y } = origin;
        const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        root.dataset.themeReveal = '';
        const transition = document.startViewTransition(commit);
        transition.ready.then(() => {
            root.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
                { duration: 400, easing: EASE_OUT, pseudoElement: '::view-transition-new(root)' }
            );
        });
        transition.finished.finally(() => delete root.dataset.themeReveal);
    }, []);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
