import type { Source } from '@/data/profile';
import { profile } from '@/data/profile';

const KNOWN: Record<string, string> = {
    'github.com': 'GitHub',
    'www.linkedin.com': 'LinkedIn',
    'linkedin.com': 'LinkedIn',
};

/** Site name + breadcrumb line shown above a result title, like Google does. */
export function describeUrl(url: string): { site: string; crumb: string } {
    if (url.startsWith('mailto:')) return { site: 'Email', crumb: url.slice(7) };
    if (url.startsWith('/')) {
        const parts = url.split(/[/?#]/).filter(Boolean);
        return { site: profile.name, crumb: ['Portfolio', ...parts.map((p) => p[0].toUpperCase() + p.slice(1))].join(' › ') };
    }
    try {
        const u = new URL(url);
        const parts = u.pathname.split('/').filter(Boolean);
        return {
            site: KNOWN[u.hostname] ?? u.hostname.replace(/^www\./, ''),
            crumb: [`${u.protocol}//${u.hostname}`, ...parts].join(' › '),
        };
    } catch {
        return { site: url, crumb: url };
    }
}

export function sourceOf(url: string): Source {
    if (url.startsWith('mailto:')) return 'email';
    if (url.startsWith('/')) return 'site';
    if (url.includes('github.com')) return 'github';
    if (url.includes('linkedin.com')) return 'linkedin';
    return 'web';
}

const monthYear = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric', timeZone: 'Europe/Brussels' });

const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });

/** 1284 → "1.3K"; small counts stay exact. */
export const formatCount = (n: number) => (n < 1000 ? String(n) : compact.format(n));

export function formatDate(value: string | null): string | null {
    if (!value) return null;
    if (/^\d{4}$/.test(value)) return value;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : monthYear.format(d);
}
