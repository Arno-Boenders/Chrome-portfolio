import type { Metadata } from 'next';
import Link from 'next/link';
import ImageGrid from '@components/ImageGrid';
import PageShell from '@components/PageShell';
import { ProjectItem } from '@components/ResultItem';
import { pages, profile } from '@data/profile';
import { getProjects } from '@/lib/github';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Web, mobile and VR projects by Arno Boenders, with screenshots, tech stacks and live demos.',
};

const categories = [
    { id: 'all', label: 'All' },
    { id: 'images', label: 'Images' },
];

type Props = { searchParams: Promise<{ tab?: string }> };

export default async function ProjectsPage({ searchParams }: Props) {
    const { tab } = await searchParams;
    const active = tab === 'images' ? 'images' : 'all';
    const projects = await getProjects();
    const shell = { title: `Projects by ${profile.name}`, query: pages.projects.query, basePath: '/projects', categories, active };

    if (active === 'images') {
        const items = projects.flatMap((p) =>
            p.image ? [{ image: p.image, title: p.title, caption: p.tech.slice(0, 3).join(' · '), href: p.liveUrl ?? p.url ?? undefined }] : []
        );
        return <PageShell {...shell} count={items.length} wide><ImageGrid items={items} /></PageShell>;
    }

    return (
        <PageShell {...shell} count={projects.length}>
            {projects.map((p, i) => <ProjectItem key={`${i}-${p.title}`} project={p} />)}
            <p className="text-sm text-muted">
                More on <a href={profile.github} className="text-link hover:underline">GitHub</a>, or{' '}
                <Link href="/contact" className="text-link hover:underline">get in touch</Link>.
            </p>
        </PageShell>
    );
}
