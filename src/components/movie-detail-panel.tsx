import {
	BookmarkSimple,
	Clock,
	FilmStrip,
	GlobeHemisphereWest,
	SpinnerGap,
	Star,
} from "@phosphor-icons/react";

import type { MovieDetails } from "@/services";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type MovieDetailPanelProps = {
	movie: MovieDetails | null;
	isLoading?: boolean;
	errorMessage?: string | null;
	isSaved?: boolean;
	onToggleWatchlist?: (movie: MovieDetails) => void;
};

const MovieDetailPanel = ({
	movie,
	isLoading = false,
	errorMessage,
	isSaved = false,
	onToggleWatchlist,
}: MovieDetailPanelProps) => {
	if (isLoading) {
		return (
			<Card className="overflow-hidden rounded-[2rem] border-white/10 bg-white/8 py-0 text-white shadow-2xl shadow-black/20">
				<div className="flex min-h-[520px] items-center justify-center">
					<div className="flex flex-col items-center gap-4 text-center">
						<SpinnerGap size={34} className="animate-spin text-white/70" />
						<div className="space-y-2">
							<p className="text-sm uppercase tracking-[0.3em] text-white/42">Movie details</p>
							<h2 className="text-2xl font-semibold text-white">Loading movie details</h2>
							<p className="max-w-md text-sm leading-7 text-white/62">
								Getting everything ready for you.
							</p>
						</div>
					</div>
				</div>
			</Card>
		);
	}

	if (errorMessage) {
		return (
			<Card className="overflow-hidden rounded-[2rem] border-rose-300/20 bg-rose-300/8 py-0 text-white shadow-2xl shadow-black/20">
				<div className="flex min-h-[520px] items-center justify-center p-8">
					<div className="space-y-3 text-center">
						<p className="text-sm uppercase tracking-[0.3em] text-rose-100/75">Movie details</p>
						<h2 className="text-2xl font-semibold text-white">Could not load movie details</h2>
						<p className="max-w-lg text-sm leading-7 text-rose-50/80">{errorMessage}</p>
					</div>
				</div>
			</Card>
		);
	}

	if (!movie) {
		return (
			<Card className="overflow-hidden rounded-[2rem] border-white/10 bg-white/8 py-0 text-white shadow-2xl shadow-black/20">
				<div className="flex min-h-[520px] items-center justify-center p-8">
					<div className="space-y-3 text-center">
						<p className="text-sm uppercase tracking-[0.3em] text-white/42">Movie details</p>
						<h2 className="text-2xl font-semibold text-white">Pick a movie from the results</h2>
						<p className="max-w-lg text-sm leading-7 text-white/62">
							Choose any movie to see the story, cast, ratings, and more.
						</p>
					</div>
				</div>
			</Card>
		);
	}

	const stats = [
		{ label: "Runtime", value: movie.Runtime || "N/A", icon: Clock },
		{ label: "Language", value: movie.Language || "N/A", icon: GlobeHemisphereWest },
		{ label: "Released", value: movie.Released || "N/A", icon: FilmStrip },
	];

	const metadata = [
		{ label: "Director", value: movie.Director || "N/A" },
		{ label: "Cast", value: movie.Actors || "N/A" },
		{ label: "Writers", value: movie.Writer || "N/A" },
	];

	const genres = movie.Genre?.split(",").map((entry) => entry.trim()).filter(Boolean) ?? [];
	const hasPoster = movie.Poster && movie.Poster !== "N/A";
	const ratingLabel = movie.imdbRating && movie.imdbRating !== "N/A" ? `${movie.imdbRating} IMDb` : "No IMDb rating";

	return (
		<Card className="overflow-hidden rounded-[2rem] border-white/10 bg-white/8 py-0 text-white shadow-2xl shadow-black/20">
			<div className="grid gap-0 xl:grid-cols-[260px_1fr]">
				<div className="relative min-h-[320px]">
					{hasPoster ? (
						<img className="h-full w-full object-cover" src={movie.Poster} alt={movie.Title} />
					) : (
						<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white/55">
							<FilmStrip size={40} />
						</div>
					)}
					<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent xl:bg-gradient-to-r" />
				</div>

				<CardContent className="space-y-6 p-6 sm:p-8">
					<div className="flex flex-wrap items-center gap-3">
						<Badge className="border-rose-400/20 bg-rose-400/12 text-rose-100 hover:bg-rose-400/18">
							{movie.Year}
						</Badge>
						{genres.slice(0, 3).map((genre) => (
							<Badge key={genre} className="border-white/10 bg-white/8 text-white hover:bg-white/10">
								{genre}
							</Badge>
						))}
					</div>

					<div className="space-y-3">
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="text-sm uppercase tracking-[0.3em] text-white/45">Movie details</p>
								<h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
									{movie.Title}
								</h2>
							</div>
							<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/85">
								<Star size={16} weight="fill" className="text-amber-300" />
								{ratingLabel}
							</div>
						</div>

						<p className="max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
							{movie.Plot || "No plot summary is available for this title."}
						</p>
					</div>

					<div className="grid gap-3 sm:grid-cols-3">
						{stats.map(({ label, value, icon: Icon }) => (
							<div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
								<div className="mb-3 flex items-center gap-2 text-white/50">
									<Icon size={16} />
									<span className="text-xs uppercase tracking-[0.28em]">{label}</span>
								</div>
								<p className="text-base font-medium text-white">{value}</p>
							</div>
						))}
					</div>

					<div className="flex flex-wrap gap-3">
						<Button
							className="rounded-xl bg-white text-slate-950 hover:bg-white/90"
							onClick={() => onToggleWatchlist?.(movie)}
						>
							<BookmarkSimple size={18} weight={isSaved ? "fill" : "regular"} />
							{isSaved ? "Saved to watchlist" : "Add to watchlist"}
						</Button>
						<Button
							variant="secondary"
							className="rounded-xl border border-white/10 bg-white/8 text-white hover:bg-white/12"
						>
							{movie.Rated !== "N/A" ? movie.Rated : "Unrated"}
						</Button>
					</div>

					<Separator className="bg-white/10" />

					<div className="grid gap-4">
						{metadata.map((item) => (
							<div key={item.label} className="grid gap-1 sm:grid-cols-[110px_1fr] sm:gap-4">
								<p className="text-sm text-white/45">{item.label}</p>
								<p className="text-sm leading-7 text-white/75">{item.value}</p>
							</div>
						))}
					</div>
				</CardContent>
			</div>
		</Card>
	);
};

export default MovieDetailPanel;
