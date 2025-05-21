"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Info, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn, formatDuration } from "@/lib/utils"
import { IMovie } from "@/lib/database/models/movie.model"
import { getAdditionDataFromTmdb } from "@/lib/actions/movies.actions"
import Link from "next/link"

export function MovieCard2({ title, poster, year, _id, type, runtime, imdb, genres }
    : IMovie) {
    const [isHovered, setIsHovered] = useState(false);
    const [moviePosterUrl, setMoviePosterUrl] = useState<string>(poster || "/images/poster-placeholder.svg");

    // Check if the poster is available
    // If not, try to fetch it from TMDB using the IMDB ID
    useEffect(() => {
        if (!moviePosterUrl && imdb?.id) {
            (async () => {
                try {
                    const { posterUrl } = await getAdditionDataFromTmdb(Number(imdb.id));
                    setMoviePosterUrl(posterUrl || "/images/poster-placeholder.svg");
                } catch {
                    setMoviePosterUrl("/images/poster-placeholder.svg");
                }
            })();
        }
    })
    // Final fallback if nothing worked
    if (!moviePosterUrl) {
        setMoviePosterUrl("/images/poster-placeholder.svg");
    }

    return (
        <div
            className="group relative w-full aspect-[2/3] rounded-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10 hover:shadow-xl cursor-default"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Movie Poster */}
            <Image
                src={poster || "/placeholder.svg"}
                alt={title}
                width={500}
                height={750}
                className="object-fill transition-opacity duration-300"
                priority
            />

            {/* Gradient Overlay */}
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300",
                    isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                )}
            />

            {/* Content Overlay */}
            <div
                className={cn(
                    "absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-300 ease-in-out",
                    isHovered ? "translate-y-0" : "translate-y-8 group-hover:translate-y-0",
                )}
            >
                <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">{title}</h3>

                <div className="flex items-center gap-2 text-xs text-gray-300 mb-2">
                    <span className="text-green-500 font-medium">{imdb?.rating}% Match</span>
                    <span>{year}</span>
                    <span>{formatDuration(runtime || 0)}</span>
                </div>

                <p className="text-gray-300 text-sm mb-3 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium officia placeat quos odio? Aspernatur distinctio eaque sit voluptas est iste suscipit mollitia eum consequatur? Numquam, molestiae voluptatem. Impedit, corrupti doloribus.
                </p>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                        size="sm"
                        className="rounded-full bg-white text-black hover:bg-white/90 flex-1"
                    >
                        <Play className="h-4 w-4 mr-1 fill-black" />
                        Play
                    </Button>
                    <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-full border-white/40 text-white hover:bg-black/30 flex-1"
                    >
                        <Link href={`/movie/${_id}`}>
                            <Info className="h-4 w-4 mr-1" />
                            <span>More Info</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
