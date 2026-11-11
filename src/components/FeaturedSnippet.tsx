import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { profile } from '@/data/profile';

// Hover-only nudge (Tailwind 4 gates hover: to mouse devices).
const arrow = 'w-4 h-4 transition-transform duration-150 ease-[var(--ease-out)] group-hover:translate-x-0.5 motion-reduce:transition-none';

export default function FeaturedSnippet() {
    return (
        <section className="mb-10 rounded-xl border border-line p-5 animate-fade-in">
            <p className="text-sm text-muted mb-2">About {profile.name.split(' ')[0]}</p>
            <p className="text-base leading-7 text-ink">{profile.bio}</p>
            <div className="flex flex-wrap gap-x-6 mt-2 text-sm">
                <Link href="/projects" className="group min-h-11 flex items-center gap-1 text-link hover:underline">See projects <ArrowRight className={arrow} /></Link>
                <Link href="/contact" className="group min-h-11 flex items-center gap-1 text-link hover:underline">Get in touch <ArrowRight className={arrow} /></Link>
            </div>
        </section>
    );
}
