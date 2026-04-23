import {
  MagnifyingGlass,
  SlidersHorizontal,
  SpinnerGap,
  WarningCircle,
} from "@phosphor-icons/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type SearchShowcaseProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  totalResults: number;
  errorMessage?: string | null;
  selectedMovieTitle?: string;
};

const SearchShowcase = ({
  query,
  onQueryChange,
  onSubmit,
  isLoading = false,
  totalResults,
  selectedMovieTitle,
}: SearchShowcaseProps) => {
  return (
    <div className="">
      <Card className="overflow-hidden rounded-[2rem] border-white/10 bg-white/8 py-0 text-white shadow-2xl shadow-black/20">
        <CardContent className="space-y-8 p-6 sm:p-8">
          <div className="space-y-5">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-white/40">
                Start your search
              </p>
              <h2 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Discover Your Next Favorite Film
              </h2>
              <p className="max-w-3xl text-base leading-7 text-white/68">
                Search by title, explore movie details, and keep your favorites
                close by.
              </p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <MagnifyingGlass
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                  size={18}
                />
                <Input
                  value={query}
                  onChange={(event) => onQueryChange(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      onSubmit();
                    }
                  }}
                  placeholder="Search by movie title"
                  className="h-13 rounded-2xl border-white/10 bg-white/8 pl-11 text-white placeholder:text-white/30"
                />
              </div>
              <Button
                className="h-13 rounded-2xl bg-white px-6 text-slate-950 hover:bg-white/90"
                onClick={onSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <SpinnerGap size={18} className="animate-spin" />
                    Searching
                  </>
                ) : (
                  "Search movies"
                )}
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge className="rounded-full border-white/10 bg-white/8 text-white hover:bg-white/10">
                {totalResults} result{totalResults === 1 ? "" : "s"}
              </Badge>
              <Badge className="rounded-full border-white/10 bg-white/8 text-white hover:bg-white/10">
                Ready to explore
              </Badge>
              <Badge className="rounded-full border-white/10 bg-white/8 text-white hover:bg-white/10">
                <SlidersHorizontal size={14} />
                Selected: {selectedMovieTitle ?? "None yet"}
              </Badge>
            </div>
          </div>

          <div>
            <div className="rounded-2xl border border-rose-400/20 bg-gradient-to-br from-rose-400/10 to-rose-400/5 p-6 shadow-sm backdrop-blur">
              {/* Header */}
              <div className="flex items-center gap-3 text-rose-200">
                <WarningCircle size={18} weight="fill" />
                <p className="text-xs font-medium uppercase tracking-[0.3em]">
                  What you can do
                </p>
              </div>

              {/* Title */}
              <h3 className="mt-3 text-lg font-semibold text-white">
                Discover and track your favorite movies
              </h3>

              {/* Features */}
              <ul className="mt-5 space-y-3 text-sm text-white/75">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-300" />
                  Search movies instantly by title
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-300" />
                  View ratings, cast, and story details
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-300" />
                  Save movies for later
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-300" />
                  Clean layout designed for easy browsing
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchShowcase;
