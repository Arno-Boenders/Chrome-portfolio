import type { Metadata } from 'next';
import OfflineScreen from '@components/OfflineScreen';

export const metadata: Metadata = { title: 'No internet', robots: { index: false } };

// Easter egg: search "offline" or "dino" to get here.
export default function OfflinePage() {
    return (
        <OfflineScreen
            title="No internet"
            text="Well, not really. But here's the game you'd normally get: help pixel me jump over bugs and pick up skills on the way. Space or tap to jump, down arrow or swipe down to duck."
            code="ERR_INTERNET_DISCONNECTED (just kidding)"
        />
    );
}
