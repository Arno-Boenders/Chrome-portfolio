import { GithubIcon, LinkedinIcon, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { profile } from '@/data/profile';
import { curatedProjects, type ProjectImage } from '@/data/projects';
import Thumb from './Thumb';

const button = 'pressable flex items-center gap-2 px-3 min-h-11 sm:min-h-0 sm:py-1.5 rounded-full border border-line text-sm text-ink hover:bg-hover';

type Person = typeof profile;

// Props default to the real data; the dev stress-test page passes fixtures through them.
export default function KnowledgePanel({ person = profile, images }: { person?: Person; images?: ProjectImage[] }) {
    const shots = (images ?? curatedProjects.flatMap((p) => (p.image ? [p.image] : []))).slice(0, 2);
    const profile = person;
    const latest = profile.education[0];

    return (
        <section className="rounded-xl border border-line overflow-hidden" aria-label={`About ${profile.name}`}>
            <div className={`grid gap-0.5 h-44 sm:h-52 ${shots.length === 2 ? 'grid-cols-3 grid-rows-2' : 'grid-cols-1'}`}>
                <div className={`relative ${shots.length === 2 ? 'col-span-2 row-span-2' : ''}`}>
                    <Image src={profile.photo.src} alt={profile.photo.alt} fill priority sizes="(min-width: 1024px) 248px, 66vw" className="object-cover object-[50%_42%]" />
                </div>
                {shots.length === 2 && <Thumb image={shots[0]} sizes="124px" className="h-full" />}
                {shots.length === 2 && (
                    <Link href="/about?tab=images" className="relative block">
                        <Thumb image={shots[1]} sizes="124px" className="h-full" />
                        <span className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-medium">More images</span>
                    </Link>
                )}
            </div>

            <div className="p-4 sm:p-5">
                <h2 className="text-[28px] leading-tight text-ink">{profile.name}</h2>
                <p className="text-sm text-muted">{profile.role} · {profile.location}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                    <a href={profile.linkedin} className={button}><LinkedinIcon className="w-4 h-4" strokeWidth={1.75} />LinkedIn</a>
                    <a href={profile.github} className={button}><GithubIcon className="w-4 h-4" strokeWidth={1.75} />GitHub</a>
                    <a href={`mailto:${profile.email}`} className={button}><Mail className="w-4 h-4" strokeWidth={1.75} />Email</a>
                </div>

                <div className="mt-4 pt-4 border-t border-line">
                    {profile.tagline && <p className="text-sm leading-[1.6] text-snippet mb-4">{profile.tagline}</p>}

                    <dl className="text-sm text-ink space-y-2">
                        {latest && <div><dt className="inline font-semibold">Education: </dt><dd className="inline">{latest.title}, {latest.school} ({latest.period})</dd></div>}
                        {profile.skills.length > 0 && <div><dt className="inline font-semibold">Skills: </dt><dd className="inline">{profile.skills.join(', ')}</dd></div>}
                        <div><dt className="inline font-semibold">Based in: </dt><dd className="inline">{profile.location}</dd></div>
                    </dl>
                </div>
            </div>
        </section>
    );
}
