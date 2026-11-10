import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@components/PageShell';
import ResultItem, { ProjectItem } from '@components/ResultItem';
import { getProjects } from '@/lib/github';
import { search, suggestions } from '@/lib/search';

export const metadata: Metadata = { title: 'Search', robots: { index: false } };

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
    const q = ((await searchParams).q ?? '').trim().slice(0, 100);
    const hits = search(q, await getProjects());

    return (
        <PageShell title={q ? `Search results for “${q}”` : 'Search'} query={q} basePath={`/search?q=${encodeURIComponent(q)}`} categories={[{ id: 'all', label: 'All' }]} active="all" count={hits.length}>
            {hits.length === 0 ? (
                <div className="text-ink text-base leading-7 [overflow-wrap:anywhere]">
                    <p>Your search - <b>{q}</b> - did not match anything on this portfolio.</p>
                    <p className="mt-4 text-sm text-muted">Try one of these:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {suggestions.map((s) => (
                            <Link key={s} href={`/search?q=${encodeURIComponent(s)}`} className="pressable px-3 py-1 rounded-full border border-line text-sm text-ink hover:bg-hover">{s}</Link>
                        ))}
                    </div>
                </div>
            ) : (
                hits.map((h, i) => h.kind === 'project'
                    ? <ProjectItem key={`p${i}`} project={h.project} />
                    : <ResultItem key={`r${i}`} {...h.result} />)
            )}
        </PageShell>
    );
}
