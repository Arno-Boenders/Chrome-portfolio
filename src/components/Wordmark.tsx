// "Arno" in search-engine primaries: the site's own logo, not Google's.
const COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#4285F4', '#34A853', '#EA4335'];

export default function Wordmark({ className = '' }: { className?: string }) {
    return (
        <span className={`font-semibold tracking-tight select-none ${className}`} aria-label="Arno">
            {'Arno'.split('').map((ch, i) => (
                <span key={i} style={{ color: COLORS[i] }} aria-hidden>{ch}</span>
            ))}
        </span>
    );
}

export function TabIcon() {
    return (
        <span className="hidden min-[360px]:flex w-4 h-4 shrink-0 rounded-sm bg-accent text-page text-[10px] font-bold items-center justify-center" aria-hidden>
            A
        </span>
    );
}
