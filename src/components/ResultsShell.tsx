import Link from 'next/link';
import { PAD } from '@/lib/ui';
import Overview from './Overview';
import SearchBox from './SearchBox';
import Wordmark from './Wordmark';

export type Kind = 'all' | 'projects' | 'experience' | 'contact';

const KINDS: { id: Kind; label: string; href: string; color: string }[] = [
    { id: 'all', label: 'All', href: '/about', color: 'var(--g-blue)' },
    { id: 'projects', label: 'Projects', href: '/projects', color: 'var(--g-red)' },
    { id: 'experience', label: 'Experience', href: '/experience', color: 'var(--g-amber)' },
    { id: 'contact', label: 'Contact', href: '/contact', color: 'var(--g-green)' },
];

interface Props {
    kind: Kind;
    query: string;                // shown in the search box
    title: string;                // the page's h1; hidden visually on the "All" kind
    stats: React.ReactNode;       // the "About n results" line
    overview?: string;            // typed-in summary; omit to leave the card out
    aside?: React.ReactNode;
    children: React.ReactNode;
}

/** The results-page layout shared by All, Projects, Experience and Contact. The kind sets the active tab and the page colour. */
export default function ResultsShell({ kind, query, title, stats, overview, aside, children }: Props) {
    const color = KINDS.find((k) => k.id === kind)!.color;
    return (
        <div className="pb-16" style={{ '--k': color } as React.CSSProperties}>
            <div className={`${PAD} flex items-center gap-4 sm:gap-5 pt-5 pb-3`}>
                <Link href="/" aria-label="New tab page" className="hidden min-[480px]:flex min-h-11 items-center shrink-0">
                    <Wordmark className="text-[34px] leading-none" />
                </Link>
                <SearchBox key={query} defaultValue={query} className="max-w-[620px]" />
            </div>
            <div className="border-b border-line">
            <nav aria-label="Result types" className={`${PAD} flex gap-6 text-sm overflow-x-auto [scrollbar-width:none]`}>
                {KINDS.map((k) => {
                    const active = k.id === kind;
                    return (
                        <Link
                            key={k.id}
                            href={k.href}
                            aria-current={active ? 'page' : undefined}
                            className={`no-select pt-2.5 pb-2 -mb-px border-b-[3px] whitespace-nowrap transition-colors duration-150 ${active ? 'border-kind text-kind font-medium' : 'border-transparent text-muted hover:text-ink'}`}
                        >
                            {k.label}
                        </Link>
                    );
                })}
            </nav>
            </div>
            <div className={`${PAD} pt-5`}>
                <h1 className={kind === 'all' ? 'sr-only' : 'rise font-display font-semibold text-kind text-[clamp(36px,6vw,56px)] leading-none tracking-[-0.03em] mb-2.5'}>{title}</h1>
                <p className="text-sm text-muted [overflow-wrap:anywhere]">{stats}</p>
                <div className={`mt-5 grid gap-10 items-start ${aside ? 'lg:grid-cols-[minmax(0,1fr)_320px]' : ''}`}>
                    <main id="main" tabIndex={-1} className="stagger outline-none min-w-0 flex flex-col gap-9">
                        {overview && <Overview key={overview} text={overview} multicolor={kind === 'all'} />}
                        {children}
                    </main>
                    {aside && <aside className="stagger flex flex-col gap-4 min-w-0">{aside}</aside>}
                </div>
            </div>
        </div>
    );
}
