'use client'
import { Metadata } from 'next';
import BrowserHeader from '@components/BrowserHeader';
import GoogleSearch from '@components/GoogleSearch';
import SearchResults from '@components/SearchResults';
import { useNav } from '@context/NavContext';

// export const metadata: Metadata = {
//     title: 'Projects - Arno Boenders',
//     description: 'Explore Arno Boenders\'s web development projects and portfolio',
// };

export default function ProjectsPage() {
    const { activeTab } = useNav();
    
    const searchData = {
        projects: {
            query: 'Arno Boenders projects portfolio',
            results: [
                {
                    url: 'https://github.com/arno-boenders/react-ecommerce',
                    title: 'E-Commerce Platform - React & Node.js | Arno Boenders',
                    description: 'Full-stack e-commerce application built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Responsive design with modern UI components.',
                    domain: 'github.com'
                },
                {
                    url: 'https://arno-boenders.dev/weather-app',
                    title: 'Weather App - JavaScript & OpenWeather API',
                    description: 'Interactive weather application using vanilla JavaScript and OpenWeather API. Real-time weather data, location-based forecasts, and beautiful animated UI. Demonstrates API integration and responsive design principles.',
                    domain: 'arno-boenders.dev'
                },
                {
                    url: 'https://github.com/arno-boenders/task-manager',
                    title: 'Task Management System - PHP & MySQL',
                    description: 'Comprehensive task management system built with PHP and MySQL. Features include user authentication, project organization, deadline tracking, team collaboration, and progress visualization with charts and analytics.',
                    domain: 'github.com'
                },
                {
                    url: 'https://arno-boenders.dev/portfolio-website',
                    title: 'Personal Portfolio Website - HTML, CSS, JavaScript',
                    description: 'Modern portfolio website showcasing web development skills. Built with semantic HTML5, advanced CSS3 animations, and interactive JavaScript. Optimized for performance and accessibility across all devices.',
                    domain: 'arno-boenders.dev'
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
            <GoogleSearch query={query} onQueryChange={() => { }} onSearch={() => { }} />
            <SearchResults results={currentData?.results} />
        </div>
    );
}