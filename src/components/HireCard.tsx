import { profile } from '@/data/profile';
import { btn } from '@/lib/ui';
import CopyButton from './CopyButton';

/** The "Sponsored" result: the one ad on the site, for its owner. */
export default function HireCard() {
    return (
        <section className="rounded-xl border border-dashed border-line px-4 py-3.5 text-sm text-ink">
            <p><span className="text-xs text-muted">Sponsored</span> · <strong className="font-semibold">{profile.openToWork ? `Hire ${profile.name}` : `Contact ${profile.name}`}</strong></p>
            <p className="text-snippet">{profile.openToWork ? 'Open to fullstack developer roles.' : 'Email is the fastest way to reach me.'}</p>
            <p className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2">
                <a href={`mailto:${profile.email}`} className="text-link hover:underline [overflow-wrap:anywhere]">{profile.email}</a>
                <CopyButton text={profile.email} label="Copy email" className={btn} />
            </p>
        </section>
    );
}
