import { useEffect, useState } from "react";
import AppHeader from "@/components/organisms/app-header";
import MovieCard from "@/components/molecules/movie-card";
import MovieDetailSheet from "@/components/organisms/movie-detail-sheet";
import SearchShowcase from "@/components/molecules/search-showcase";
import WatchlistSheet from "@/components/organisms/watchlist-sheet";
import type { MovieDetails, MovieSearchItem } from "@/services/omdb-service";
import { getMovieDetails, searchMovies } from "@/services/omdb-service";
import { useWatchlistStore } from "@/store/watchlist-store";

const POPULAR_PICK_IDS = [
  "tt0816692",
  "tt1375666",
  "tt0468569",
  "tt4154796",
  "tt7286456",
  "tt0110912",
];

const toMovieSearchItem = (movie: MovieDetails): MovieSearchItem => ({
  Title: movie.Title,
  Year: movie.Year,
  imdbID: movie.imdbID,
  Type: movie.Type,
  Poster: movie.Poster,
});

const HomePage = () => {
  const [draftQuery, setDraftQuery] = useState("");
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<MovieSearchItem[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [selectedImdbID, setSelectedImdbID] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const watchlist = useWatchlistStore((state) => state.items);
  const toggleWatchlist = useWatchlistStore((state) => state.toggleWatchlist);
  const removeFromWatchlist = useWatchlistStore(
    (state) => state.removeFromWatchlist,
  );
  const isInWatchlist = useWatchlistStore((state) => state.isInWatchlist);

  useEffect(() => {
    let isCancelled = false;

    const loadSearchResults = async () => {
      setIsSearchLoading(true);
      setSearchError(null);

      try {
        if (!query.trim()) {
          const popularPickResults = await Promise.allSettled(
            POPULAR_PICK_IDS.map((imdbID) => getMovieDetails(imdbID)),
          );

          if (isCancelled) {
            return;
          }

          const movies = popularPickResults
            .filter(
              (result): result is PromiseFulfilledResult<MovieDetails> =>
                result.status === "fulfilled",
            )
            .map((result) => toMovieSearchItem(result.value));

          if (movies.length === 0) {
            throw new Error("Unable to load popular picks right now.");
          }

          setMovies(movies);
          setTotalResults(movies.length);
          setSelectedImdbID(null);
          setSelectedMovie(null);
          setDetailError(null);
          return;
        }

        const result = await searchMovies({ query });

        if (isCancelled) {
          return;
        }

        setMovies(result.movies);
        setTotalResults(result.totalResults);
        setSelectedImdbID(null);
        setSelectedMovie(null);
        setDetailError(null);
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setMovies([]);
        setTotalResults(0);
        setSelectedImdbID(null);
        setSelectedMovie(null);
        setSearchError(
          error instanceof Error
            ? error.message
            : "Unable to search movies right now.",
        );
      } finally {
        if (!isCancelled) {
          setIsSearchLoading(false);
        }
      }
    };

    void loadSearchResults();

    return () => {
      isCancelled = true;
    };
  }, [query]);

  useEffect(() => {
    if (!selectedImdbID) {
      return;
    }

    let isCancelled = false;

    const loadDetails = async () => {
      setIsDetailLoading(true);
      setDetailError(null);

      try {
        const movie = await getMovieDetails(selectedImdbID);

        if (!isCancelled) {
          setSelectedMovie(movie);
        }
      } catch (error) {
        if (!isCancelled) {
          setSelectedMovie(null);
          setDetailError(
            error instanceof Error
              ? error.message
              : "Unable to load the selected movie details.",
          );
        }
      } finally {
        if (!isCancelled) {
          setIsDetailLoading(false);
        }
      }
    };

    void loadDetails();

    return () => {
      isCancelled = true;
    };
  }, [selectedImdbID]);

  const handleSearchSubmit = () => {
    setQuery(draftQuery.trim());
  };

  const handleViewDetails = (imdbID: string) => {
    setSelectedImdbID(imdbID);
    setIsDetailOpen(true);
  };

  const toggleWatchlistByMovie = (movie: MovieDetails) => {
    toggleWatchlist(movie);
  };

  const toggleWatchlistById = (imdbID: string) => {
    if (isInWatchlist(imdbID)) {
      removeFromWatchlist(imdbID);
      return;
    }

    if (selectedMovie?.imdbID === imdbID) {
      toggleWatchlistByMovie(selectedMovie);
    }
  };

  const selectedMovieTitle =
    selectedMovie?.Title ??
    movies.find((movie) => movie.imdbID === selectedImdbID)?.Title;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(244,63,94,0.18),_transparent_24%),radial-gradient(circle_at_right,_rgba(251,191,36,0.12),_transparent_18%),linear-gradient(180deg,_#060816_0%,_#0a1020_42%,_#05070f_100%)] text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <AppHeader
          onOpenWatchlist={() => setIsWatchlistOpen(true)}
          watchlistCount={watchlist.length}
        />
        <SearchShowcase
          query={draftQuery}
          onQueryChange={setDraftQuery}
          onSubmit={handleSearchSubmit}
          isLoading={isSearchLoading}
          totalResults={totalResults}
          errorMessage={searchError}
          selectedMovieTitle={selectedMovieTitle}
        />

        <section className="space-y-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-white/40">
                {query.trim() ? "Search Results" : "Popular Picks"}
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white">
                {query.trim()
                  ? "Movies matching your search"
                  : "Popular picks to get you started"}
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-white/63">
              {query.trim()
                ? "Browse the movies that match your search and open any title to see more."
                : "Start with a few popular movies, or search for something specific."}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                imdbID={movie.imdbID}
                title={movie.Title}
                year={movie.Year}
                type={movie.Type}
                poster={movie.Poster}
                isSelected={selectedImdbID === movie.imdbID}
                isSaved={isInWatchlist(movie.imdbID)}
                onSelect={handleViewDetails}
                onToggleWatchlist={toggleWatchlistById}
              />
            ))}
          </div>
          {!isSearchLoading &&
          movies.length === 0 &&
          !searchError &&
          query.trim() ? (
            <div className="rounded-[1.75rem] border border-dashed border-white/10 bg-white/6 p-8 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                No results
              </p>
              <p className="mt-3 text-sm leading-7 text-white/62">
                Try a broader title, remove punctuation, or search for a more
                common release name.
              </p>
            </div>
          ) : null}
        </section>

        <MovieDetailSheet
          open={isDetailOpen}
          onOpenChange={(open) => {
            setIsDetailOpen(open);

            if (!open) {
              setSelectedImdbID(null);
              setSelectedMovie(null);
              setDetailError(null);
            }
          }}
          movie={selectedMovie}
          isLoading={isDetailLoading}
          errorMessage={detailError}
          isSaved={selectedMovie ? isInWatchlist(selectedMovie.imdbID) : false}
          onToggleWatchlist={toggleWatchlistByMovie}
        />
        <WatchlistSheet
          open={isWatchlistOpen}
          onOpenChange={setIsWatchlistOpen}
          items={watchlist}
          onRemove={removeFromWatchlist}
        />
      </div>
    </div>
  );
};

export default HomePage;
