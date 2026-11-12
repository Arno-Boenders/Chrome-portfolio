'use client'
import Link from 'next/link';
import { useTabs } from './BrowserFrame';

/** A link that opens its page in a new tab of the site's own browser window. */
export default function TabLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
    const { openInNewTab } = useTabs();
    return (
        <Link
            href={href}
            className={className}
            onClick={(e) => {
                // Leave modified clicks (new real tab, new window) to the visitor's own browser.
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                e.preventDefault();
                openInNewTab(href);
            }}
        >
            {children}
        </Link>
    );
}
