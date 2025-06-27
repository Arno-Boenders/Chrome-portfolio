'use client'
import { Metadata } from 'next';
import BrowserHeader from '@components/BrowserHeader';
import GoogleSearch from '@components/GoogleSearch';
import { searchData } from '@/data/searchData';
import { usePathname } from 'next/navigation';
import Projects from './Projects';

// export const metadata: Metadata = {
//     title: 'Projects - Arno Boenders',
//     description: 'Explore Arno Boenders\'s web development projects and portfolio',
// };

export default function ProjectsPage() {
    const params = usePathname()
    const currentData = searchData[params.slice(1) as keyof typeof searchData];
    const query = currentData?.query.split(' ').join('-');

    
    return (
        <div className="min-h-screen">
            <div className="shadow-lg">
                <BrowserHeader query={query} />
            </div>
            <GoogleSearch query={query} onQueryChange={() => { }} onSearch={() => { }} />
            <Projects />
        </div>
    );
}