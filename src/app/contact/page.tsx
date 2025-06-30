'use client'

import { Metadata } from 'next';
import BrowserHeader from '@components/BrowserHeader';
import GoogleSearch from '@components/GoogleSearch';
import SearchResults from '@components/SearchResults';
import { searchData } from '@data/searchData'
import { usePathname } from 'next/navigation';
import { useTheme } from '@context/ThemeContext';

// export const metadata: Metadata = {
//     title: 'Contact Arno Boenders',
//     description: 'Get in touch with Arno Boenders for web development opportunities',
// };

export default function ContactPage() {
    const { theme } = useTheme();
    const params = usePathname()
    const currentData = searchData[params.slice(1) as keyof typeof searchData];
    const query = currentData?.query.split(' ').join('-');
    return (
        <div className={`min-h-screen ${theme.background}`}>
            <div className="shadow-lg">
                <BrowserHeader query={query} />
            </div>
            <GoogleSearch query={query} onQueryChange={(query: string) => { }} onSearch={() => { }} />
            <SearchResults results={currentData?.results} />
        </div>
    );
}