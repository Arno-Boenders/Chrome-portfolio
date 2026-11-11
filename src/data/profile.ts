// Everything personal on the site comes from this file.
// Projects live in ./projects.ts (curated) + the GitHub API.

export type Source = 'linkedin' | 'github' | 'email' | 'site' | 'web';

export interface Result {
    url: string;
    title: string;
    description: string;
    source: Source;
}

export const profile = {
    name: 'Arno Boenders',
    role: 'Fullstack Developer',
    location: 'Ghent, Belgium',
    photo: { src: '/Arno.jpeg', width: 934, height: 2000, alt: 'Arno Boenders' },

    email: 'arnoboenders@gmail.com',
    linkedin: 'https://www.linkedin.com/in/arno-boenders-816117228/',
    github: 'https://github.com/Arno-Boenders',

    // Featured-snippet bio at the top of the About page.
    bio:
        'Arno Boenders is a fullstack developer from Ghent, Belgium, who graduated in Programming at Arteveldehogeschool in 2025. ' +
        'He builds web and mobile apps with React, Next.js, TypeScript and Node.js, and is just as comfortable on the PHP/Laravel side. ' +
        'He cares about clean, user-centric interfaces and keeps pushing his technical boundaries, ' +
        'from Pickly, a live group-poll app, to Munto, a local-first budgeting app that reads Belgian bank accounts.',

    // One-liner under the name in the side panel.
    tagline: 'Fullstack developer who enjoys building clean, user-centric apps and staying active outside of work.',

    skills: [
        'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'PHP', 'Laravel',
        'Vue', 'GraphQL', 'MySQL', 'HTML', 'CSS', 'Git',
    ],

    education: [
        {
            title: 'Graduate in Programming',
            school: 'Arteveldehogeschool, Ghent',
            period: '2023 – 2025',
            description: 'Fullstack web development: React, Next.js, Node.js, PHP/Laravel, databases and UX prototyping, with real client projects such as Wings of Belgium for the Belgian Air Force.',
        },
        {
            title: 'Bachelor Electronics & ICT',
            school: 'Odisee',
            period: '2020 – 2023',
            description: 'Electronics and ICT fundamentals before switching fully to software development.',
        },
    ],
};

export const pages = {
    about: {
        query: 'Arno Boenders fullstack developer',
        results: [
            {
                url: profile.linkedin,
                title: 'Arno Boenders - Fullstack Developer | LinkedIn',
                description:
                    'Fullstack development graduate of Arteveldehogeschool. Strong foundation in JavaScript, TypeScript, React, Node.js, Next.js, PHP and CSS, with a focus on clean, user-centric applications.',
                source: 'linkedin',
            },
            {
                url: profile.github,
                title: 'Arno Boenders (@Arno-Boenders) · GitHub',
                description:
                    'Projects in React, TypeScript and backend integrations. From personal experiments to fullstack assignments, the code behind everything on this site.',
                source: 'github',
            },
            {
                url: '/projects',
                title: 'Projects - Arno Boenders',
                description:
                    'Pickly, a live group-poll app at usepickly.com; Munto, a local-first budgeting app for Belgian banks; Wings of Belgium for the Belgian Air Force and more, with screenshots, tech stacks and live demos.',
                source: 'site',
            },
            {
                url: '/contact',
                title: 'Contact Arno Boenders',
                description: 'Open to fullstack developer roles and freelance projects. Reach out by email or LinkedIn.',
                source: 'site',
            },
        ] satisfies Result[],
    },
    projects: {
        query: 'Arno Boenders projects',
    },
    contact: {
        query: 'Arno Boenders contact',
        results: [
            {
                url: `mailto:arnoboenders@gmail.com`,
                title: 'Email Arno Boenders - arnoboenders@gmail.com',
                description: 'The fastest way to reach Arno for job opportunities, collaborations or project inquiries. Open to fullstack development roles.',
                source: 'email',
            },
            {
                url: profile.linkedin,
                title: 'Arno Boenders - LinkedIn',
                description: 'Connect on LinkedIn for his work history, project updates and professional achievements.',
                source: 'linkedin',
            },
            {
                url: profile.github,
                title: 'Arno Boenders - GitHub',
                description: 'Browse the code, follow along with new projects, or open an issue on any of them.',
                source: 'github',
            },
        ] satisfies Result[],
    },
};
