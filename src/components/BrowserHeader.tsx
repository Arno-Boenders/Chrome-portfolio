'use client'
import { ArrowLeft, ArrowRight, RotateCcw, Home, Lock, MoreVertical, Star, Sun, Moon } from 'lucide-react';
import { useNav } from '@context/NavContext';
import { useTheme } from '@context/ThemeContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const BrowserHeader = ({ query }: { query: string }) => {
    const { activeTab, setActiveTab } = useNav();
    const { isDarkMode, toggleTheme, theme } = useTheme();
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const tabs = [
        { id: 'about', title: 'About - Google Search' },
        { id: 'projects', title: 'Projects - Google Search' },
        { id: 'contact', title: 'Contact - Google Search' }
    ];

    const onTabChange = (tabId: string) => {
        setActiveTab(tabId);
        router.push(`/${tabId}`);
    };

    useEffect(() => {
        router.refresh();
    }, [activeTab]);

    return (
        <div className={`border-b border-gray-300 ${theme.background}`}>
            {/* Window controls and tabs */}
            <div className="flex items-center px-2 py-1">
                {/* Window controls */}
                <div className="flex items-center space-x-2 mr-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-0">
                    {tabs.map((tab) => (
                        <div
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`px-4 py-2 text-sm cursor-pointer relative rounded-t-lg transition-all duration-200 min-w-[200px] max-w-[240px] ${activeTab === tab.id
                                ? `${theme.foreground} text-gray-900 shadow-sm`
                                : `${theme.foreground} hover:bg-[#e8eaed]`
                                }`}
                        >
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-blue-500 rounded-sm text-white flex items-center justify-center text-xs font-bold">
                                    G
                                </div>
                                <span className={`truncate ${theme.foreground}`}>{tab.title}</span>
                            </div>
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                            )}
                        </div>
                    ))}
                </div>

                {/* New tab button */}
                <button className="ml-2 p-1 hover:bg-gray-200 rounded">
                    <div className={`w-4 h-4 ${theme.foreground}`}>+</div>
                </button>
            </div>

            {/* Navigation bar */}
            <div className="flex items-center px-4 py-2 space-x-3">
                <div className="flex items-center space-x-1">
                    <button className="p-2 hover:bg-gray-200 rounded dark:hover:bg-gray-700">
                        <ArrowLeft className={`w-4 h-4 ${theme.foreground} `} />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded dark:hover:bg-gray-700">
                        <ArrowRight className={`w-4 h-4 ${theme.foreground} `} />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded dark:hover:bg-gray-700">
                        <RotateCcw className={`w-4 h-4 ${theme.foreground} `} />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded dark:hover:bg-gray-700">
                        <Home className={`w-4 h-4 ${theme.foreground} `} />
                    </button>
                </div>

                {/* Address bar */}
                <div className="flex-1 mx-4">
                    <div className={`flex items-center ${theme.background} rounded-full px-4 py-2 shadow-sm border border-gray-200 ${theme.foreground}`}>
                        <Lock className="w-4 h-4 text-green-600 mr-2" />
                        <span className={`text-sm ${theme.foreground} flex-1`}>
                            https://www.google.com/search?{query}
                        </span>
                        <Star className="w-4 h-4 text-gray-400 ml-2 dark:text-gray-500" />
                    </div>
                </div>
                <div className="relative">
                    <MoreVertical className={`w-4 h-4 ${theme.foreground} cursor-pointer`} onClick={(e) => {
                        e.stopPropagation();
                        setIsMenuOpen(!isMenuOpen);
                    }} />
                    {isMenuOpen && (
                        <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 z-10 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                            <button
                                onClick={() => { toggleTheme(); setIsMenuOpen(false) }}
                                className={`w-full px-4 py-2 text-left hover:cursor-pointer ${theme.foreground} flex items-center space-x-2 ${theme.background} ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                            >
                                {isDarkMode ? (
                                    <Sun className="w-4 h-4 text-yellow-400" />
                                ) : (
                                    <Moon className={`w-4 h-4 ${theme.foreground}`} />
                                )}
                                <span className={`${theme.foreground}`}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrowserHeader;
