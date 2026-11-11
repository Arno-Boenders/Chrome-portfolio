import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { profile } from '@/data/profile';
import CategoryNav, { type Category } from './CategoryNav';
import ThemeToggle from './ThemeToggle';
import Wordmark from './Wordmark';

export type { Category } from './CategoryNav';

interface Props {
    query: string;
    basePath: string;
    categories: Category[];
    active: string;
}

// Content padding shared by header rows and results, so everything lines up
// with the search box like on a real results page (logo column = 108px).
export const PAD = 'px-4 sm:px-8 lg:pl-[164px]';

export default function SearchHeader({ query, basePath, categories, active }: Props) {
    return (
        <div className="bg-page">
            <div className="flex items-center gap-3 sm:gap-6 px-4 sm:px-8 pt-5 pb-3">
                <Link href="/" className="shrink-0 lg:w-[108px] min-h-11 flex items-center" aria-label="Home">
                    <Wordmark className="text-2xl sm:text-[28px]" />
                </Link>
                <form action="/search" role="search" className="flex-1 min-w-0 max-w-[692px]">
                    <label className="flex items-center rounded-full border border-line bg-page shadow-sm transition-shadow duration-200 hover:shadow-md focus-within:shadow-md px-4 h-11">
                        <span className="sr-only">Search Arno&apos;s portfolio</span>
                        <input
                            type="search"
                            name="q"
                            enterKeyHint="search"
                            autoCapitalize="none"
                            autoComplete="off"
                            defaultValue={query}
                            placeholder="Search projects, skills…"
                            className="flex-1 min-w-0 h-full bg-transparent outline-none text-base text-ink placeholder:text-muted"
                        />
                        <button type="submit" aria-label="Search" className="pressable ml-1 -mr-3 w-11 h-11 shrink-0 flex items-center justify-center rounded-full text-accent cursor-pointer">
                            <Search className="w-5 h-5" />
                        </button>
                    </label>
                </form>
                <div className="flex items-center gap-1 sm:gap-2 shrink-0 sm:ml-auto">
                    <ThemeToggle />
                    <Link href="/contact" aria-label="Contact Arno" className="pressable hidden sm:block w-9 h-9 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-line relative">
                        <Image src={profile.photo.src} alt="" fill sizes="36px" className="object-cover object-[50%_38%]" />
                    </Link>
                </div>
            </div>

            <CategoryNav categories={categories} active={active} basePath={basePath} className={`${PAD} border-b border-line`} />
        </div>
    );
}
