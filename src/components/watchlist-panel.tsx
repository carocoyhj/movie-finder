import { BookmarkSimple, ClockCounterClockwise, Star } from "@phosphor-icons/react";

import type { MovieDetails } from "@/services/omdb-service";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type WatchlistPanelProps = {
	items: MovieDetails[];
	onRemove: (imdbID: string) => void;
};

const WatchlistPanel = ({ items, onRemove }: WatchlistPanelProps) => {
	return (
		<Card className="rounded-[2rem] border-white/10 bg-white/8 text-white shadow-2xl shadow-black/20">
			<CardHeader className="space-y-4">
				<div className="flex items-start justify-between gap-4">
					<div>
						<p className="text-sm uppercase tracking-[0.3em] text-white/40">Personal Watchlist</p>
						<CardTitle className="mt-2 text-2xl font-semibold">Saved for later</CardTitle>
					</div>
					<div className="inline-flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8">
						<BookmarkSimple size={20} weight="fill" />
					</div>
				</div>
				<p className="text-sm leading-7 text-white/65">
					Keep track of the movies you want to watch and come back to them anytime.
				</p>
			</CardHeader>

			<CardContent className="space-y-5">
				<div className="flex flex-wrap items-center gap-2">
					<Badge className="rounded-full bg-white text-slate-950 hover:bg-white/90">
						{items.length} saved
					</Badge>
					<Badge className="rounded-full border-white/10 bg-white/8 text-white hover:bg-white/10">
						Your picks
					</Badge>
					<Badge className="rounded-full border-white/10 bg-white/8 text-white hover:bg-white/10">
						Ready anytime
					</Badge>
				</div>

				<ScrollArea className="h-[360px] pr-4">
					<div className="space-y-4">
						{items.length === 0 ? (
							<div className="rounded-[1.5rem] border border-dashed border-white/10 bg-black/20 p-6 text-center">
								<p className="text-sm uppercase tracking-[0.28em] text-white/38">Empty watchlist</p>
								<p className="mt-3 text-sm leading-7 text-white/62">
									Save movies you like and they will show up here.
								</p>
							</div>
						) : null}
						{items.map((item) => (
							<div key={item.imdbID} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-3">
								<div className="flex gap-4">
									<img
										className="h-24 w-18 rounded-xl object-cover"
										src={item.Poster !== "N/A" ? item.Poster : "https://placehold.co/160x240/111827/E5E7EB?text=No+Poster"}
										alt={item.Title}
									/>
									<div className="flex min-w-0 flex-1 flex-col justify-between">
										<div>
											<p className="truncate text-base font-medium text-white">{item.Title}</p>
											<p className="mt-1 text-sm text-white/48">{item.Year}</p>
										</div>
										<div className="flex flex-wrap items-center gap-2">
											<Badge className="border-white/10 bg-white/8 text-white hover:bg-white/10">
												<Star size={14} weight="fill" />
												{item.imdbRating !== "N/A" ? item.imdbRating : "N/A"}
											</Badge>
											<Button
												variant="ghost"
												size="sm"
												className="h-8 rounded-full px-3 text-white/70 hover:bg-white/8 hover:text-white"
												onClick={() => onRemove(item.imdbID)}
											>
												Remove
											</Button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</ScrollArea>

				<Separator className="bg-white/10" />

				<div className="rounded-[1.5rem] border border-amber-300/15 bg-amber-300/8 p-5">
					<div className="flex items-center gap-2 text-amber-50">
						<ClockCounterClockwise size={18} />
						<p className="text-sm uppercase tracking-[0.28em]">Keep it handy</p>
					</div>
					<p className="mt-3 text-sm leading-7 text-amber-50/80">
						Your saved movies stay here, so it is easy to pick up where you left off.
					</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default WatchlistPanel;
