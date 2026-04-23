import type { MovieDetails } from "@/services/omdb-service";

import MovieDetailPanel from "@/components/molecules/movie-detail-panel";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
} from "@/components/atoms/sheet";

type MovieDetailSheetProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	movie: MovieDetails | null;
	isLoading?: boolean;
	errorMessage?: string | null;
	isSaved?: boolean;
	onToggleWatchlist?: (movie: MovieDetails) => void;
};

const MovieDetailSheet = ({
	open,
	onOpenChange,
	movie,
	isLoading = false,
	errorMessage,
	isSaved = false,
	onToggleWatchlist,
}: MovieDetailSheetProps) => {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				className="w-full border-white/10 bg-[#08101d] p-0 text-white sm:max-w-3xl xl:max-w-[50vw]"
			>
				<div className="sr-only">
					<SheetTitle>{movie?.Title ?? "Movie details"}</SheetTitle>
					<SheetDescription>View movie details and save titles to your watchlist.</SheetDescription>
				</div>
				<div className="h-full overflow-y-auto p-4 sm:p-6">
					<MovieDetailPanel
						movie={movie}
						isLoading={isLoading}
						errorMessage={errorMessage}
						isSaved={isSaved}
						onToggleWatchlist={onToggleWatchlist}
					/>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default MovieDetailSheet;
