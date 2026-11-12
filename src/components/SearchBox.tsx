'use client'
import { Search } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface Props {
    defaultValue?: string;
    hero?: boolean;            // the large box on the landing page
    typing?: string[];         // queries the placeholder types out, one after another
    className?: string;
}

const PLACEHOLDER = 'Search projects, skills…';

export default function SearchBox({ defaultValue = '', hero = false, typing, className = '' }: Props) {
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const el = input.current;
        if (!el || !typing?.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let query = 0, chars = 0;
        const id = setInterval(() => {
            const text = typing[query];
            chars++;
            el.placeholder = text.slice(0, chars);
            // Hold the finished query for a moment, then start the next one.
            if (chars > text.length + 18) { chars = 0; query = (query + 1) % typing.length; }
        }, 70);
        return () => { clearInterval(id); el.placeholder = PLACEHOLDER; };
    }, [typing]);

    return (
        <form action="/search" role="search" className={`w-full min-w-0 ${className}`}>
            <label className={`flex items-center rounded-full border border-line bg-bar shadow-sm transition-shadow duration-200 hover:shadow-md focus-within:shadow-md ${hero ? 'h-[52px] pl-[22px] pr-1.5' : 'h-11 pl-4 pr-0.5'}`}>
                <span className="sr-only">Search Arno&apos;s portfolio</span>
                <input
                    ref={input}
                    type="search"
                    name="q"
                    data-search-input
                    enterKeyHint="search"
                    autoCapitalize="none"
                    autoComplete="off"
                    defaultValue={defaultValue}
                    placeholder={PLACEHOLDER}
                    className="flex-1 min-w-0 h-full bg-transparent outline-none text-base text-ink placeholder:text-muted"
                />
                <button type="submit" aria-label="Search" className="pressable w-10 h-10 shrink-0 grid place-items-center rounded-full text-accent hover:bg-hover cursor-pointer">
                    <Search className="w-5 h-5" />
                </button>
            </label>
        </form>
    );
}
