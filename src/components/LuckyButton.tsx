'use client'
import { useRouter } from 'next/navigation';

/** "I'm Feeling Lucky": opens a random project. */
export default function LuckyButton({ hrefs, className }: { hrefs: string[]; className?: string }) {
    const router = useRouter();
    return (
        <button type="button" className={className} onClick={() => router.push(hrefs[Math.floor(Math.random() * hrefs.length)])}>
            I&apos;m Feeling Lucky
        </button>
    );
}
