// Dev-only stress test (break-ui). Not reachable in production builds.
import { notFound } from 'next/navigation';
import ImageGrid from '@components/ImageGrid';
import KnowledgePanel from '@components/KnowledgePanel';
import ResultsShell from '@components/ResultsShell';
import ResultItem, { ProjectItem } from '@components/ResultItem';
import { pages, profile } from '@data/profile';
import { getProjects } from '@/lib/github';
import { fixtures, type Fixture } from '@/dev/fixtures';

const STATES = ['demo', 'worst', 'one', 'empty'] as const;
type Props = { searchParams: Promise<{ data?: string; view?: string }> };

export default async function BreakPage({ searchParams }: Props) {
    if (process.env.NODE_ENV === 'production') notFound();
    const { data = 'demo', view = 'list' } = await searchParams;

    const f: Fixture = data in fixtures
        ? fixtures[data]
        : { projects: await getProjects(), results: pages.contact.results, person: profile, searchQuery: 'react' };

    const grid = f.projects.flatMap((p) => (p.image ? [{ image: p.image, title: p.title, caption: p.tech.slice(0, 3).join(' · '), href: p.url ?? undefined }] : []));
    const views = [{ id: 'list', label: 'All' }, { id: 'images', label: 'Images' }, { id: 'nomatch', label: 'No match' }];

    return (
        <>
            {view === 'images' ? (
                <ResultsShell kind="all" title="Stress test" query={f.searchQuery} stats={`About ${grid.length} results`}>
                    <ImageGrid items={grid} />
                </ResultsShell>
            ) : view === 'nomatch' ? (
                <ResultsShell kind="all" title="Stress test" query={f.searchQuery} stats="About 0 results">
                    <p className="text-ink text-base leading-7">Your search - <b>{f.searchQuery}</b> - did not match anything on this portfolio.</p>
                </ResultsShell>
            ) : (
                <ResultsShell kind="all" title="Stress test" query={f.searchQuery} stats={`About ${f.projects.length + f.results.length} results`}
                    aside={<KnowledgePanel person={f.person} />}>
                    <div>
                        {f.projects.map((p, i) => <ProjectItem key={i} project={p} />)}
                        {f.results.map((r, i) => <ResultItem key={'r' + i} {...r} />)}
                    </div>
                </ResultsShell>
            )}
            <nav style={{ position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 2, padding: 3, background: '#e5e5e5', borderRadius: 999, font: '12px system-ui', zIndex: 50 }}>
                {views.map((v) => (
                    <a key={v.id} href={`/dev/break?data=${data}&view=${v.id}`}
                        style={{ padding: '4px 12px', borderRadius: 999, color: '#111', background: v.id === view ? '#fff' : 'transparent', textDecoration: 'none' }}>
                        {v.label}
                    </a>
                ))}
                <span style={{ width: 1, background: '#bbb', margin: '4px 6px' }} />
                {STATES.map((s) => (
                    <a key={s} href={`/dev/break?data=${s}&view=${view}`}
                        style={{ padding: '4px 12px', borderRadius: 999, color: '#111', background: s === data ? '#fff' : 'transparent', textDecoration: 'none' }}>
                        {s === 'demo' ? 'Demo data' : s === 'worst' ? 'Worst case' : s === 'one' ? 'One' : 'Empty'}
                    </a>
                ))}
            </nav>
        </>
    );
}
