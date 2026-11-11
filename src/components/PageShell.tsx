import BrowserHeader from './BrowserHeader';
import SearchHeader, { PAD, type Category } from './SearchHeader';

interface Props {
    title: string;        // the page's h1, read by screen readers and search engines
    query: string;
    basePath: string;
    categories: Category[];
    active: string;
    count?: number;
    aside?: React.ReactNode;
    wide?: boolean;
    children: React.ReactNode;
}

export default function PageShell({ title, query, basePath, categories, active, count, aside, wide, children }: Props) {
    return (
        <div className="min-h-dvh bg-page">
            <h1 className="sr-only">{title}</h1>
            <BrowserHeader />
            <SearchHeader query={query} basePath={basePath} categories={categories} active={active} />
            {count !== undefined && (
                <p className={`${PAD} pt-3 pb-1 text-sm text-muted`}>
                    About {count} result{count === 1 ? '' : 's'}
                </p>
            )}
            <div className={`${PAD} pt-4 pb-16 flex flex-col lg:flex-row gap-8 lg:gap-16`}>
                <main id="main" tabIndex={-1} className={`stagger outline-none flex-1 min-w-0 ${wide ? '' : 'max-w-[652px]'}`}>{children}</main>
                {aside && <aside className="order-first lg:order-none w-full lg:w-[372px] shrink-0">{aside}</aside>}
            </div>
        </div>
    );
}
