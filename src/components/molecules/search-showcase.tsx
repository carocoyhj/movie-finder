import {
  MagnifyingGlass,
  SpinnerGap,
  WarningCircle,
} from "@phosphor-icons/react";

import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import type { SearchShowcaseProps } from "@/types/components";

const SearchShowcase = ({
  query,
  onQueryChange,
  onSubmit,
  selectedType,
  onTypeChange,
  isLoading = false,
}: SearchShowcaseProps) => {
  const typeOptions = [
    { label: "All", value: "all" as const },
    { label: "Movies", value: "movie" as const },
    { label: "Series", value: "series" as const },
    { label: "Episodes", value: "episode" as const },
  ];

  return (
    <div>
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
              <div className="flex flex-wrap gap-2">
                {typeOptions.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant={
                      selectedType === option.value ? "secondary" : "ghost"
                    }
                    className={`rounded-full border ${
                      selectedType === option.value
                        ? "border-white/20 bg-white text-slate-950 hover:bg-white/90"
                        : "border-white/10 bg-white/8 text-white hover:bg-white/12"
                    }`}
                    onClick={() => onTypeChange(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <Card className="border-rose-500/20 bg-rose-500/5 text-white shadow-sm">
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-2 text-rose-300">
                <WarningCircle size={18} weight="fill" />
                <span className="text-xs font-medium uppercase tracking-[0.28em]">
                  What you can do
                </span>
              </div>

              <div className="space-y-1">
                <CardTitle className="text-xl text-white">
                  A simple way to browse movies
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-300" />
                  <span>
                    Search by title and open a movie to see more details.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-300" />
                  <span>
                    Browse ratings, cast, and story information in one place.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-300" />
                  <span>Save movies you want to revisit later.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-300" />
                  <span>
                    Enjoy a cleaner browsing experience as you explore.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchShowcase;
