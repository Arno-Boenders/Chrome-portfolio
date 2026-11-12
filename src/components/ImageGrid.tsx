import Link from 'next/link';
import type { ProjectImage } from '@/data/projects';
import Thumb from './Thumb';

export interface GridItem { image: ProjectImage; title: string; caption: string; href?: string }

export default function ImageGrid({ items }: { items: GridItem[] }) {
    if (items.length === 0) {
        return <p className="text-base text-ink">No images here yet. Screenshots appear as projects get them.</p>;
    }
    return (
        <ul className="stagger grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6">
            {items.map((item, i) => {
                const body = (
                    <>
                        <Thumb image={item.image} sizes="(min-width: 768px) 33vw, 50vw" className="aspect-[4/3] rounded-xl" zoomOnHover />
                        <p className="mt-2 text-xs text-muted truncate">{item.caption}</p>
                        <p className="text-sm text-ink truncate group-hover:underline">{item.title}</p>
                    </>
                );
                return (
                    <li key={`${i}-${item.image.src}`} className="animate-fade-in">
                        {item.href
                            ? (item.href.startsWith('/') ? <Link href={item.href} className="group block">{body}</Link> : <a href={item.href} rel="noopener noreferrer" className="group block">{body}</a>)
                            : <div>{body}</div>}
                    </li>
                );
            })}
        </ul>
    );
}
