// Projects shown on /projects.
// Curated projects come first, in this order. Any other public, non-fork GitHub
// repo is appended automatically (newest first) unless listed in hiddenRepos.

export const GITHUB_USER = 'Arno-Boenders';

export interface ProjectImage {
    src: string;
    alt: string;
    // 'contain' + a background for logos, 'cover' for screenshots.
    fit: 'cover' | 'contain';
    background?: string;
    position?: string;      // CSS object-position for 'cover', default top
}

export interface CuratedProject {
    title: string;
    repo?: string;          // GitHub repo name; stars/language/date come from GitHub
    live?: string;
    year?: string;          // used when there is no repo to take a date from
    description: string;
    tech: string[];
    image?: ProjectImage;
}

export const curatedProjects: CuratedProject[] = [
    {
        title: 'Pickly',
        live: 'https://usepickly.com',
        year: '2026',
        description:
            'Group polls by link: make a poll, share it in the group chat and everyone votes without an account. ' +
            'Ranked, score, swipe and multi-select voting; options can be places on a map, dates, times or images, and results update live. ' +
            'Also works as a remote MCP server, so Claude can create polls and read results from a chat.',
        tech: ['Next.js', 'Cloudflare Workers', 'Postgres', 'Drizzle', 'MCP'],
        image: { src: '/projects/pickly.jpg', alt: 'Pickly poll results with a crowned winner', fit: 'cover', position: '95% 50%' },
    },
    {
        title: 'Munto',
        year: '2026',
        description:
            'Local-first budgeting app for Belgian bank accounts. It pulls transactions over PSD2 through Enable Banking into a SQLite file on your own machine, ' +
            'sorts them with rules plus AI suggestions from Claude, and shows budgets, savings, subscriptions and where to cut. Ships as a desktop app.',
        tech: ['Next.js', 'Electron', 'Node.js', 'SQLite', 'Claude'],
        image: { src: '/projects/munto.jpg', alt: 'Munto overview with spending pots and charts (sample data)', fit: 'cover', position: '0% 0%' },
    },
    {
        title: 'Wings of Belgium',
        repo: 'wings-of-belgium',
        live: 'https://wings-of-belgium.onrender.com/',
        description:
            'Recruitment web app for the Belgian Air Force, built in a team of four for the @Work 2 course at Arteveldehogeschool. ' +
            'Players learn about the jobs inside the Air Force by assembling the right team for each mission and then playing its mini-games. ' +
            'Also includes a news feed with the latest Defence updates.',
        tech: ['React', 'GraphQL', 'Hygraph', 'Material UI'],
        image: { src: '/projects/wings-of-belgium.svg', alt: 'Wings of Belgium logo', fit: 'contain', background: '#1f2a44' },
    },
    {
        title: 'PGM Learning App',
        repo: 'PGM-Learning-App',
        description: 'Quiz app for mobile, built with React Native and Expo.',
        tech: ['React Native', 'Expo', 'TypeScript'],
    },
    {
        title: 'Flappy Teachers',
        repo: 'Flappy-teachers',
        live: 'https://pgmgent-atwork2.github.io/project-1-workshop-start-2-code-daria-arno/',
        description:
            'Flappy Bird-style arcade game starring our teachers. Steer between the pipes with the space bar or arrow key; ' +
            'every pipe plays a sound and the game gets harder the further you go.',
        tech: ['JavaScript', 'HTML', 'CSS'],
        image: { src: '/projects/flappy-teachers.jpg', alt: 'Flappy Teachers gameplay', fit: 'cover', position: '50% 45%' },
    },
    {
        title: 'Camping in VR',
        description:
            'VR game first designed for a non-profit working with people with disabilities, which grew into a game with objectives, ' +
            'activities and scenic viewpoints to explore. Built in Unity with C# and the XR Interaction Toolkit; ' +
            'assets from the Unity Asset Store plus some modelled in Blender.',
        tech: ['Unity', 'C#', 'XR Toolkit', 'Blender'],
        image: { src: '/projects/kamperen-in-vr.jpg', alt: 'Camping in VR scene', fit: 'cover' },
    },
    {
        title: 'Studio Clean',
        repo: 'Clean',
        description:
            'UX Prototyping school project: rebuilding a given agency design as faithfully as possible as a static site, ' +
            'using the templating tools Nunjucks and Eleventy.',
        tech: ['Eleventy', 'Nunjucks', 'Markdown', 'CSS'],
        image: { src: '/projects/studio-clean.jpg', alt: 'Studio Clean homepage', fit: 'cover', position: '0% 0%' },
    },
    {
        title: 'Chrome Portfolio',
        repo: 'Chrome-portfolio',
        description:
            'This site: a portfolio styled as a search results page, with working search, light/dark mode and project data pulled live from the GitHub API.',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    },
];

// Never shown (profile README repo, older portfolio, experiments, ...).
export const hiddenRepos: string[] = ['Arno-Boenders'];
