import 'server-only';
import { GITHUB_USER, curatedProjects, hiddenRepos, type ProjectImage } from '@/data/projects';

export interface Project {
    title: string;
    url: string | null;       // main link: repo, or live demo; null when neither exists
    repoUrl: string | null;
    liveUrl: string | null;
    description: string;
    tech: string[];
    image: ProjectImage | null;
    updated: string | null;   // ISO date, or a year
    stars: number;
}

interface GithubRepo {
    name: string;
    html_url: string;
    homepage: string | null;
    description: string | null;
    language: string | null;
    topics?: string[];
    stargazers_count: number;
    pushed_at: string;
    fork: boolean;
    archived: boolean;
}

const REVALIDATE_SECONDS = 60 * 60;

// Optional and server-only: raises the rate limit from 60 to 5000 req/h.
// Never prefix this with NEXT_PUBLIC_, or it ends up in the browser bundle.
function headers(): HeadersInit {
    const token = process.env.GITHUB_TOKEN;
    return {
        Accept: 'application/vnd.github+json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
}

const lower = (s: string) => s.toLowerCase();

// Turns a README into a plain-text first paragraph that reads like a description.
function readmeExcerpt(markdown: string, max = 220): string {
    const text = markdown
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/<[^>]+>/g, '')
        .split(/\n\s*\n/)
        .map((block) =>
            block
                .split('\n')
                .filter((line) => !/^\s*(#|\||[-*_]{3,}|!\[|\[!\[)/.test(line))
                .join(' ')
                .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
                .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
                .replace(/[*_`~>]/g, '')
                .replace(/\s+/g, ' ')
                .trim()
        )
        .find((p) => p.length > 40);

    if (!text) return '';
    return text.length > max ? `${text.slice(0, max).replace(/\s+\S*$/, '')}…` : text;
}

async function getReadmeExcerpt(repo: string): Promise<string> {
    try {
        const res = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${repo}/readme`, {
            headers: { ...headers(), Accept: 'application/vnd.github.raw' },
            next: { revalidate: REVALIDATE_SECONDS },
        });
        if (!res.ok) return '';
        return readmeExcerpt(await res.text());
    } catch {
        return '';
    }
}

const MAX_PAGES = 5;          // 500 repos
const MAX_README_LOOKUPS = 10; // keeps a cold cache well under the 60 req/h anonymous limit

async function getRepos(): Promise<GithubRepo[]> {
    const repos: GithubRepo[] = [];
    try {
        for (let page = 1; page <= MAX_PAGES; page++) {
            const res = await fetch(
                `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed&page=${page}`,
                { headers: headers(), next: { revalidate: REVALIDATE_SECONDS } }
            );
            if (!res.ok) {
                console.error(`GitHub API ${res.status}: ${await res.text()}`);
                break;
            }
            const batch = (await res.json()) as GithubRepo[];
            repos.push(...batch);
            if (batch.length < 100) break;
        }
    } catch (error) {
        console.error('GitHub API unreachable', error);
    }
    return repos;
}

const prettify = (name: string) => name.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

/** Curated projects first (always shown, even if GitHub is down), then other public repos. */
export async function getProjects(): Promise<Project[]> {
    const repos = await getRepos();
    const byName = new Map(repos.map((r) => [lower(r.name), r]));
    const curatedNames = new Set(curatedProjects.flatMap((p) => (p.repo ? [lower(p.repo)] : [])));
    const hidden = new Set(hiddenRepos.map(lower));

    const curated: Project[] = curatedProjects.map((p) => {
        const repo = p.repo ? byName.get(lower(p.repo)) : undefined;
        const repoUrl = repo?.html_url ?? (p.repo ? `https://github.com/${GITHUB_USER}/${p.repo}` : null);
        const liveUrl = p.live ?? (repo?.homepage || null);
        return {
            title: p.title,
            url: repoUrl ?? liveUrl,
            repoUrl,
            liveUrl,
            description: p.description,
            tech: p.tech,
            image: p.image ?? null,
            updated: repo?.pushed_at ?? p.year ?? null,
            stars: repo?.stargazers_count ?? 0,
        };
    });

    let readmeLookups = 0;
    const rest = await Promise.all(
        repos
            .filter((r) => !r.fork && !r.archived && !hidden.has(lower(r.name)) && !curatedNames.has(lower(r.name)))
            .map(async (r): Promise<Project> => ({
                title: prettify(r.name),
                url: r.html_url,
                repoUrl: r.html_url,
                liveUrl: r.homepage || null,
                description:
                    r.description ||
                    (readmeLookups++ < MAX_README_LOOKUPS ? await getReadmeExcerpt(r.name) : '') ||
                    'No description yet.',
                tech: [r.language, ...(r.topics ?? [])].filter((t): t is string => !!t).slice(0, 4),
                image: null,
                updated: r.pushed_at,
                stars: r.stargazers_count,
            }))
    );

    return [...curated, ...rest];
}
