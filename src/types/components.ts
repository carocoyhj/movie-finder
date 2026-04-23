import type { MovieDetails } from "@/types/omdb";

export type MovieCardProps = {
  imdbID: string;
  title: string;
  year: string;
  type: string;
  poster: string;
  isSaved?: boolean;
  isSelected?: boolean;
  onSelect?: (imdbID: string) => void;
  onToggleWatchlist?: (imdbID: string) => void;
};

export type MovieDetailPanelProps = {
  movie: MovieDetails | null;
  isLoading?: boolean;
  errorMessage?: string | null;
  isSaved?: boolean;
  onToggleWatchlist?: (movie: MovieDetails) => void;
};

export type SearchShowcaseProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: () => void;
  selectedType: "all" | "movie" | "series" | "episode";
  onTypeChange: (value: "all" | "movie" | "series" | "episode") => void;
  isLoading?: boolean;
};

export type WatchlistPanelProps = {
  items: MovieDetails[];
  onRemove: (imdbID: string) => void;
};

export type AppHeaderProps = {
  onOpenWatchlist?: () => void;
  watchlistCount?: number;
};

export type MovieDetailSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movie: MovieDetails | null;
  isLoading?: boolean;
  errorMessage?: string | null;
  isSaved?: boolean;
  onToggleWatchlist?: (movie: MovieDetails) => void;
};

export type WatchlistSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: MovieDetails[];
  onRemove: (imdbID: string) => void;
};
