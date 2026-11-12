import type { ProjectImage } from '@/data/projects';
import TabLink from './TabLink';
import Tags from './Tags';
import Thumb from './Thumb';

export interface CardProject {
    title: string;
    slug: string;
    summary: string;
    tech: string[];
    image?: ProjectImage | null;
    color: string;          // tile colour when there is no screenshot
}

/** Screenshot, or a coloured tile with the project's initial when there isn't one. */
export function ProjectThumb({ project: p, sizes, className = '', zoomOnHover = false }: { project: Pick<CardProject, 'title' | 'image' | 'color'>; sizes: string; className?: string; zoomOnHover?: boolean }) {
    if (p.image) return <Thumb image={p.image} sizes={sizes} className={className} zoomOnHover={zoomOnHover} />;
    return (
        <div className={`grid place-items-center font-display font-semibold text-5xl text-white ${className}`} style={{ background: p.color }} aria-hidden>
            {p.title[0]}
        </div>
    );
}

/** A project on a results page. Opens the project's page in a new tab of the site's browser. */
export default function ProjectCard({ project: p, big = false }: { project: CardProject; big?: boolean }) {
    return (
        <TabLink href={`/projects/${p.slug}`} className={`group block text-left ${big ? 'sm:col-span-2' : ''}`}>
            <ProjectThumb
                project={p}
                sizes={big ? '(min-width: 1024px) 760px, 100vw' : '(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw'}
                className="aspect-[16/10] rounded-[10px] border border-line"
                zoomOnHover
            />
            <h3 className={`mt-2.5 font-display font-medium text-link group-hover:underline ${big ? 'text-2xl' : 'text-[19px]'}`}>{p.title}</h3>
            <p className="mt-0.5 mb-2 text-sm leading-[1.5] text-snippet">{p.summary}</p>
            <Tags items={p.tech} />
        </TabLink>
    );
}
