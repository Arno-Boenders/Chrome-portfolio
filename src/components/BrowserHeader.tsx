'use client'
import { ArrowLeft, ArrowRight, Home, Lock, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TabIcon } from './Wordmark';

const tabs = [
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
];

// The browser "window" around the site. Tabs are the main navigation;
// the toolbar row is desktop-only so phones get straight to the content.
export default function BrowserHeader() {
    const pathname = usePathname();
    const router = useRouter();
    const [host, setHost] = useState('');
    useEffect(() => setHost(window.location.host), []);

    const active = pathname === '/' ? '/about' : pathname;
    const navButton = 'pressable p-2 rounded-full text-ink hover:bg-hover cursor-pointer';

    return (
        <header className="bg-chip border-b border-line">
            <nav className="flex items-end px-2 pt-2 gap-1" aria-label="Main">
                <div className="hidden sm:flex items-center gap-2 px-2 pb-3" aria-hidden>
                    <span className="w-3 h-3 bg-[#ff5f57] rounded-full" />
                    <span className="w-3 h-3 bg-[#febc2e] rounded-full" />
                    <span className="w-3 h-3 bg-[#28c840] rounded-full" />
                </div>
                {tabs.map((tab) => {
                    const isActive = active === tab.href;
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            aria-current={isActive ? 'page' : undefined}
                            className={`no-select flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-2 text-sm rounded-t-lg flex-1 min-w-0 sm:flex-none sm:w-[200px] transition-colors duration-150 ${isActive ? 'bg-page text-ink' : 'text-muted hover:bg-hover'}`}
                        >
                            <TabIcon />
                            <span className="truncate">{tab.label}<span className="hidden sm:inline"> - Arno Boenders</span></span>
                        </Link>
                    );
                })}
            </nav>

            <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-page">
                <button onClick={() => router.back()} className={navButton} aria-label="Back"><ArrowLeft className="w-4 h-4" /></button>
                <button onClick={() => router.forward()} className={navButton} aria-label="Forward"><ArrowRight className="w-4 h-4" /></button>
                <button onClick={() => router.refresh()} className={navButton} aria-label="Reload"><RotateCcw className="w-4 h-4" /></button>
                <Link href="/" className={navButton} aria-label="Home"><Home className="w-4 h-4" /></Link>
                <div className="flex-1 min-w-0 ml-2 flex items-center rounded-full bg-chip px-4 py-1.5 text-sm text-ink">
                    <Lock className="w-3.5 h-3.5 shrink-0 text-muted mr-2" />
                    <span className="truncate">{host}<span className="text-muted">{pathname === '/' ? '' : pathname}</span></span>
                </div>
            </div>
        </header>
    );
}
