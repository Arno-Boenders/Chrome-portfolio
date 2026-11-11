import { GraduationCap } from 'lucide-react';
import { profile } from '@/data/profile';

export default function EducationList() {
    return (
        <ol className="stagger space-y-8">
            {profile.education.map((e) => (
                <li key={e.title} className="flex gap-3 animate-fade-in">
                    <span className="w-7 h-7 shrink-0 rounded-full border border-line bg-chip flex items-center justify-center text-ink">
                        <GraduationCap className="w-4 h-4" strokeWidth={1.75} />
                    </span>
                    <div>
                        <p className="text-sm text-ink">{e.school}</p>
                        <h2 className="text-xl leading-snug text-ink">{e.title}</h2>
                        <p className="text-sm leading-[1.6] text-snippet mt-1"><span className="text-muted">{e.period} — </span>{e.description}</p>
                    </div>
                </li>
            ))}
        </ol>
    );
}
