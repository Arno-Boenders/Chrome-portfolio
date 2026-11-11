// Dev-only stress test (break-ui). Not reachable in production builds.
import { notFound } from 'next/navigation';
import ImageGrid from '@components/ImageGrid';
import KnowledgePanel from '@components/KnowledgePanel';
import PageShell from '@components/PageShell';
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
    const categories = [{ id: 'list', label: 'All' }, { id: 'images', label: 'Images' }, { id: 'nomatch', label: 'No match' }];

    return (
        <>
            {view === 'images' ? (
                <PageShell title="Stress test" query={f.searchQuery} basePath={`/dev/break?data=${data}&view=images`} categories={categories} active="images" count={grid.length} wide>
                    <ImageGrid items={grid} />
                </PageShell>
            ) : view === 'nomatch' ? (
                <PageShell title="Stress test" query={f.searchQuery} basePath="/dev/break" categories={categories} active="nomatch" count={0}>
                    <p className="text-ink text-base leading-7">Your search - <b>{f.searchQuery}</b> - did not match anything on this portfolio.</p>
                </PageShell>
            ) : (
                <PageShell title="Stress test" query={f.searchQuery} basePath="/dev/break" categories={categories} active="list" count={f.projects.length + f.results.length}
                    aside={<KnowledgePanel person={f.person} images={f.panelImages} />}>
                    {f.projects.map((p, i) => <ProjectItem key={i} project={p} />)}
                    {f.results.map((r, i) => <ResultItem key={'r' + i} {...r} />)}
                </PageShell>
            )}
            <nav style={{ position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 2, padding: 3, background: '#e5e5e5', borderRadius: 999, font: '12px system-ui', zIndex: 50 }}>
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
