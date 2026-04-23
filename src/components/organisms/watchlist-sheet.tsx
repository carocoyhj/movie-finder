import type { MovieDetails } from "@/services/omdb-service";

import WatchlistPanel from "@/components/molecules/watchlist-panel";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
} from "@/components/atoms/sheet";

type WatchlistSheetProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	items: MovieDetails[];
	onRemove: (imdbID: string) => void;
};

const WatchlistSheet = ({
	open,
	onOpenChange,
	items,
	onRemove,
}: WatchlistSheetProps) => {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				className="w-full border-white/10 bg-[#08101d] p-0 text-white sm:max-w-2xl xl:max-w-[42vw]"
			>
				<div className="sr-only">
					<SheetTitle>Watchlist</SheetTitle>
					<SheetDescription>View and manage your saved movies.</SheetDescription>
				</div>
				<div className="h-full overflow-y-auto p-4 sm:p-6">
					<WatchlistPanel items={items} onRemove={onRemove} />
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default WatchlistSheet;
