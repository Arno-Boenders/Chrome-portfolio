import { ExternalLink, Star } from 'lucide-react';
import Link from 'next/link';
import type { Source } from '@/data/profile';
import type { ProjectImage } from '@/data/projects';
import type { Project } from '@/lib/github';
import { describeUrl, formatCount, formatDate, sourceOf } from '@/lib/format';

const MAX_TAGS = 4;
import SiteIcon from './SiteIcon';
import Thumb from './Thumb';

interface Props {
    url: string | null;   // null renders an unlinked result
    title: string;
    description: string;
    source?: Source;
    date?: string | null;
    tags?: string[];
    stars?: number;
    liveUrl?: string | null;
    image?: ProjectImage | null;
}

function SmartLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
    return href.startsWith('/')
        ? <Link href={href} className={className}>{children}</Link>
        : <a href={href} className={className}>{children}</a>;
}

export default function ResultItem({ url, title, description, source, date, tags, stars, liveUrl, image }: Props) {
    const { site, crumb } = url ? describeUrl(url) : { site: 'Arno Boenders', crumb: tags?.slice(0, 3).join(' · ') ?? '' };
    const header = (
        <>
            <div className="flex items-center gap-3 mb-1">
                <SiteIcon source={source ?? (url ? sourceOf(url) : 'site')} />
                <div className="min-w-0 leading-tight">
                    <div className="text-sm text-ink">{site}</div>
                    <div className="text-xs text-muted truncate">{crumb}</div>
                </div>
            </div>
            <h2 className={`text-xl leading-snug [overflow-wrap:anywhere] ${url ? 'text-link group-hover:underline' : 'text-ink'}`}>{title}</h2>
        </>
    );
    return (
        <article className="mb-8 animate-fade-in">
            {url ? <SmartLink href={url} className="group block">{header}</SmartLink> : <div>{header}</div>}
            <div className="flex gap-4 mt-1">
                <div className="flex-1 min-w-0">
                    <p className="text-sm leading-[1.6] text-snippet [overflow-wrap:anywhere]">
                        {date && <span className="text-muted">{date} — </span>}
                        {description}
                    </p>
                    {(tags?.length || stars || liveUrl) ? (
                        <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-muted">
                            {tags?.slice(0, MAX_TAGS).map((t) => <span key={t} className="px-2 py-0.5 rounded-full bg-chip text-ink">{t}</span>)}
                            {tags && tags.length > MAX_TAGS && <span title={tags.slice(MAX_TAGS).join(', ')}>+{tags.length - MAX_TAGS}</span>}
                            {!!stars && <span className="flex items-center gap-1"><Star className="w-3 h-3" />{formatCount(stars)}</span>}
                            {liveUrl && (
                                <a href={liveUrl} className="flex items-center gap-1 text-link hover:underline">
                                    <ExternalLink className="w-3 h-3" />Live demo
                                </a>
                            )}
                        </div>
                    ) : null}
                </div>
                {image && <Thumb image={image} sizes="112px" className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg shrink-0" />}
            </div>
        </article>
    );
}

export function ProjectItem({ project: p }: { project: Project }) {
    return (
        <ResultItem
            url={p.url}
            title={p.title}
            description={p.description}
            date={formatDate(p.updated)}
            tags={p.tech}
            stars={p.stars}
            liveUrl={p.repoUrl ? p.liveUrl : null}
            image={p.image}
        />
    );
}
