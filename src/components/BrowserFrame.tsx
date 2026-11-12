'use client'
import { ArrowLeft, ArrowRight, Plus, RotateCw, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { profile } from '@/data/profile';
import { curatedProjects, slugOf } from '@/data/projects';
import { describeTab } from '@/lib/tabs';
import EasterEggs, { eggFor, runEgg } from './EasterEggs';
import ThemeToggle from './ThemeToggle';

interface Tab { id: number; href: string }
interface Win { tabs: Tab[]; activeId: number }

const STORAGE_KEY = 'tabs';
const BOOKMARKS = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/experience', label: 'Experience' },
    { href: '/contact', label: 'Contact' },
    { href: '/cv', label: 'CV' },
];

const TabsContext = createContext<{ openInNewTab: (href: string) => void }>({ openInNewTab: () => { } });
export const useTabs = () => useContext(TabsContext);

// Reads the full address (path + query). Kept in its own Suspense boundary so
// pages can still be rendered statically.
function AddressSync({ onChange }: { onChange: (href: string) => void }) {
    const pathname = usePathname();
    const query = useSearchParams().toString();
    const href = query ? `${pathname}?${query}` : pathname;
    useEffect(() => onChange(href), [href, onChange]);
    return null;
}

// What the visitor typed in the address bar: a page of this site, or a search.
function resolveAddress(input: string): string {
    const text = input.trim().replace(/^arno:\/\//, '').replace(/^\//, '');
    if (!text) return '/';
    const path = `/${text.toLowerCase()}`;
    const pages = ['/about', '/projects', '/experience', '/contact', '/cv', ...curatedProjects.map((p) => `/projects/${slugOf(p.title)}`)];
    if (pages.includes(path)) return path;
    if (text.startsWith('search?')) return `/${text}`;
    return `/search?q=${encodeURIComponent(text)}`;
}

/** The browser window around every page: tabs, toolbar, bookmarks. */
export default function BrowserFrame({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [href, setHref] = useState(pathname);
    const [win, setWin] = useState<Win>({ tabs: [{ id: 1, href: pathname }], activeId: 1 });
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const restored = useRef(false);

    // Tabs survive a reload within the same browser tab.
    useEffect(() => {
        try {
            const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null') as Win | null;
            if (saved?.tabs?.length && saved.tabs.some((t) => t.id === saved.activeId)) setWin(saved);
        } catch { }
        restored.current = true;
    }, []);

    // Whatever page is showing belongs to the active tab.
    useEffect(() => {
        setWin((w) => ({ ...w, tabs: w.tabs.map((t) => (t.id === w.activeId ? { ...t, href } : t)) }));
        setAddress(describeTab(href).address);
        setLoading(false);
    }, [href]);

    // Any click on a link to another page of this site, or a search, starts the loading indicator.
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const link = (e.target as Element).closest?.('a[href]') as HTMLAnchorElement | null;
            if (!link || link.target === '_blank' || link.origin !== location.origin) return;
            if (link.pathname + link.search !== location.pathname + location.search) setLoading(true);
        };
        const onSubmit = (e: Event) => {
            // A few searches set off an easter egg instead of a search.
            const q = e.target instanceof HTMLFormElement ? new FormData(e.target).get('q') : null;
            const egg = typeof q === 'string' ? eggFor(q) : null;
            if (egg) {
                e.preventDefault();
                e.stopPropagation();
                runEgg(egg);
                return;
            }
            setLoading(true);
        };
        document.addEventListener('click', onClick, true);
        document.addEventListener('submit', onSubmit, true);
        return () => {
            document.removeEventListener('click', onClick, true);
            document.removeEventListener('submit', onSubmit, true);
        };
    }, []);

    // Never leave the indicator running if a navigation ends on the same address.
    useEffect(() => {
        if (!loading) return;
        const id = setTimeout(() => setLoading(false), 6000);
        return () => clearTimeout(id);
    }, [loading]);

    useEffect(() => {
        if (!restored.current) return;
        try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(win)); } catch { }
    }, [win]);

    // "/" jumps to the search box, like on the real thing.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const el = document.activeElement;
            if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey || (el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)))) return;
            const box = document.querySelector<HTMLInputElement>('[data-search-input]');
            if (!box) return;
            e.preventDefault();
            box.focus();
            box.select();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const nextId = () => Math.max(0, ...win.tabs.map((t) => t.id)) + 1;

    const openInNewTab = useCallback((target: string) => {
        setWin((w) => {
            const id = Math.max(0, ...w.tabs.map((t) => t.id)) + 1;
            return { tabs: [...w.tabs, { id, href: target }], activeId: id };
        });
        setLoading(true);
        router.push(target);
        window.scrollTo({ top: 0 });
    }, [router]);

    const selectTab = (tab: Tab) => {
        setWin({ ...win, activeId: tab.id });
        if (tab.href !== href) { setLoading(true); router.push(tab.href); }
    };

    const closeTab = (id: number) => {
        const rest = win.tabs.filter((t) => t.id !== id);
        if (rest.length === 0) {
            setWin({ tabs: [{ id: nextId(), href: '/' }], activeId: nextId() });
            if (href !== '/') router.push('/');
        } else if (id !== win.activeId) {
            setWin({ ...win, tabs: rest });
        } else {
            const next = rest[rest.length - 1];
            setWin({ tabs: rest, activeId: next.id });
            if (next.href !== href) router.push(next.href);
        }
    };

    const toolButton = 'pressable w-8 h-8 shrink-0 grid place-items-center rounded-full text-ink hover:bg-hover cursor-pointer';
    const bookmark = 'no-select flex items-center gap-1.5 px-2.5 py-2 sm:py-1 rounded-full whitespace-nowrap text-ink hover:bg-hover transition-colors duration-150';

    return (
        <TabsContext.Provider value={{ openInNewTab }}>
            <Suspense fallback={null}><AddressSync onChange={setHref} /></Suspense>
            <div className="min-h-dvh bg-page">
                <div>
                    <header className="relative sm:sticky sm:top-0 z-40 bg-bar border-b border-line print:hidden">
                        <div className="flex items-end gap-0.5 px-2 pt-2 bg-strip overflow-x-auto [scrollbar-width:none]">
                            <div className="hidden sm:flex items-center gap-2 pl-1.5 pr-2.5 pb-[11px]" aria-hidden>
                                <span className="w-3 h-3 bg-[#ff5f57] rounded-full" />
                                <span className="w-3 h-3 bg-[#febc2e] rounded-full" />
                                <span className="w-3 h-3 bg-[#28c840] rounded-full" />
                            </div>
                            {win.tabs.map((tab) => {
                                const info = describeTab(tab.href);
                                const active = tab.id === win.activeId;
                                return (
                                    <div key={tab.id} className={`tab-in group/tab no-select flex items-center h-[34px] min-w-[112px] flex-[0_1_210px] rounded-t-[9px] text-[12.5px] transition-colors duration-150 ${active ? 'bg-bar text-ink' : 'text-muted hover:bg-hover'}`}>
                                        <button type="button" onClick={() => selectTab(tab)} aria-current={active ? 'page' : undefined} className="flex-1 min-w-0 h-full flex items-center gap-2 pl-2.5 text-left cursor-pointer rounded-tl-[9px]">
                                            {active && loading
                                                ? <span className="tab-spinner w-4 h-4 shrink-0" aria-hidden />
                                                : <span className="w-4 h-4 shrink-0 rounded-[4px] grid place-items-center text-[10px] font-semibold font-display text-white" style={{ background: info.color }} aria-hidden>{info.letter}</span>}
                                            <span className="truncate">{info.title}</span>
                                        </button>
                                        <button type="button" onClick={() => closeTab(tab.id)} aria-label={`Close ${info.title}`} className="w-[22px] h-[22px] mx-1 shrink-0 grid place-items-center rounded-full hover:bg-hover cursor-pointer">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                );
                            })}
                            <button type="button" onClick={() => openInNewTab('/')} aria-label="New tab" className="pressable w-7 h-7 mb-[3px] ml-1 shrink-0 grid place-items-center rounded-full text-muted hover:bg-hover cursor-pointer">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5">
                            <button type="button" onClick={() => router.back()} className={toolButton} aria-label="Back"><ArrowLeft className="w-4 h-4" /></button>
                            <button type="button" onClick={() => router.forward()} className={toolButton} aria-label="Forward"><ArrowRight className="w-4 h-4" /></button>
                            <button type="button" onClick={() => router.refresh()} className={toolButton} aria-label="Reload"><RotateCw className="w-[15px] h-[15px]" /></button>
                            <form
                                className="flex-1 min-w-0 ml-1 flex items-center h-[34px] px-3.5 rounded-full bg-chip text-sm focus-within:bg-bar focus-within:outline-2 focus-within:outline-accent"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const egg = eggFor(address.replace(/^search\?q=/, ''));
                                    if (egg) { setLoading(false); runEgg(egg); return; }
                                    router.push(resolveAddress(address));
                                }}
                            >
                                <span className="text-xs text-muted mr-1.5" aria-hidden>arno://</span>
                                <input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    aria-label="Address and search bar"
                                    placeholder="Search Arno or type a page name"
                                    autoComplete="off"
                                    autoCapitalize="none"
                                    spellCheck={false}
                                    enterKeyHint="go"
                                    className="flex-1 min-w-0 h-full bg-transparent outline-none text-ink placeholder:text-muted"
                                />
                            </form>
                            <ThemeToggle pill />
                        </div>

                        <nav className="flex items-center gap-0.5 px-2 sm:px-2.5 pb-1.5 pt-1 sm:pt-0 text-[12.5px] overflow-x-auto [scrollbar-width:none]" aria-label="Main">
                            {BOOKMARKS.map((b) => {
                                const current = b.href === '/' ? pathname === '/' : pathname.startsWith(b.href);
                                return (
                                    <Link key={b.href} href={b.href} aria-current={current ? 'page' : undefined} className={`${bookmark} ${current ? 'bg-chip font-medium shadow-[inset_0_-2px_var(--accent)]' : ''}`}>
                                        {b.href === '/contact' && profile.openToWork && <span className="w-2 h-2 rounded-full bg-ggreen" aria-hidden />}
                                        {b.label}
                                    </Link>
                                );
                            })}
                            <a href={profile.github} target="_blank" rel="noopener noreferrer" className={bookmark}>GitHub</a>
                            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={bookmark}>LinkedIn</a>
                            <span className="ml-auto sm:hidden"><ThemeToggle /></span>
                        </nav>
                        <div className="nav-progress" data-on={loading ? '' : undefined} role="status" aria-label={loading ? 'Loading page' : undefined} />
                    </header>
                    {children}
                    <footer className="px-4 pt-2 pb-8 text-center text-xs text-muted print:hidden">
                        A browser-inspired personal portfolio. Not affiliated with Google.
                    </footer>
                    <EasterEggs />
                </div>
            </div>
        </TabsContext.Provider>
    );
}
