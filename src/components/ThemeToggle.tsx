'use client'
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@context/ThemeContext';

// Icons switch via the `dark` class, so they are right on first paint.
export default function ThemeToggle() {
    const { toggleTheme } = useTheme();
    const icon = 'absolute w-5 h-5 transition-[opacity,transform,filter] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none';
    return (
        <button
            type="button"
            onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
            }}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
            className="pressable relative w-11 h-11 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-ink hover:bg-hover cursor-pointer"
        >
            {/* Cross-fade with a touch of blur so the swap reads as one icon morphing. */}
            <Moon className={`${icon} dark:opacity-0 dark:scale-75 dark:-rotate-45 dark:blur-[2px]`} strokeWidth={1.75} />
            <Sun className={`${icon} opacity-0 scale-75 rotate-45 blur-[2px] dark:opacity-100 dark:scale-100 dark:rotate-0 dark:blur-none`} strokeWidth={1.75} />
        </button>
    );
}
