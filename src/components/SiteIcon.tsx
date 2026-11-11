import { GithubIcon, Globe, LinkedinIcon, Mail } from 'lucide-react';
import type { Source } from '@/data/profile';

export default function SiteIcon({ source }: { source: Source }) {
    const box = 'w-7 h-7 shrink-0 rounded-full border border-line bg-chip flex items-center justify-center text-ink';
    const icon = 'w-4 h-4';
    switch (source) {
        case 'linkedin': return <span className={box}><LinkedinIcon className={icon} strokeWidth={1.75} /></span>;
        case 'github': return <span className={box}><GithubIcon className={icon} strokeWidth={1.75} /></span>;
        case 'email': return <span className={box}><Mail className={icon} strokeWidth={1.75} /></span>;
        case 'site': return <span className={`${box} text-xs font-bold text-accent`}>A</span>;
        default: return <span className={box}><Globe className={icon} strokeWidth={1.75} /></span>;
    }
}
