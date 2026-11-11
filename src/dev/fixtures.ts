// Worst-case data for the dev-only /dev/break page. Every value is something
// GitHub, the curated list or profile.ts could realistically produce.
import { pages, profile, type Result } from '@/data/profile';
import type { ProjectImage } from '@/data/projects';
import type { Project } from '@/lib/github';

export type Person = typeof profile;
export interface Fixture {
    projects: Project[];
    results: Result[];
    person: Person;
    panelImages?: ProjectImage[];
    searchQuery: string;
}

const photo: ProjectImage = { src: profile.photo.src, alt: 'Tall portrait', fit: 'cover' };

const worstProjects: Project[] = [
    {
        // GitHub repo names allow 100 chars; school repos are often this long.
        title: 'Pgm 4 Final Work Accessible Booking Platform For Ghent Sports Clubs',
        url: 'https://github.com/Arno-Boenders/pgm-4-final-work-accessible-booking-platform-for-ghent-sports-clubs',
        repoUrl: 'https://github.com/Arno-Boenders/pgm-4-final-work-accessible-booking-platform-for-ghent-sports-clubs',
        liveUrl: 'https://pgm-4-final-work-accessible-booking-platform-for-ghent-sports-clubs.onrender.com/',
        // README excerpt with a pasted URL: no break opportunities.
        description:
            'Booking platform for Ghent sports clubs. Deployed at https://pgm-4-final-work-accessible-booking-platform-for-ghent-sports-clubs.onrender.com/clubs/kaa-gent/reservations?week=2025-W14 with a Strapi backend.',
        // GitHub allows 20 topics of up to 50 chars; curated tech lists are unbounded.
        tech: ['Next.js', 'TypeScript', 'react-native-reanimated', 'accessibility-wcag-2-2-aa-compliance', 'Strapi', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'Playwright'],
        image: photo, // a 934×2000 portrait screenshot in a square thumb
        updated: '2025-06-30T11:24:09Z',
        stars: 1284,
    },
    {
        title: 'X',                     // one-letter repo name
        url: 'https://github.com/Arno-Boenders/x',
        repoUrl: 'https://github.com/Arno-Boenders/x',
        liveUrl: null,
        description: 'No description yet.',
        tech: [],
        image: null,
        updated: null,
        stars: 0,
    },
    {
        title: 'Quiz App 🚀 Đặng Thị Ngọc Hân 日本語テスト',
        url: 'https://github.com/Arno-Boenders/quiz',
        repoUrl: 'https://github.com/Arno-Boenders/quiz',
        liveUrl: null,
        description: 'Benachrichtigungseinstellungen-Verwaltungsoberfläche · <script>alert(1)</script> · &amp; **bold** · 👩🏽‍💻 Ước mơ.',
        tech: ['TypeScript'],
        image: { src: '/projects/wings-of-belgium.svg', alt: 'Logo on dark tile', fit: 'contain', background: '#1f2a44' },
        updated: '2025-01-01T07:30:00+09:00', // a different day in UTC
        stars: 1,
    },
    {
        title: 'Studio Clean',
        url: 'https://github.com/Arno-Boenders/Clean',
        repoUrl: 'https://github.com/Arno-Boenders/Clean',
        liveUrl: 'https://clean.example.com',
        description: 'Image path that 404s after a rename.',
        tech: ['Eleventy'],
        image: { src: '/projects/studio-clean-v2.jpg', alt: 'Missing screenshot', fit: 'cover' },
        updated: 'not-a-date',
        stars: 3,
    },
    {
        title: 'X',                     // identical title to row 2 (prettified "x" vs "X")
        url: null,
        repoUrl: null,
        liveUrl: null,
        description: 'Curated project with neither a repo nor a live link.',
        tech: ['Unity'],
        image: photo,                   // same image src as row 1
        updated: null,
        stars: 0,
    },
];

const worstResults: Result[] = [
    {
        url: 'mailto:bartholomew.fitzgerald@northwind-industries-holdings.example.com',
        title: 'Email Aleksandra Wiśniewska-Kowalczyk - bartholomew.fitzgerald@northwind-industries-holdings.example.com',
        description: 'Reach out at bartholomew.fitzgerald@northwind-industries-holdings.example.com.',
        source: 'email',
    },
    {
        url: 'https://www.linkedin.com/in/aleksandra-wisniewska-kowalczyk-816117228-senior-product-design-engineer/',
        title: 'LinkedIn',
        description: '',            // empty description
        source: 'linkedin',
    },
];

const worstPerson: Person = {
    ...profile,
    name: 'Aleksandra Wiśniewska-Kowalczyk',
    role: 'Senior Product Design Engineer, Platform Infrastructure',
    location: 'Sint-Martens-Latem, Oost-Vlaanderen, Belgium',
    tagline: '',
    skills: [...profile.skills, 'Benachrichtigungseinstellungen', 'React Native', 'Expo', 'Unity', 'C#', 'Blender', 'Docker', 'PostgreSQL', 'Strapi', 'Playwright', 'Figma'],
    education: [{ ...profile.education[0], title: 'Graduaat Programmeren (Graduate in Programming), specialisation Fullstack Web Development', school: 'Arteveldehogeschool, Campus Mariakerke, Ghent' }],
};

export const fixtures: Record<string, Fixture> = {
    worst: { projects: worstProjects, results: worstResults, person: worstPerson, searchQuery: 'bartholomew.fitzgerald@northwind-industries-holdings.example.com' },
    one: { projects: worstProjects.slice(1, 2), results: pages.contact.results.slice(0, 1), person: profile, panelImages: [], searchQuery: 'x' },
    empty: { projects: [], results: [], person: { ...profile, education: [] }, panelImages: [], searchQuery: 'kubernetes' },
};
