import type { Metadata } from 'next';
import Link from 'next/link';
import HireCard from '@components/HireCard';
import ProjectCard from '@components/ProjectCard';
import ResultsShell from '@components/ResultsShell';
import { ProjectItem } from '@components/ResultItem';
import { overviews, pages, profile } from '@data/profile';
import { projectCards } from '@data/projects';
import { getProjects } from '@/lib/github';
import { btn, sectionHeading } from '@/lib/ui';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Web, desktop, mobile and VR projects by Arno Boenders, with screenshots, tech stacks and live demos.',
};

export default async function ProjectsPage() {
    // Curated projects get cards; every other public repo is listed below them, straight from GitHub.
    const others = (await getProjects()).filter((p) => !p.slug);

    return (
        <ResultsShell
            kind="projects"
            query={pages.projects.query}
            title="Projects"
            stats={`About ${projectCards.length + others.length} projects (0.31 seconds) · each opens in its own tab`}
            overview={`Arno has shipped ${projectCards.length} projects across web, desktop, mobile and VR. ${overviews.projects}`}
            aside={
                <>
                    <HireCard />
                    <Link href="/contact" className={`${btn} self-start`}>Contact Arno</Link>
                </>
            }
        >
            <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8">
                {projectCards.map((p, i) => <ProjectCard key={p.slug} project={p} big={i === 0} index={i === 0 ? 0 : (i + 1) % 2} />)}
            </div>
            {others.length > 0 && (
                <section>
                    <h2 className={`${sectionHeading} mb-4`}>More on GitHub</h2>
                    {others.map((p, i) => <ProjectItem key={`${i}-${p.title}`} project={p} />)}
                    <p className="text-sm text-muted">
                        Everything else is on <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-link hover:underline">GitHub</a>.
                    </p>
                </section>
            )}
        </ResultsShell>
    );
}
