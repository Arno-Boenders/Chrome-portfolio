import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProjectThumb } from '@components/ProjectCard';
import Tags from '@components/Tags';
import { GITHUB_USER, projectCards } from '@data/projects';
import { PAD, btn, btnPrimary } from '@/lib/ui';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => projectCards.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = projectCards.find((p) => p.slug === slug);
    return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const index = projectCards.findIndex((p) => p.slug === slug);
    if (index < 0) notFound();
    const p = projectCards[index];
    const next = projectCards[(index + 1) % projectCards.length];
    const study = [
        { title: 'Why it exists', text: p.caseStudy?.why },
        { title: 'My part', text: p.caseStudy?.myPart },
        { title: 'The hard bit', text: p.caseStudy?.hardBit },
    ].filter((s) => s.text);

    return (
        <main id="main" tabIndex={-1} className={`stagger outline-none ${PAD} pt-6 pb-16 flex flex-col gap-[22px]`}>
            <Link href="/projects" className="group self-start inline-flex items-center gap-1.5 min-h-11 text-sm text-link hover:underline">
                <ArrowLeft className="w-4 h-4 transition-transform duration-150 ease-[var(--ease-out)] group-hover:-translate-x-0.5 motion-reduce:transition-none" aria-hidden />All projects
            </Link>
            <div>
                <h1 className="font-display font-semibold text-[clamp(38px,7vw,68px)] leading-none tracking-[-0.03em] [overflow-wrap:anywhere]" style={{ color: `color-mix(in srgb, ${p.color} 78%, var(--ink))` }}>{p.title}</h1>
                <p className="mt-3 max-w-[60ch] text-[19px] leading-[1.5] text-ink">{p.summary}</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
                {p.live && <a href={p.live} rel="noopener noreferrer" className={btnPrimary}>Visit live site<ExternalLink className="w-4 h-4" aria-hidden /></a>}
                {p.repo && <a href={`https://github.com/${GITHUB_USER}/${p.repo}`} rel="noopener noreferrer" className={btn}>View code</a>}
                <Link href={`/projects/${next.slug}`} className={btn}>Next: {next.title}<ArrowRight className="w-4 h-4" aria-hidden /></Link>
            </div>
            <ProjectThumb project={p} sizes="(min-width: 1024px) 920px, 100vw" className="aspect-video w-full max-w-[920px] rounded-[14px] border border-line" />
            <p className="max-w-[65ch] text-base leading-[1.65] text-snippet">{p.year && <span className="text-muted">{p.year} — </span>}{p.description}</p>
            <Tags items={p.tech} max={12} />
            {study.length > 0 && (
                <div className="grid md:grid-cols-3 gap-x-8 gap-y-6 pt-2">
                    {study.map((s) => (
                        <section key={s.title}>
                            <h2 className="font-display font-medium text-lg text-ink">{s.title}</h2>
                            <p className="mt-1 text-sm leading-[1.6] text-snippet">{s.text}</p>
                        </section>
                    ))}
                </div>
            )}
        </main>
    );
}
