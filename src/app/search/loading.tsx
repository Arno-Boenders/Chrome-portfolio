import ResultsShell from '@components/ResultsShell';
import ResultsSkeleton from '@components/ResultsSkeleton';

export default function Loading() {
    return (
        <ResultsShell kind="all" query="" title="Searching…" stats="Searching…">
            <ResultsSkeleton />
        </ResultsShell>
    );
}
