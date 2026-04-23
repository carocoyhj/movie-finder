import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { MovieDetails } from "@/services";

type WatchlistState = {
	items: MovieDetails[];
	addToWatchlist: (movie: MovieDetails) => void;
	removeFromWatchlist: (imdbID: string) => void;
	toggleWatchlist: (movie: MovieDetails) => void;
	isInWatchlist: (imdbID: string) => boolean;
};

export const useWatchlistStore = create<WatchlistState>()(
	persist(
		(set, get) => ({
			items: [],
			addToWatchlist: (movie) =>
				set((state) => {
					const exists = state.items.some((item) => item.imdbID === movie.imdbID);

					if (exists) {
						return state;
					}

					return {
						items: [movie, ...state.items],
					};
				}),
			removeFromWatchlist: (imdbID) =>
				set((state) => ({
					items: state.items.filter((item) => item.imdbID !== imdbID),
				})),
			toggleWatchlist: (movie) => {
				const exists = get().items.some((item) => item.imdbID === movie.imdbID);

				if (exists) {
					get().removeFromWatchlist(movie.imdbID);
					return;
				}

				get().addToWatchlist(movie);
			},
			isInWatchlist: (imdbID) => get().items.some((item) => item.imdbID === imdbID),
		}),
		{
			name: "movie-finder-watchlist",
		},
	),
);
