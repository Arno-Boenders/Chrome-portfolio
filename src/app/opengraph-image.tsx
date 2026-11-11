import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { profile } from '@/data/profile';

// The preview card shown when the site is shared on LinkedIn, WhatsApp, Slack, ...
export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const LETTERS = [['A', '#4285F4'], ['r', '#EA4335'], ['n', '#FBBC05'], ['o', '#4285F4']];

export default async function OpengraphImage() {
    const photo = await readFile(join(process.cwd(), 'public', profile.photo.src));
    const src = `data:image/jpeg;base64,${photo.toString('base64')}`;

    return new ImageResponse(
        (
            <div style={{ width: '100%', height: '100%', display: 'flex', background: '#ffffff' }}>
                <img src={src} alt="" width={420} height={630} style={{ objectFit: 'cover', objectPosition: '50% 42%' }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
                    <div style={{ display: 'flex', fontSize: 88, fontWeight: 700, letterSpacing: -2 }}>
                        {LETTERS.map(([ch, c], i) => <span key={i} style={{ color: c }}>{ch}</span>)}
                    </div>
                    <div style={{ fontSize: 56, color: '#202124', marginTop: 24 }}>{profile.name}</div>
                    <div style={{ fontSize: 32, color: '#5f6368', marginTop: 12 }}>{`${profile.role} · ${profile.location}`}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 40 }}>
                        {profile.skills.slice(0, 5).map((s) => (
                            <div key={s} style={{ fontSize: 24, color: '#202124', background: '#f1f3f4', borderRadius: 999, padding: '8px 20px' }}>{s}</div>
                        ))}
                    </div>
                </div>
            </div>
        ),
        size
    );
}
