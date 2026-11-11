// Placeholder rows shaped like ResultItem, shown by loading.tsx while the server works.
export default function ResultsSkeleton({ rows = 4 }: { rows?: number }) {
    const bar = 'rounded-full bg-chip';
    return (
        <div className="skeleton" role="status" aria-label="Loading results">
            {Array.from({ length: rows }, (_, i) => (
                <div key={i} className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-7 h-7 rounded-full bg-chip shrink-0" />
                        <div className="flex-1 space-y-1.5">
                            <div className={`${bar} h-3 w-20`} />
                            <div className={`${bar} h-2.5 w-48 max-w-full`} />
                        </div>
                    </div>
                    <div className={`${bar} h-5 w-3/5 mb-3`} />
                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <div className={`${bar} h-3 w-full`} />
                            <div className={`${bar} h-3 w-11/12`} />
                            <div className={`${bar} h-3 w-2/3`} />
                        </div>
                        {i % 2 === 0 && <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg bg-chip shrink-0" />}
                    </div>
                </div>
            ))}
            <span className="sr-only">Loading…</span>
        </div>
    );
}
