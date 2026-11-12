import type { Metadata } from 'next';
import KnowledgePanel from '@components/KnowledgePanel';
import ResultsShell from '@components/ResultsShell';
import Reveal from '@components/Reveal';
import Tags from '@components/Tags';
import { overviews, profile } from '@data/profile';
import { sectionHeading } from '@/lib/ui';

export const metadata: Metadata = {
    title: 'Experience',
    description: 'Work experience of Arno Boenders: fullstack developer at Realo, part of Immoweb, after an internship at Bizzy.',
};

const LEVELS = ['', 'now and then', 'regularly', 'day to day'];

function Level({ level }: { level: number }) {
    return <span className="level inline-flex gap-[3px]" data-level={level} aria-hidden><i /><i /><i /></span>;
}

export default function ExperiencePage() {
    const jobs = profile.experience;

    return (
        <ResultsShell
            kind="experience"
            query="arno boenders experience"
            title="Experience"
            stats={`About ${jobs.length} roles · ${jobs.map((j) => j.company).join(', ')}`}
            overview={overviews.experience}
            aside={
                <>
                    <KnowledgePanel />
                    <section className="rounded-xl border border-dashed border-line px-4 py-3.5 text-sm text-ink">
                        <h2 className="text-xs text-muted mb-1.5">Education</h2>
                        <ul className="flex flex-col gap-3">
                            {profile.education.map((e) => (
                                <li key={e.title}><strong className="block font-semibold">{e.title}</strong>{e.school} · {e.period}</li>
                            ))}
                        </ul>
                    </section>
                </>
            }
        >
            {jobs.map((job) => (
                <section key={job.company} className="flex flex-col gap-7">
                    <div className="flex items-center gap-3.5">
                        <span className="w-[52px] h-[52px] shrink-0 rounded-xl grid place-items-center bg-kind text-page font-display font-semibold text-[26px]" aria-hidden>{job.company[0]}</span>
                        <div>
                            <h2 className="font-display font-medium text-2xl leading-tight text-ink">{job.role}, {job.company}</h2>
                            <p className="text-sm text-muted">{job.period} · {job.about}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className={sectionHeading}>What I built there</h3>
                        <div className="grid sm:grid-cols-2 gap-x-7 gap-y-6 mt-3.5">
                            {job.highlights.map((h, i) => (
                                <Reveal as="article" key={h.title} index={i % 2}>
                                    <h4 className="font-display font-medium text-lg leading-tight text-ink">{h.title}</h4>
                                    <p className="mt-1 mb-2 text-sm leading-[1.55] text-snippet">{h.description}</p>
                                    <Tags items={h.tech} />
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    {job.stack.length > 0 && (
                        <div>
                            <h3 className={sectionHeading}>Stack at {job.company}</h3>
                            <p className="flex flex-wrap gap-x-[18px] gap-y-1.5 mt-2 text-[13px] text-muted">
                                {[3, 2, 1].map((n) => <span key={n} className="inline-flex items-center gap-[7px]"><Level level={n} />{LEVELS[n]}</span>)}
                            </p>
                            <dl className="grid gap-2.5 mt-3">
                                {job.stack.map((row, i) => (
                                    <Reveal key={row.group} index={i} className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
                                        <dt className="w-[84px] text-[13px] text-muted">{row.group}</dt>
                                        <dd className="flex flex-wrap gap-1.5">
                                            {row.items.map((item) => (
                                                <span key={item.name} className="inline-flex items-center gap-[7px] px-2.5 py-0.5 rounded-full bg-chip text-xs text-ink">
                                                    <Level level={item.level} />{item.name}<span className="sr-only"> (used {LEVELS[item.level]})</span>
                                                </span>
                                            ))}
                                        </dd>
                                    </Reveal>
                                ))}
                            </dl>
                        </div>
                    )}
                </section>
            ))}
        </ResultsShell>
    );
}
