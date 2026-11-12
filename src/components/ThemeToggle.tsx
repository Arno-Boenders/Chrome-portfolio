'use client'
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@context/ThemeContext';

// Icons switch via the `dark` class, so they are right on first paint.
// `pill` is the toolbar version: dark mode is this browser's "Incognito".
export default function ThemeToggle({ pill = false }: { pill?: boolean }) {
    const { toggleTheme } = useTheme();
    const icon = 'absolute w-[18px] h-[18px] transition-[opacity,transform,filter] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none';
    return (
        <button
            type="button"
            onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
            }}
            aria-label="Toggle dark mode"
            title={pill ? 'Incognito is dark mode' : 'Toggle dark mode'}
            className={`pressable flex items-center justify-center text-ink hover:bg-hover cursor-pointer rounded-full ${pill ? 'h-8 gap-2 pl-2 pr-3 ml-1 border border-line text-[12.5px] whitespace-nowrap' : 'w-10 h-10'}`}
        >
            {/* Cross-fade with a touch of blur so the swap reads as one icon morphing. */}
            <span className="relative w-[18px] h-[18px] grid place-items-center">
                <Moon className={`${icon} dark:opacity-0 dark:scale-75 dark:-rotate-45 dark:blur-[2px]`} strokeWidth={1.75} />
                <Sun className={`${icon} opacity-0 scale-75 rotate-45 blur-[2px] dark:opacity-100 dark:scale-100 dark:rotate-0 dark:blur-none`} strokeWidth={1.75} />
            </span>
            {pill && <span>Incognito</span>}
        </button>
    );
}
