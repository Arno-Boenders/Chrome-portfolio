import OfflineScreen from '@components/OfflineScreen';

// The browser's own "site can't be reached" page, with a game to pass the time.
export default function NotFound() {
    return (
        <OfflineScreen
            title="This page can't be reached"
            text="There is no page at this address. Check the spelling or search for what you were after. Or jump a few bugs first: press Space or tap the game."
            code="ERR_PAGE_NOT_FOUND"
        />
    );
}
