import { BookmarkSimple, FilmSlate } from "@phosphor-icons/react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const AppHeader = () => {
  return (
    <header className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/6 px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 via-orange-400 to-amber-300 text-slate-950 shadow-lg shadow-rose-950/30">
          <FilmSlate size={22} weight="fill" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-white/45">
            Movie Finder
          </p>
          <h1 className="text-xl font-semibold text-white">
            Search, inspect, and save your next watch
          </h1>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button className="rounded-2xl bg-white text-slate-950 hover:bg-white/90">
          <BookmarkSimple size={18} weight="fill" />
          Watchlist
        </Button>
        <Avatar className="size-10 border border-white/10 bg-white/10">
          <AvatarFallback className="bg-transparent text-sm text-white">
            MF
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default AppHeader;
