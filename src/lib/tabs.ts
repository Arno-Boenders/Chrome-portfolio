import { projectCards } from '@/data/projects';

export interface TabInfo {
    title: string;
    letter: string;
    color: string;     // favicon colour, with a white letter on top
    address: string;   // what the address bar shows after "arno://"
}

/** Title, favicon and address for a tab, worked out from the page it shows. */
export function describeTab(href: string): TabInfo {
    const [path, query = ''] = href.split('?');
    const address = href.replace(/^\//, '');

    if (path === '/') return { title: 'New Tab', letter: '', color: '#9aa0a6', address: '' };
    if (path === '/about') return { title: 'Arno Boenders', letter: 'A', color: '#1a73e8', address };
    if (path === '/projects') return { title: 'Projects - Arno Boenders', letter: 'P', color: '#d93025', address };
    if (path === '/experience') return { title: 'Experience - Arno Boenders', letter: 'E', color: '#e37400', address };
    if (path === '/contact') return { title: 'Contact - Arno Boenders', letter: '@', color: '#188038', address };
    if (path === '/cv') return { title: 'Arno-Boenders-CV.pdf', letter: 'C', color: '#5f6368', address };
    if (path === '/search') {
        const q = new URLSearchParams(query).get('q') ?? '';
        return { title: q ? `${q} - Arno Search` : 'Arno Search', letter: 'A', color: '#1a73e8', address };
    }
    const project = projectCards.find((p) => path === `/projects/${p.slug}`);
    if (project) return { title: project.title, letter: project.title[0], color: project.color, address };
    return { title: 'Page not found', letter: '!', color: '#9aa0a6', address };
}
