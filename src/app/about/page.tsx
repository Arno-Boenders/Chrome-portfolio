import type { Metadata } from 'next';
import EducationList from '@components/EducationList';
import FeaturedSnippet from '@components/FeaturedSnippet';
import ImageGrid, { type GridItem } from '@components/ImageGrid';
import KnowledgePanel from '@components/KnowledgePanel';
import PageShell from '@components/PageShell';
import ResultItem from '@components/ResultItem';
import { pages, profile } from '@data/profile';
import { curatedProjects } from '@data/projects';

export const metadata: Metadata = {
    title: 'About',
    description: profile.bio,
};

const categories = [
    { id: 'all', label: 'All' },
    { id: 'images', label: 'Images' },
    { id: 'education', label: 'Education' },
];

const images: GridItem[] = [
    { image: { src: profile.photo.src, alt: profile.photo.alt, fit: 'cover', position: '50% 42%' }, title: profile.name, caption: profile.location, href: profile.linkedin },
    ...curatedProjects.flatMap((p) =>
        p.image ? [{ image: p.image, title: p.title, caption: p.tech.slice(0, 3).join(' · '), href: '/projects' }] : []
    ),
];

type Props = { searchParams: Promise<{ tab?: string }> };

export default async function AboutPage({ searchParams }: Props) {
    const { tab } = await searchParams;
    const active = categories.some((c) => c.id === tab) ? tab! : 'all';
    const shell = { title: `${profile.name}, ${profile.role}`, query: pages.about.query, basePath: '/about', categories, active };

    if (active === 'images') {
        return <PageShell {...shell} count={images.length} wide><ImageGrid items={images} /></PageShell>;
    }
    if (active === 'education') {
        return <PageShell {...shell} count={profile.education.length} aside={<KnowledgePanel />}><EducationList /></PageShell>;
    }
    return (
        <PageShell {...shell} count={pages.about.results.length + 1} aside={<KnowledgePanel />}>
            <FeaturedSnippet />
            {pages.about.results.map((r) => <ResultItem key={r.url} {...r} />)}
        </PageShell>
    );
}
