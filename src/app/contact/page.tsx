import { Download } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CopyButton from '@components/CopyButton';
import Faq from '@components/Faq';
import KnowledgePanel from '@components/KnowledgePanel';
import ResultsShell from '@components/ResultsShell';
import Reveal from '@components/Reveal';
import { cv, overviews, pages, profile } from '@data/profile';
import { describeUrl } from '@/lib/format';
import { btn, btnPrimary } from '@/lib/ui';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Get in touch with Arno Boenders about fullstack developer roles.',
};

export default function ContactPage() {
    const job = profile.experience[0];
    const links = pages.contact.results.filter((r) => r.source !== 'email');

    return (
        <ResultsShell
            kind="contact"
            query={pages.contact.query}
            title="Contact"
            stats={`About ${links.length + 1} ways to reach Arno (0.12 seconds)`}
            overview={overviews.contact}
            aside={
                <>
                    <KnowledgePanel />
                    <div className="flex flex-wrap gap-2">
                        <Link href="/experience" className={btn}>Experience at {job.company}</Link>
                        <Link href="/projects" className={btn}>See the projects</Link>
                    </div>
                </>
            }
        >
            <section className="flex flex-col items-start gap-3">
                {profile.openToWork && (
                    <span className="inline-flex items-center gap-[7px] px-3 py-[3px] rounded-full bg-chip text-[13px] text-ink">
                        <span className="w-2 h-2 rounded-full bg-ggreen" aria-hidden />Open to work
                    </span>
                )}
                <p className="font-display font-medium text-[clamp(22px,4.6vw,42px)] leading-[1.15] text-ink [overflow-wrap:anywhere] select-all">{profile.email}</p>
                <div className="flex flex-wrap gap-2.5">
                    <CopyButton text={profile.email} label="Copy email" className={btnPrimary} />
                    <a href={`mailto:${profile.email}`} className={btn}>Open mail app</a>
                    <a href={cv.file} download className={btn}><Download className="w-4 h-4" aria-hidden />Download CV</a>
                </div>
                <p className="text-sm text-muted">
                    <span className="font-semibold text-ink">Currently: </span>{job.role} at {job.company}, since {job.since}.{' '}
                    <Link href="/experience" className="text-link hover:underline">See experience</Link>
                </p>
            </section>

            <div className="grid sm:grid-cols-2 gap-3.5">
                {links.map((r, i) => (
                    <Reveal key={r.url} index={i}>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="group block h-full px-[18px] py-4 rounded-xl border border-line hover:bg-chip hover:-translate-y-0.5 transition-[background-color,transform] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none">
                        <span className="block text-xs text-muted truncate">{describeUrl(r.url).crumb.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        <span className="block font-display font-medium text-lg text-link group-hover:underline">{r.title}</span>
                        <span className="block text-sm leading-[1.55] text-snippet">{r.description}</span>
                    </a>
                    </Reveal>
                ))}
            </div>

            <Faq title="Before you ask" />
        </ResultsShell>
    );
}
