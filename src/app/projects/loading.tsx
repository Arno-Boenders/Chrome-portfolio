import ResultsShell from '@components/ResultsShell';
import ResultsSkeleton from '@components/ResultsSkeleton';
import { pages } from '@data/profile';

export default function Loading() {
    return (
        <ResultsShell kind="projects" query={pages.projects.query} title="Projects" stats="Loading projects…">
            <ResultsSkeleton />
        </ResultsShell>
    );
}
