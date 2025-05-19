import { capitalize } from "@/lib/utils"
import { MovieSuggestion } from "@/types"
import Image from "next/image"
import Link from "next/link"

interface MovieSuggestionListProps {
    suggestions: MovieSuggestion[]
}

export default function MovieSuggestionList({ suggestions = [] }: MovieSuggestionListProps) {
    if (suggestions.length === 0) {
        return <div className="text-center py-4 text-muted-foreground">No suggestions available</div>
    }

    return (
        <div className="space-y-1 sm:space-y-2">
            {suggestions.map((suggestion, index) => (
                <MovieSuggestionItem key={index} suggestion={suggestion} />
            ))}
        </div>
    )
}

interface MovieSuggestionItemProps {
    suggestion: MovieSuggestion
}

function MovieSuggestionItem({ suggestion }: MovieSuggestionItemProps) {
    return (
        <Link href={`/movie-details/${suggestion._id}`}>
            <div className="flex py-1 sm:py-2 gap-3 sm:gap-4 cursor-pointer hover:bg-accent/50 rounded-md px-2 transition-colors border-b">
                <div className="flex-shrink-0 w-12 h-18 sm:w-16 sm:h-24 relative overflow-hidden rounded-md bg-gradient-to-br from-violet-950 via-violet-900 to-violet-950">
                    <Image
                        src={suggestion?.poster || "/images/poster-placeholder.svg"}
                        alt={suggestion.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 48px, 64px"
                    />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                    <h3 className="font-medium text-foreground text-sm sm:text-base line-clamp-1">{suggestion.title}</h3>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mt-1">
                        {suggestion?.year && <span>{suggestion.year}</span>}
                        <span className="inline">•</span>
                        {suggestion?.runtime && (
                            <>
                                <span>{suggestion.runtime}m</span>
                                <span className="inline">•</span>
                            </>
                        )}
                        <span>{capitalize(suggestion?.type || "movie")}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
