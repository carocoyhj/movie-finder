import { BookmarkSimple } from "@phosphor-icons/react";

import { Button } from "@/components/atoms/button";
import logo from "@/assets/cinesave.png";
import type { AppHeaderProps } from "@/types/components";

const AppHeader = ({
	onOpenWatchlist,
	watchlistCount = 0,
}: AppHeaderProps) => {
	return (
		<header className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/6 px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-6">
			<div className="flex items-center">
				<img
					src={logo}
					alt="CineSave logo"
					className="size-16 shrink-0 object-contain drop-shadow-[0_10px_24px_rgba(216,53,126,0.28)]"
				/>
				<div>
					<p className="text-xl font-bold uppercase tracking-[0.35em] text-white/45">CineSave</p>
				</div>
			</div>

			<div className="flex flex-wrap items-center gap-3">
				<Button
					className="rounded-2xl bg-white text-slate-950 hover:bg-white/90"
					onClick={onOpenWatchlist}
				>
					<BookmarkSimple size={18} weight="fill" />
					Watchlist ({watchlistCount})
				</Button>
			</div>
		</header>
	);
};

export default AppHeader;
