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

    // Shows the green "Open to work" badge and the hiring box. Set to false to hide both.
    openToWork: true,

    // One-liner under the name in the side panel.
    tagline: 'Fullstack developer who enjoys building clean, user-centric apps and staying active outside of work.',

    skills: [
        'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'PHP', 'Laravel',
        'Vue', 'GraphQL', 'MySQL', 'HTML', 'CSS', 'Git',
    ],

    experience: [
        {
            company: 'Realo',
            about: 'Belgian real-estate platform, part of Immoweb',
            role: 'Fullstack Developer',
            period: 'Sept 2025 to now',
            since: 'September 2025',
            highlights: [
                {
                    title: 'Address pages in the Next.js rewrite',
                    description: 'The largest page in the new front end: price history, photos, a map rail, a features tab, a paywall, parcel pages and print/PDF output.',
                    tech: ['Next.js', 'TypeScript', 'React'],
                },
                {
                    title: 'Realo Pro self-upgrade',
                    description: 'Agents book extra seats themselves: an upgrade modal in the agent tools, seat counting from subscriptions, and a handover to sales through Slack and email.',
                    tech: ['PHP', 'MySQL', 'JavaScript', 'Slack'],
                },
                {
                    title: 'Government login for white-label sites',
                    description: 'Federated sign-in with CSAM, the Belgian government identity login, over OIDC: user creation and linking, session handling and a staged rollout behind a flag.',
                    tech: ['OIDC', 'PHP', 'AWS'],
                },
                {
                    title: 'Lifecycle and transactional email',
                    description: 'Onboarding, welcome, reactivation, team invites, renewal, cancellation and lead mails in Dutch, French and English. The area I own most clearly.',
                    tech: ['HTML email', 'PHP', 'Cron', 'Adyen'],
                },
                {
                    title: 'Valuation reports',
                    description: 'Rent graphs, market insights and regional price evolution in the estimate reports. Traced a PDF timeout to oversized cover images and fixed the cause, and added HEIC photo uploads.',
                    tech: ['PHP', 'Charts', 'Gotenberg'],
                },
                {
                    title: 'Sign-in security and performance',
                    description: 'Two-factor for Google sign-in and passkeys, a fast locality query for the dashboard city filter, and ranking for search results.',
                    tech: ['MySQL', 'Elasticsearch', 'Passkeys'],
                },
            ],
            // level: 3 = day to day, 2 = regularly, 1 = now and then.
            stack: [
                { group: 'Backend', items: [{ name: 'PHP 8', level: 3 }, { name: 'Slim', level: 2 }, { name: 'Composer', level: 2 }] },
                { group: 'Data', items: [{ name: 'MySQL', level: 3 }, { name: 'Elasticsearch / OpenSearch', level: 1 }] },
                {
                    group: 'Front end',
                    items: [
                        { name: 'Next.js', level: 3 }, { name: 'TypeScript', level: 3 }, { name: 'React', level: 3 },
                        { name: 'JavaScript', level: 3 }, { name: 'HTML email', level: 3 }, { name: 'SCSS', level: 2 },
                    ],
                },
                { group: 'Tooling', items: [{ name: 'GitHub', level: 2 }, { name: 'Docker Compose', level: 1 }, { name: 'AWS S3', level: 1 }, { name: 'Gotenberg', level: 1 }] },
            ],
        },
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

// The typed-in summary at the top of each results page.
export const overviews = {
    all:
        'Arno Boenders is a fullstack developer from Ghent, Belgium. Since September 2025 he has worked at Realo, part of Immoweb, across PHP, MySQL and the new Next.js and TypeScript front end. ' +
        'He graduated in Programming at Arteveldehogeschool in 2025. Side projects: Pickly, live group polls by link, and Munto, a local-first budgeting app for Belgian bank accounts.',
    projects:
        'The two most recent projects are his own products: Pickly, live group polls by link that also runs as an MCP server, and Munto, a local-first budgeting app that reads Belgian bank accounts over PSD2. ' +
        'Earlier work includes Wings of Belgium, a recruitment game for the Belgian Air Force built in a team of four.',
    experience:
        'Since September 2025 Arno has worked as a fullstack developer at Realo, a Belgian real-estate platform that is part of Immoweb (AVIV Group). ' +
        'He works across the whole platform, from the MySQL schema and PHP domain layer to templates, email and the new Next.js and TypeScript front end, and regularly ships features that span three to five repositories.',
    contact:
        'The fastest way to reach Arno is email. He currently works as a fullstack developer at Realo, part of Immoweb, and is open to hearing about fullstack developer roles. ' +
        'He is based in Ghent, Belgium, and works day to day with PHP, MySQL, Next.js, TypeScript and React.',
};

export const faq = [
    { q: 'Is Arno open to work?', a: 'Yes. Open to fullstack developer roles.' },
    { q: 'Where does Arno work?', a: 'At Realo, a Belgian real-estate platform that is part of Immoweb, as a fullstack developer since September 2025.' },
    { q: 'What does Arno build with?', a: 'PHP, MySQL, Next.js, TypeScript and React day to day at Realo. Node.js, Laravel, Vue and GraphQL in side projects and earlier work.' },
    { q: 'Where did Arno study?', a: 'Graduate in Programming at Arteveldehogeschool, Ghent (2023 to 2025), after a Bachelor in Electronics & ICT at Odisee (2020 to 2023).' },
    { q: 'Where is Arno based?', a: 'Ghent, Belgium.' },
];

// Queries the landing page types into its search box and offers as chips.
export const suggestedSearches = ['arno boenders projects', 'arno boenders experience', 'next.js', 'contact arno'];

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
                url: '/experience',
                title: 'Experience - Arno Boenders',
                description: 'Fullstack developer at Realo, part of Immoweb, since September 2025: PHP, MySQL and the new Next.js and TypeScript front end.',
                source: 'site',
            },
            {
                url: '/contact',
                title: 'Contact Arno Boenders',
                description: 'Open to fullstack developer roles. Reach out by email or LinkedIn.',
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
