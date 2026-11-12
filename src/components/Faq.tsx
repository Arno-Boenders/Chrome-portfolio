import { faq } from '@/data/profile';
import { sectionHeading } from '@/lib/ui';

/** "People also ask": the questions a recruiter has, answered. */
export default function Faq({ title = 'People also ask' }: { title?: string }) {
    return (
        <section>
            <h2 className={sectionHeading}>{title}</h2>
            <div className="mt-2.5 border-b border-line">
                {faq.map((item) => (
                    <details key={item.q} className="group border-t border-line">
                        <summary className="flex items-center justify-between gap-4 py-3 text-base text-ink cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                            {item.q}
                            <span className="text-muted transition-transform duration-200 ease-[var(--ease-out)] group-open:rotate-180 motion-reduce:transition-none" aria-hidden>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m4 6 4 4 4-4" /></svg>
                            </span>
                        </summary>
                        <p className="pb-3.5 max-w-[62ch] text-sm leading-[1.6] text-snippet">{item.a}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}
