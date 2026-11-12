import { FileText, GithubIcon, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { profile } from '@/data/profile';
import { btn } from '@/lib/ui';

type Person = typeof profile;

// Props default to the real data; the dev stress-test page passes fixtures through them.
export default function KnowledgePanel({ person = profile }: { person?: Person }) {
    const job = person.experience[0];
    const latest = person.education[0];

    return (
        <section className="rounded-2xl border border-line overflow-hidden" aria-label={`About ${person.name}`}>
            <div className="relative h-56">
                <Image src={person.photo.src} alt={person.photo.alt} fill priority sizes="(min-width: 1024px) 320px, 100vw" className="object-cover object-[50%_40%]" />
            </div>
            <div className="px-[18px] pt-4 pb-[18px] flex flex-col gap-2.5 text-sm text-ink [overflow-wrap:anywhere]">
                <div>
                    <h2 className="font-display font-medium text-[26px] leading-tight">{person.name}</h2>
                    <p className="text-muted">{person.role} · {person.location}</p>
                </div>
                {person.tagline && <p className="leading-[1.6]">{person.tagline}</p>}
                {job && <p><span className="font-semibold">Works at: </span>{job.company}, since {job.since}</p>}
                {latest && <p><span className="font-semibold">Education: </span>{latest.title}, {latest.school} ({latest.period})</p>}
                <div className="flex flex-wrap gap-2 mt-1">
                    <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className={btn}><LinkedinIcon className="w-4 h-4" strokeWidth={1.75} aria-hidden />LinkedIn</a>
                    <a href={person.github} target="_blank" rel="noopener noreferrer" className={btn}><GithubIcon className="w-4 h-4" strokeWidth={1.75} aria-hidden />GitHub</a>
                    <Link href="/cv" className={btn}><FileText className="w-4 h-4" strokeWidth={1.75} aria-hidden />CV</Link>
                </div>
            </div>
        </section>
    );
}
