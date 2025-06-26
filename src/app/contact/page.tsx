'use client'

import { Metadata } from 'next';
import BrowserHeader from '@components/BrowserHeader';
import GoogleSearch from '@components/GoogleSearch';
import SearchResults from '@components/SearchResults';
import { useNav } from '@context/NavContext';

// export const metadata: Metadata = {
//     title: 'Contact Arno Boenders',
//     description: 'Get in touch with Arno Boenders for web development opportunities',
// };

export default function ContactPage() {
    const { activeTab } = useNav();

    const searchData = {
        contact: {
            query: 'Arno Boenders contact information',
            results: [
                {
                    url: 'mailto:arno.boenders@student.arteveldehs.be',
                    title: 'Contact Arno Boenders - Email & Professional Inquiries',
                    description: 'Get in touch with Arno Boenders for collaboration opportunities, internships, or project inquiries. Currently available for web development projects and open to discussing fullstack development opportunities.',
                    domain: 'arno-boenders.dev'
                },
                {
                    url: 'https://linkedin.com/in/arno-boenders',
                    title: 'Arno Boenders - LinkedIn Professional Profile',
                    description: 'Connect with Arno on LinkedIn to stay updated on his programming journey, project updates, and professional achievements. Open to networking with fellow developers and industry professionals.',
                    domain: 'linkedin.com'
                },
                {
                    url: 'https://github.com/arno-boenders',
                    title: 'Arno Boenders - GitHub Repository Collection',
                    description: 'Explore Arno\'s code repositories, contributions, and open-source projects. Follow his GitHub profile to see the latest developments in his programming journey and collaborate on interesting projects.',
                    domain: 'github.com'
                },
                {
                    url: 'https://arteveldehogeschool.be',
                    title: 'Artevelde University College - Student Information',
                    description: 'Arno Boenders is currently studying programming at Artevelde University College in Ghent, Belgium. The institution is known for its comprehensive IT and multimedia programs, preparing students for modern tech careers.',
                    domain: 'arteveldehogeschool.be'
                }
            ]
        }
    };

    const currentData = searchData[activeTab as keyof typeof searchData];
    const query = currentData?.query.split(' ').join('-');
    return (
        <div className="min-h-screen bg-white">
            <div className="bg-[#f1f3f4] shadow-lg">
                <BrowserHeader query={query} />
            </div>
            <GoogleSearch query={query} onQueryChange={(query: string) => { }} onSearch={() => { }} />
            <SearchResults results={currentData?.results} />
        </div>
    );
}