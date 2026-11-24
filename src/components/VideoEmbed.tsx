'use client'
import { Play } from 'lucide-react';
import { useState } from 'react';

interface Props {
    id: string;          // YouTube video id
    title: string;
    poster: React.ReactNode;
    className?: string;
}

/**
 * Shows the poster with a play button and only loads YouTube after a click,
 * so the page stays light and no request goes to YouTube until someone wants the video.
 */
export default function VideoEmbed({ id, title, poster, className = '' }: Props) {
    const [playing, setPlaying] = useState(false);
    return (
        <div className={`relative overflow-hidden bg-black ${className}`}>
            {playing ? (
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute inset-0 w-full h-full border-0"
                />
            ) : (
                <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 w-full h-full cursor-pointer" aria-label={`Play video: ${title}`}>
                    {poster}
                    <span className="absolute inset-0 bg-black/25 transition-colors duration-200 group-hover:bg-black/10" aria-hidden />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 pl-5 pr-6 py-3 rounded-full bg-white/95 text-[#12151c] font-medium shadow-lg transition-transform duration-200 ease-[var(--ease-out)] group-hover:scale-105 motion-reduce:transition-none">
                        <Play className="w-5 h-5 fill-current" aria-hidden />Play video
                    </span>
                </button>
            )}
        </div>
    );
}
