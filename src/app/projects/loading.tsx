import PageShell from '@components/PageShell';
import ResultsSkeleton from '@components/ResultsSkeleton';
import { pages } from '@data/profile';

export default function Loading() {
    return (
        <PageShell title="Projects by Arno Boenders" query={pages.projects.query} basePath="/projects"
            categories={[{ id: 'all', label: 'All' }, { id: 'images', label: 'Images' }]} active="all">
            <ResultsSkeleton />
        </PageShell>
    );
}
