import {
  BookmarkSimple,
  CalendarBlank,
  FilmSlate,
} from "@phosphor-icons/react";

import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import type { MovieCardProps } from "@/types/components";

const MovieCard = ({
  imdbID,
  title,
  year,
  type,
  poster,
  isSaved = false,
  isSelected = false,
  onSelect,
  onToggleWatchlist,
}: MovieCardProps) => {
  const hasPoster = poster && poster !== "N/A";

  return (
    <Card
      className={`group overflow-hidden rounded-[1.75rem] py-0 text-white shadow-2xl shadow-black/20 transition-transform duration-300 hover:-translate-y-1 hover:bg-white/10 ${
        isSelected
          ? "border-rose-300/45 bg-white/12"
          : "border-white/10 bg-white/8"
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {hasPoster ? (
          <img
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            src={poster}
            alt={title}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white/55">
            <FilmSlate size={44} weight="fill" />
            <p className="mt-4 text-xs uppercase tracking-[0.35em]">
              No poster
            </p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge className="border-white/10 bg-black/45 text-white hover:bg-black/50">
            <CalendarBlank size={14} />
            {year}
          </Badge>
        </div>
        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/45 text-white hover:bg-black/60"
          onClick={() => onToggleWatchlist?.(imdbID)}
        >
          <BookmarkSimple size={18} weight={isSaved ? "fill" : "regular"} />
        </Button>
      </div>

      <CardContent className="space-y-4 p-5 -mt-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold leading-tight">{title}</h3>
            <Badge
              variant="secondary"
              className="rounded-full bg-white/8 text-white hover:bg-white/10 uppercase"
            >
              {type}
            </Badge>
          </div>
        </div>

        <Button
          className="w-full rounded-xl bg-white text-slate-950 hover:bg-white/90"
          onClick={() => onSelect?.(imdbID)}
        >
          View details
        </Button>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
