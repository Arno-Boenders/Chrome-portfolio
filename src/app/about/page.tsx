import type { Metadata } from 'next';
import Faq from '@components/Faq';
import HireCard from '@components/HireCard';
import KnowledgePanel from '@components/KnowledgePanel';
import ProjectCard from '@components/ProjectCard';
import ResultsShell from '@components/ResultsShell';
import { overviews, pages, profile } from '@data/profile';
import { projectCards } from '@data/projects';
import { sectionHeading } from '@/lib/ui';

export const metadata: Metadata = {
    title: 'About',
    description: profile.bio,
};

// The "All" results: who Arno is, the projects, and the questions people ask.
export default function AboutPage() {
    return (
        <ResultsShell
            kind="all"
            query={pages.about.query}
            title={`${profile.name}, ${profile.role}`}
            stats={`About ${projectCards.length} projects (0.42 seconds)`}
            overview={overviews.all}
            aside={<><KnowledgePanel /><HireCard /></>}
        >
            <section>
                <h2 className={sectionHeading}>Projects</h2>
                <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 mt-3">
                    {projectCards.map((p, i) => <ProjectCard key={p.slug} project={p} big={i === 0} index={i === 0 ? 0 : (i + 1) % 2} />)}
                </div>
            </section>
            <Faq />
        </ResultsShell>
    );
}
