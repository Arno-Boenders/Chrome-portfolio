import PageShell from '@components/PageShell';
import ResultsSkeleton from '@components/ResultsSkeleton';

export default function Loading() {
    return (
        <PageShell title="Searching…" query="" basePath="/search" categories={[{ id: 'all', label: 'All' }]} active="all">
            <ResultsSkeleton />
        </PageShell>
    );
}
