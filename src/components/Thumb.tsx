'use client'
import { ImageOff } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import type { ProjectImage } from '@/data/projects';

/** Project image that handles both screenshots (cover) and logos (contain on a tile). */
export default function Thumb({ image, sizes, className = '', zoomOnHover = false }: { image: ProjectImage; sizes: string; className?: string; zoomOnHover?: boolean }) {
    const [failed, setFailed] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const contain = image.fit === 'contain';
    return (
        <div className={`relative overflow-hidden bg-chip ${className}`} style={image.background && !failed ? { background: image.background } : undefined}>
            {failed ? (
                // A missing file (renamed screenshot, typo) shows a quiet tile, not a broken-image box.
                <span className="absolute inset-0 flex items-center justify-center text-muted" role="img" aria-label={image.alt}>
                    <ImageOff className="w-5 h-5" strokeWidth={1.5} />
                </span>
            ) : (
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={sizes}
                    unoptimized={image.src.endsWith('.svg')}
                    onError={() => setFailed(true)}
                    onLoad={() => setLoaded(true)}
                    // An image that finished loading before React attached never fires onLoad.
                    ref={(el) => { if (el?.complete && el.naturalWidth > 0) setLoaded(true); }}
                    data-loaded={loaded ? '' : undefined}
                    className={`img-fade ${contain ? 'object-contain p-[12%]' : 'object-cover'} ${zoomOnHover ? 'transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-[1.03] motion-reduce:transition-none' : ''}`}
                    style={contain ? undefined : { objectPosition: image.position ?? '50% 0%' }}
                />
            )}
        </div>
    );
}
