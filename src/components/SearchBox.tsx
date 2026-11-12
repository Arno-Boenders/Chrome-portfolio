'use client'
import { Search, Sparkles } from 'lucide-react';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { projectCards } from '@/data/projects';
import { runEgg, type Egg } from './EasterEggs';

interface Props {
    defaultValue?: string;
    hero?: boolean;            // the large box on the landing page
    typing?: string[];         // queries the placeholder types out, one after another
    className?: string;
}

type Suggestion = { label: string; hint: string } & ({ href: string } | { egg: Egg });

const PLACEHOLDER = 'Search projects, skills…';

// What the dropdown offers: the two newest projects, then the three easter eggs.
const SUGGESTIONS: Suggestion[] = [
    ...projectCards.slice(0, 2).map((p) => ({ label: p.title.toLowerCase(), hint: 'Project', href: `/projects/${p.slug}` })),
    { label: 'gravity', hint: 'Try it', egg: 'gravity' },
    { label: 'do a barrel roll', hint: 'Try it', egg: 'barrel-roll' },
    { label: 'askew', hint: 'Try it', egg: 'askew' },
];

export default function SearchBox({ defaultValue = '', hero = false, typing, className = '' }: Props) {
    const router = useRouter();
    const input = useRef<HTMLInputElement>(null);
    const listId = useId();
    const [open, setOpen] = useState(false);
    const [text, setText] = useState(defaultValue);
    const [active, setActive] = useState(-1);

    useEffect(() => {
        const el = input.current;
        if (!el || !typing?.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let query = 0, chars = 0;
        const id = setInterval(() => {
            const phrase = typing[query];
            chars++;
            el.placeholder = phrase.slice(0, chars);
            // Hold the finished query for a moment, then start the next one.
            if (chars > phrase.length + 18) { chars = 0; query = (query + 1) % typing.length; }
        }, 70);
        return () => { clearInterval(id); el.placeholder = PLACEHOLDER; };
    }, [typing]);

    // Typing narrows the list; the query the page was opened with doesn't.
    const typed = text.trim().toLowerCase();
    const items = typed && text !== defaultValue ? SUGGESTIONS.filter((s) => s.label.includes(typed)) : SUGGESTIONS;
    const showing = open && items.length > 0;

    const choose = (s: Suggestion) => {
        setOpen(false);
        setActive(-1);
        input.current?.blur();
        if ('egg' in s) runEgg(s.egg);
        else router.push(s.href);
    };

    return (
        <Form
            action="/search"
            role="search"
            className={`relative w-full min-w-0 ${showing ? 'z-30' : ''} ${className}`}
            onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) { setOpen(false); setActive(-1); } }}
            onSubmit={() => setOpen(false)}
        >
            <label className={`flex items-center border border-line bg-bar shadow-sm transition-shadow duration-200 hover:shadow-md focus-within:shadow-md ${hero ? 'h-[52px] pl-[22px] pr-1.5 rounded-[26px]' : 'h-11 pl-4 pr-0.5 rounded-[22px]'} ${showing ? 'rounded-b-none border-b-transparent' : ''}`}>
                <span className="sr-only">Search Arno&apos;s portfolio</span>
                <input
                    ref={input}
                    type="search"
                    name="q"
                    data-search-input
                    role="combobox"
                    aria-expanded={showing}
                    aria-controls={listId}
                    aria-autocomplete="list"
                    aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
                    enterKeyHint="search"
                    autoCapitalize="none"
                    autoComplete="off"
                    value={text}
                    onChange={(e) => { setText(e.target.value); setOpen(true); setActive(-1); }}
                    onFocus={() => setOpen(true)}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') { setOpen(false); setActive(-1); return; }
                        if (!showing) { if (e.key === 'ArrowDown') setOpen(true); return; }
                        if (e.key === 'ArrowDown') { e.preventDefault(); setActive((active + 1) % items.length); }
                        if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active <= 0 ? items.length - 1 : active - 1); }
                        if (e.key === 'Enter' && active >= 0) { e.preventDefault(); choose(items[active]); }
                    }}
                    placeholder={PLACEHOLDER}
                    className="flex-1 min-w-0 h-full bg-transparent outline-none text-base text-ink placeholder:text-muted"
                />
                <button type="submit" aria-label="Search" className="pressable w-10 h-10 shrink-0 grid place-items-center rounded-full text-accent hover:bg-hover cursor-pointer">
                    <Search className="w-5 h-5" />
                </button>
            </label>

            {showing && (
                <ul
                    id={listId}
                    role="listbox"
                    aria-label="Suggestions"
                    className={`dropdown-in absolute left-0 right-0 top-full pb-2 border border-t-0 border-line bg-bar shadow-md text-left ${hero ? 'rounded-b-[26px]' : 'rounded-b-[22px]'}`}
                >
                    <li aria-hidden className="mx-4 mb-1.5 border-t border-line" />
                    {items.map((s, i) => (
                        <li key={s.label} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                            <button
                                type="button"
                                tabIndex={-1}
                                // Keep focus in the input so the list doesn't close before the click lands.
                                onMouseDown={(e) => e.preventDefault()}
                                onMouseEnter={() => setActive(i)}
                                onClick={() => choose(s)}
                                className={`w-full flex items-center gap-3 py-2 text-left text-[15px] text-ink cursor-pointer ${hero ? 'px-[22px]' : 'px-4'} ${i === active ? 'bg-hover' : ''}`}
                            >
                                {'egg' in s
                                    ? <Sparkles className="w-4 h-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden />
                                    : <Search className="w-4 h-4 shrink-0 text-muted" strokeWidth={1.75} aria-hidden />}
                                <span className="flex-1 min-w-0 truncate">{s.label}</span>
                                <span className="text-xs text-muted">{s.hint}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </Form>
    );
}
