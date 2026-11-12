import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Faq from '@components/Faq';
import HireCard from '@components/HireCard';
import KnowledgePanel from '@components/KnowledgePanel';
import ProjectCard from '@components/ProjectCard';
import ResultItem, { ProjectItem } from '@components/ResultItem';
import ResultsShell from '@components/ResultsShell';
import { overviews } from '@data/profile';
import { projectCards } from '@data/projects';
import { getProjects } from '@/lib/github';
import { search, suggestions, tokenize } from '@/lib/search';
import { sectionHeading } from '@/lib/ui';

export const metadata: Metadata = { title: 'Search', robots: { index: false } };

type Props = { searchParams: Promise<{ q?: string }> };

// Searches that are really a request for one of the pages go straight there.
function pageFor(q: string): string | null {
    if (tokenize(q).length === 0) return '/about';
    if (/\b(contact|hire|email|available)\b|open to work/i.test(q)) return '/contact';
    if (/\b(experience|realo|immoweb|career|job)\b/i.test(q)) return '/experience';
    if (/^(arno boenders )?projects?$/i.test(q)) return '/projects';
    const project = projectCards.find((p) => p.title.toLowerCase() === q.toLowerCase());
    return project ? `/projects/${project.slug}` : null;
}

export default async function SearchPage({ searchParams }: Props) {
    const q = ((await searchParams).q ?? '').trim().slice(0, 100);
    const page = pageFor(q);
    if (page) redirect(page);

    const hits = search(q, await getProjects());
    const cards = hits.flatMap((h) => {
        const card = h.kind === 'project' ? projectCards.find((p) => p.slug === h.project.slug) : undefined;
        return card ? [card] : [];
    });
    const rest = hits.filter((h) => h.kind !== 'project' || !h.project.slug);

    return (
        <ResultsShell
            kind="all"
            query={q}
            title={`Search results for “${q}”`}
            stats={`About ${hits.length} result${hits.length === 1 ? '' : 's'} (0.${20 + (q.length % 60)} seconds)`}
            overview={hits.length > 0 ? overviews.all : undefined}
            aside={<><KnowledgePanel /><HireCard /></>}
        >
            {hits.length === 0 && (
                <div className="text-ink text-base leading-7 [overflow-wrap:anywhere]">
                    <p>Your search - <b>{q}</b> - did not match anything on this portfolio.</p>
                    <p className="mt-4 text-sm text-muted">Try one of these:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {suggestions.map((s) => (
                            <Link key={s} href={`/search?q=${encodeURIComponent(s)}`} className="pressable px-3 py-1 rounded-full border border-line text-sm text-ink hover:bg-hover">{s}</Link>
                        ))}
                    </div>
                </div>
            )}
            {cards.length > 0 && (
                <section>
                    <h2 className={sectionHeading}>Projects</h2>
                    <div className="stagger grid sm:grid-cols-2 gap-x-[18px] gap-y-6 mt-3">
                        {cards.map((p, i) => <ProjectCard key={p.slug} project={p} big={i === 0 && cards.length > 2} />)}
                    </div>
                </section>
            )}
            {rest.length > 0 && (
                <section>
                    <h2 className={`${sectionHeading} mb-4`}>{cards.length > 0 ? 'More results' : 'Results'}</h2>
                    {rest.map((h, i) => h.kind === 'project'
                        ? <ProjectItem key={`p${i}`} project={h.project} />
                        : <ResultItem key={`r${i}`} {...h.result} />)}
                </section>
            )}
            <Faq />
        </ResultsShell>
    );
}
