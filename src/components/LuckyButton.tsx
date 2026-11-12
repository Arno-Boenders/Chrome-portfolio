'use client'
import { useRouter } from 'next/navigation';

/** Opens a random project. */
export default function LuckyButton({ hrefs, className }: { hrefs: string[]; className?: string }) {
    const router = useRouter();
    return (
        <button type="button" className={className} onClick={() => router.push(hrefs[Math.floor(Math.random() * hrefs.length)])}>
            Surprise me
        </button>
    );
}
