/** Technology chips. Anything past `max` is folded into a "+n" with the names in its tooltip. */
export default function Tags({ items, max = 4 }: { items: string[]; max?: number }) {
    if (items.length === 0) return null;
    return (
        <span className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
            {items.slice(0, max).map((t) => <span key={t} className="px-2.5 py-0.5 rounded-full bg-chip text-ink">{t}</span>)}
            {items.length > max && <span title={items.slice(max).join(', ')}>+{items.length - max}</span>}
        </span>
    );
}
