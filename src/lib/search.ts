import { pages, profile, type Result } from '@/data/profile';
import type { Project } from '@/lib/github';

export type SearchHit =
    | { kind: 'result'; result: Result }
    | { kind: 'project'; project: Project };

// Words that match everything on this site and so carry no signal.
const NOISE = new Set(['arno', 'boenders', 'arno-boenders', 'the', 'a', 'an', 'and', 'of', 'in', 'with', 'by', 'for']);

export const tokenize = (q: string) =>
    q.toLowerCase().split(/[^a-z0-9#.+]+/).filter((t) => t && !NOISE.has(t));

function score(tokens: string[], haystack: string) {
    const h = haystack.toLowerCase();
    return tokens.reduce((n, t) => n + (h.includes(t) ? 1 : 0), 0);
}

export function search(query: string, projects: Project[]): SearchHit[] {
    const tokens = tokenize(query);

    const skillsResult: Result = {
        url: '/about',
        title: 'Arno Boenders - Skills & education',
        description: `Skills: ${profile.skills.join(', ')}. ${profile.education.map((e) => `${e.title}, ${e.school} (${e.period})`).join('. ')}.`,
        source: 'site',
    };

    const candidates: { hit: SearchHit; text: string }[] = [
        ...projects.map((p) => ({
            hit: { kind: 'project' as const, project: p },
            text: `${p.title} ${p.description} ${p.tech.join(' ')}`,
        })),
        ...[skillsResult, ...pages.about.results, ...pages.contact.results].map((r) => ({
            hit: { kind: 'result' as const, result: r },
            text: `${r.title} ${r.description}`,
        })),
    ];

    // A bare name search ("arno boenders") shows the main About results.
    if (tokens.length === 0) {
        return pages.about.results.map((result) => ({ kind: 'result', result }));
    }

    const seen = new Set<string>();
    return candidates
        .map((c) => ({ ...c, s: score(tokens, c.text) }))
        .filter((c) => c.s > 0)
        .sort((a, b) => b.s - a.s)
        .map((c) => c.hit)
        .filter((hit) => {
            const key = hit.kind === 'project' ? 'p' + hit.project.title : hit.result.url + hit.result.title;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
}

export const suggestions = ['Next.js', 'React', 'Polls', 'Budget', 'Unity'];
