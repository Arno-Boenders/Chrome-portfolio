// The CV, shown like a PDF in the browser's viewer. The downloadable PDF is this same page, printed.
//
// To refresh the PDF after changing the data: run the site (npm run dev), then
//   npm run cv
// which prints http://localhost:3000/cv to public/Arno-Boenders-CV.pdf with headless Chrome.
//
// The sheet has colour, but its structure stays plain so CV-screening software reads it correctly:
// one column, real text in reading order, standard section names, and no icons, tables or images.
// All decoration is CSS backgrounds and borders, which a text parser never sees.
import { Download } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import PrintButton from '@components/PrintButton';
import { cv, profile } from '@data/profile';
import { projectCards } from '@data/projects';
import { btn, btnPrimary } from '@/lib/ui';

export const metadata: Metadata = {
    title: 'CV',
    description: `CV of ${profile.name}, ${profile.role} in ${profile.location}.`,
};

// Fixed colours: the sheet is paper, so it looks the same in light and dark mode and in print.
const BLUE = '#1a73e8', RED = '#d93025', YELLOW = '#f9ab00', GREEN = '#188038';
const link = 'font-medium text-[#1a73e8] underline decoration-[#1a73e8]/30 underline-offset-2';
const pill = 'shrink-0 px-2 py-px rounded-full bg-[#eef3fd] text-[11px] font-medium text-[#1558b0] whitespace-nowrap';

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
    return (
        <section className="mt-4 print:mt-3 first:mt-0 print:first:mt-0">
            {/* No letter-spacing here: it makes PDF text extraction split the word ("PRO FI LE"), and screening software then misses the section. */}
            <h2 className="flex items-center gap-2 mb-2 text-[11.5px] font-bold uppercase text-[#1a1b1e]">
                <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: color }} aria-hidden />
                {title}
                <span className="flex-1 h-px bg-[#dfe1e5]" aria-hidden />
            </h2>
            {children}
        </section>
    );
}

export default function CvPage() {
    const projects = projectCards.slice(0, 3);

    return (
        <div className="min-h-[calc(100dvh-140px)] bg-chip print:bg-white print:min-h-0">
            <div className="rise mx-auto max-w-[820px] flex flex-wrap items-center gap-2.5 px-4 pt-5 print:hidden">
                <p className="mr-auto text-sm text-muted">{cv.file.slice(1)}</p>
                <PrintButton className={btn} />
                <a href={cv.file} download className={btnPrimary}><Download className="w-4 h-4" aria-hidden />Download PDF</a>
            </div>

            <main id="main" tabIndex={-1} className="outline-none px-4 py-5 print:p-0">
                <article className="rise d1 mx-auto max-w-[820px] overflow-hidden bg-white text-[#1a1b1e] rounded-md shadow-[0_2px_24px_rgb(0_0_0/0.18)] text-[13px] leading-[1.5] selection:bg-[#cfe0fc] [print-color-adjust:exact] [-webkit-print-color-adjust:exact] print:text-[11.5px] print:max-w-none print:shadow-none print:rounded-none">
                    <div className="grid grid-cols-4 h-1.5" aria-hidden>
                        {[BLUE, RED, YELLOW, GREEN].map((c) => <span key={c} style={{ background: c }} />)}
                    </div>

                    <div className="px-7 pt-8 pb-9 sm:px-14 sm:pt-10 sm:pb-12 print:px-0 print:pt-5 print:pb-0">
                        <header className="flex items-center justify-between gap-6">
                            <div className="min-w-0">
                                <h1 className="font-display font-semibold text-[36px] leading-none">{profile.name}</h1>
                                <p className="mt-1.5 font-display font-medium text-[17px] text-[#1a73e8]">{profile.role}</p>
                                <p className="mt-2.5 text-[#3c3f44]">
                                    {profile.location} | <a href={`mailto:${profile.email}`}>{profile.email}</a> | <a href={profile.linkedin} className={link}>LinkedIn</a> | <a href={profile.github} className={link}>GitHub</a>
                                </p>
                            </div>
                            {/* Screening software ignores images, so the portrait doesn't affect how the text is read. */}
                            <Image src={cv.photo} alt={profile.photo.alt} width={104} height={104} sizes="104px" quality={90} priority className="w-[104px] h-[104px] shrink-0 rounded-full object-cover ring-2 ring-[#dfe1e5] ring-offset-2 ring-offset-white" />
                        </header>

                        <div className="mt-6">
                            <Section title="Profile" color={BLUE}>
                                <p>{cv.summary}</p>
                            </Section>

                            <Section title="Experience" color={RED}>
                                <div className="space-y-2.5">
                                    {profile.experience.map((job) => (
                                        <div key={job.company}>
                                            <p className="flex items-baseline justify-between gap-x-4">
                                                <span><strong className="font-semibold">{job.role}</strong>, <strong className="font-semibold text-[#1a73e8]">{job.company}</strong></span>
                                                <span className={pill}>{job.cvPeriod}</span>
                                            </p>
                                            <p className="text-[#5f6368]">{job.about}</p>
                                            <ul className="mt-1.5 pl-[18px] list-disc space-y-0.5 marker:text-[#1a73e8]">
                                                {job.cvBullets.map((b) => <li key={b}>{b}</li>)}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </Section>

                            <Section title="Projects" color={YELLOW}>
                                <ul className="space-y-1.5">
                                    {projects.map((p) => (
                                        <li key={p.slug}>
                                            {p.live ? <a href={p.live} className={link}>{p.title}</a> : <strong className="font-semibold">{p.title}</strong>}. {p.summary}{' '}
                                            <span className="text-[#5f6368]">Built with {p.tech.join(', ')}.</span>
                                        </li>
                                    ))}
                                </ul>
                            </Section>

                            <Section title="Skills" color={GREEN}>
                                {/* Plain comma lists on purpose: chips lose their commas when a parser extracts the text. */}
                                <ul className="space-y-0.5">
                                    {cv.skills.map((s) => <li key={s.group}><strong className="font-semibold text-[#1558b0]">{s.group}:</strong> {s.items.join(', ')}</li>)}
                                </ul>
                            </Section>

                            <Section title="Education" color={BLUE}>
                                <ul className="space-y-1">
                                    {cv.education.map((e) => (
                                        <li key={e.title} className="flex items-baseline justify-between gap-x-4">
                                            <span><strong className="font-semibold">{e.title}</strong>, {e.school}</span>
                                            <span className={pill}>{e.period}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Section>

                            <Section title="Languages and other" color={RED}>
                                <p><strong className="font-semibold text-[#1558b0]">Languages:</strong> {cv.languages.join(', ')}</p>
                                <p><strong className="font-semibold text-[#1558b0]">Other:</strong> {cv.other.join(', ')}</p>
                            </Section>
                        </div>
                    </div>
                </article>
            </main>
        </div>
    );
}
