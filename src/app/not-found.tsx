import Link from 'next/link';
import { btnPrimary } from '@/lib/ui';

// The browser's own "site can't be reached" page.
export default function NotFound() {
    return (
        <main id="main" tabIndex={-1} className="outline-none px-6 sm:px-16 pt-16 pb-24 max-w-[640px]">
            <h1 className="font-display font-medium text-[28px] leading-tight text-ink">This page can&apos;t be reached</h1>
            <p className="mt-3 text-[15px] leading-[1.6] text-snippet">There is no page at this address. Check the spelling, or search for what you were after.</p>
            <p className="mt-3 text-xs uppercase tracking-[0.06em] text-muted">ERR_PAGE_NOT_FOUND</p>
            <Link href="/" className={`${btnPrimary} mt-6`}>Open a new tab</Link>
        </main>
    );
}
