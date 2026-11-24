'use client'
import Link from 'next/link';
import OfflineRunner from './OfflineRunner';
import { btn, btnPrimary } from '@/lib/ui';

interface Props {
    title: string;
    text: string;
    code: string;
    onRetry?: () => void;   // shown as "Try again" when the page itself went "offline"
}

/** The browser's own error screen, with the running game on top. */
export default function OfflineScreen({ title, text, code, onRetry }: Props) {
    return (
        <main id="main" tabIndex={-1} className="outline-none mx-auto w-full max-w-[760px] px-4 sm:px-8 pt-10 sm:pt-14 pb-24">
            <div className="rise">
                <OfflineRunner />
            </div>
            <h1 className="rise d1 mt-8 font-display font-medium text-[28px] leading-tight text-ink">{title}</h1>
            <p className="rise d2 mt-3 max-w-[60ch] text-[15px] leading-[1.6] text-snippet">{text}</p>
            <p className="rise d2 mt-3 text-xs uppercase tracking-[0.06em] text-muted">{code}</p>
            <div className="rise d3 mt-6 flex flex-wrap gap-2.5">
                {onRetry && <button type="button" onClick={onRetry} className={btnPrimary}>Try again</button>}
                <Link href="/" className={onRetry ? btn : btnPrimary}>Open a new tab</Link>
            </div>
        </main>
    );
}
