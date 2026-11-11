import type { Metadata } from 'next';
import KnowledgePanel from '@components/KnowledgePanel';
import PageShell from '@components/PageShell';
import ResultItem from '@components/ResultItem';
import { pages } from '@data/profile';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Get in touch with Arno Boenders for fullstack development roles and projects.',
};

export default function ContactPage() {
    return (
        <PageShell
            title="Contact Arno Boenders"
            query={pages.contact.query}
            basePath="/contact"
            categories={[{ id: 'all', label: 'All' }]}
            active="all"
            count={pages.contact.results.length}
            aside={<KnowledgePanel />}
        >
            {pages.contact.results.map((r) => <ResultItem key={r.url} {...r} />)}
        </PageShell>
    );
}
