
'use client'
import { Metadata } from 'next';
import BrowserHeader from '@components/BrowserHeader';
import GoogleSearch from '@components/GoogleSearch';
import SearchResults from '@components/SearchResults';

// export const metadata: Metadata = {
//     title: 'About Arno Boenders - Fullstack Developer',
//     description: 'Arno Boenders is a 22-year-old programming student at Artevelde University College with a passion for web development.',
// };

import { useNav } from '@context/NavContext';
import { useTheme } from '@context/ThemeContext';

export default function AboutPage() {
    const { theme } = useTheme();
    const { activeTab } = useNav();

    const searchData = {
        about: {
            query: 'Arno Boenders fullstack developer',
            results: [
                {
                    url: 'https://www.linkedin.com/in/arno-boenders-816117228/',
                    title: 'Arno Boenders - Fullstack Developer | LinkedIn',
                    description: 'Hello, I am Arno Boenders, 24 years old and I study programming at Arteveldehogeschool. My goal is to become a fullstack developer. I already have knowledge of various useful programming languages such as HTML, CSS, React, JavaScript and PHP. Besides my passion for programming, I am also sporty and I like to maintain an active lifestyle. I look forward to further developing my skills and fulfilling my dreams in the IT world.',
                    domain: 'linkedin.com'
                },
                {
                    url: 'https://github.com/Arno-Boenders',
                    title: 'Arno Boenders (@Arno-Boenders) · GitHub',
                    description: '24-year-old programming student passionate about web development. Experienced in HTML, CSS, React, TypeScript, and PHP. Currently studying at Arteveldehogeschool with aspirations to become a fullstack developer.',
                    domain: 'github.com'
                },
                {
                    url: 'https://arno-boenders.dev/about',
                    title: 'About Arno - Programming Student & Future Developer',
                    description: 'Learn more about Arno Boenders, a dedicated programming student from Belgium. Discover his journey in web development, his technical skills, and his ambition to excel in the IT industry while maintaining an active and sporty lifestyle.',
                    domain: 'arno-boenders.dev'
                }
            ]
        }
    };

    const currentData = searchData[activeTab as keyof typeof searchData];
    const query = currentData?.query.split(' ').join('-');
    return (
        <div className={`min-h-screen ${theme.background}`}>
            <div className="shadow-lg">
                <BrowserHeader query={query} />
            </div>
            <GoogleSearch query={query} onQueryChange={() => { }} onSearch={() => { }} />
            <SearchResults results={currentData?.results} />
        </div>
    );
}
