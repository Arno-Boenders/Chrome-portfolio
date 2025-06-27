'use client'
import { createContext, useContext, useState, useEffect } from 'react';


const lightTheme = {
    background: 'bg-white',
    foreground: 'text-gray-900',
};

const darkTheme = {
    background: 'bg-[#202124]',
    foreground: 'text-gray-100',
};

const ThemeContext = createContext({
    isDarkMode: false,
    toggleTheme: () => { },
    theme: lightTheme, // default
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const theme = isDarkMode ? darkTheme : lightTheme;

    useEffect(() => {
        const stored = localStorage.getItem('dark-mode');
        if (stored === 'true') setIsDarkMode(true);
    }, []);

    useEffect(() => {
        localStorage.setItem('dark-mode', isDarkMode.toString());
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);