// "Arno" in search-engine primaries: the site's own logo, not Google's.
const COLORS = ['text-gblue', 'text-gred', 'text-gyellow', 'text-ggreen'];

// `drop` plays the letter-by-letter entrance used on the landing page.
export default function Wordmark({ className = '', drop = false }: { className?: string; drop?: boolean }) {
    return (
        <span className={`font-display font-semibold tracking-[-0.04em] select-none inline-flex ${drop ? 'wordmark-drop' : ''} ${className}`} aria-label="Arno">
            {'Arno'.split('').map((ch, i) => (
                <span key={i} className={COLORS[i]} aria-hidden>{ch}</span>
            ))}
        </span>
    );
}
