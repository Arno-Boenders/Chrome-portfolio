import Link from 'next/link';
import LuckyButton from '@components/LuckyButton';
import Reveal from '@components/Reveal';
import { ProjectThumb } from '@components/ProjectCard';
import SearchBox from '@components/SearchBox';
import Wordmark from '@components/Wordmark';
import { profile, suggestedSearches } from '@data/profile';
import { projectCards } from '@data/projects';
import { btn } from '@/lib/ui';

// The landing page is a browser's New Tab page: wordmark, search, and the projects where the shortcuts would be.
export default function NewTabPage() {
    const job = profile.experience[0];
    const tiles = projectCards.filter((p) => p.image).slice(0, 6);

    return (
        <main id="main" tabIndex={-1} className="relative outline-none flex flex-col items-center gap-[22px] px-5 pt-10 sm:pt-16 pb-20 text-center">
            <div className="aurora" aria-hidden><i /><i /><i /><i /></div>
            <h1 className="relative">
                <Wordmark drop className="text-[clamp(84px,19vw,148px)] leading-[0.9]" />
                <span className="sr-only"> Boenders, {profile.role}</span>
            </h1>
            <p className="rise relative flex flex-wrap justify-center items-center gap-x-3.5 gap-y-2 text-[15px] text-snippet d1">
                Fullstack developer{job ? ` at ${job.company}` : ''} · {profile.location}
                {profile.openToWork && (
                    <span className="inline-flex items-center gap-[7px] px-3 py-[3px] rounded-full bg-chip text-[13px] text-ink">
                        <span className="w-2 h-2 rounded-full bg-ggreen" aria-hidden />Open to work
                    </span>
                )}
            </p>
            <SearchBox hero typing={suggestedSearches} className="rise relative max-w-[620px] d2" />
            <div className="rise relative flex flex-wrap justify-center gap-2.5 d3">
                <Link href="/projects" className={btn}>See projects</Link>
                <LuckyButton hrefs={tiles.map((p) => `/projects/${p.slug}`)} className={btn} />
            </div>
            <ul className="rise relative flex flex-wrap justify-center gap-2.5 d4">
                {suggestedSearches.map((s) => (
                    <li key={s}>
                        <Link href={`/search?q=${encodeURIComponent(s)}`} className="pressable block px-3.5 py-1.5 rounded-full border border-line text-[13.5px] text-ink hover:bg-hover">{s}</Link>
                    </li>
                ))}
            </ul>
            <ul className="relative w-full max-w-[760px] grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6 mt-6 text-left">
                {tiles.map((p, i) => (
                    <Reveal as="li" key={p.slug} index={i % 3}>
                        <Link href={`/projects/${p.slug}`} className="group block">
                            <ProjectThumb project={p} sizes="(min-width: 640px) 210px, 50vw" className="aspect-[16/10] rounded-xl border border-line" />
                            <span className="block mt-2 font-display font-medium text-[15px] text-ink group-hover:underline">{p.title}</span>
                            <span className="block text-xs text-muted truncate">{p.tech.slice(0, 2).join(' · ')}</span>
                        </Link>
                    </Reveal>
                ))}
            </ul>
        </main>
    );
}
