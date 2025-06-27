
'use client'
import { Metadata } from 'next';
import BrowserHeader from '@components/BrowserHeader';
import GoogleSearch from '@components/GoogleSearch';
import SearchResults from '@components/SearchResults';
import { useTheme } from '@context/ThemeContext';
import { searchData } from '@data/searchData';
import { usePathname } from 'next/navigation';

// export const metadata: Metadata = {
//     title: 'About Arno Boenders - Fullstack Developer',
//     description: 'Arno Boenders is a 22-year-old programming student at Artevelde University College with a passion for web development.',
// };

export default function AboutPage() {
    const { theme } = useTheme();
    const params = usePathname()
    const currentData = searchData[params.slice(1) as keyof typeof searchData];
    const query = currentData?.query.split(' ').join('-') ?? '';

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
