import { ArrowUpRight } from 'lucide-react';
import type { ProjectImage } from '@/data/projects';
import Reveal from './Reveal';
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

/** The project's screenshot in a small browser window, on a backdrop in the project's colour. Without a screenshot: its initial. */
export function ProjectThumb({ project: p, sizes, className = '', large = false }: { project: Pick<CardProject, 'title' | 'image' | 'color'>; sizes: string; className?: string; large?: boolean }) {
    return (
        <div className={`shot ${large ? 'shot-lg' : ''} ${className}`} style={{ '--c': p.color } as React.CSSProperties}>
            <div className="shot-window">
                <div className="shot-bar" aria-hidden><i /><i /><i /></div>
                {p.image
                    ? <Thumb image={p.image} sizes={sizes} className="flex-1" />
                    : <div className="flex-1 grid place-items-center font-display font-semibold text-5xl text-white" style={{ background: p.color }} aria-hidden>{p.title[0]}</div>}
            </div>
        </div>
    );
}

/** A project on a results page. Opens the project's page in a new tab of the site's browser. */
export default function ProjectCard({ project: p, big = false, index = 0 }: { project: CardProject; big?: boolean; index?: number }) {
    return (
        <Reveal index={index} className={big ? 'sm:col-span-2' : ''}>
            <TabLink href={`/projects/${p.slug}`} className="group block text-left">
                <ProjectThumb
                    project={p}
                    large={big}
                    sizes={big ? '(min-width: 1024px) 760px, 100vw' : '(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw'}
                    className={`rounded-2xl border border-line ${big ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}
                />
                <h3 className={`mt-3 flex items-center gap-1.5 font-display font-medium text-link ${big ? 'text-2xl' : 'text-[19px]'}`}>
                    <span className="group-hover:underline">{p.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 transition-[opacity,transform] duration-200 ease-[var(--ease-out)] group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:transition-none" aria-hidden />
                </h3>
                <p className="mt-0.5 mb-2 text-sm leading-[1.5] text-snippet">{p.summary}</p>
                <Tags items={p.tech} />
            </TabLink>
        </Reveal>
    );
}
