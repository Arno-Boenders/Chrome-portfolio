import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GameFrame from '@components/GameFrame';
import { games, projectCards } from '@data/projects';

type Props = { params: Promise<{ game: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => games.map((g) => ({ game: g.id }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { game } = await params;
    const g = games.find((x) => x.id === game);
    const card = g && projectCards.find((p) => p.slug === g.slug);
    return g ? { title: g.title, description: card?.summary } : {};
}

// A game version of this portfolio, playing inside a tab of the site's browser.
export default async function GamePage({ params }: Props) {
    const { game } = await params;
    const g = games.find((x) => x.id === game);
    if (!g) notFound();
    return <GameFrame id={g.id} title={g.title} />;
}
