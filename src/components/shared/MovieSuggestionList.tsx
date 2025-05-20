"use client"

import { Button } from '@/components/ui/button'
import { capitalize, cn } from '@/lib/utils'
import { MovieSuggestion } from '@/types'
import { Search, Image as ImageIcon, ChevronRight } from 'lucide-react'
import React from 'react'

interface MovieSuggestionListProps {
    suggestions: MovieSuggestion[]
    onSelect: (title: string) => void
    className?: string,
    query: string
}

const MovieSuggestionList = ({ suggestions, onSelect, className, query }: MovieSuggestionListProps) => {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget
        img.style.display = 'none'
    }

    return (
        <div
            className={cn(
                "absolute pt-2 rounded-xl shadow-lg z-40 mb-[env(keyboard-inset-height)]",
                "bg-background w-full max-h-[60vh] overflow-y-auto",
                "ring-1 ring-muted/50 backdrop-blur-sm",
                className
            )}
            role="listbox"
            aria-label="Search suggestions"
        >
            {suggestions.map((suggestion) => (
                <button
                    type="button"
                    className={cn(
                        "relative w-full p-2 text-left",
                        "flex items-center gap-4",
                        "hover:bg-muted transition-colors cursor-pointer",
                        "focus:bg-muted",
                        "group/suggestion-item"
                    )}
                    key={suggestion._id}
                    role="option"
                    aria-selected="false"
                    onClick={() => onSelect(suggestion.title)}
                    onKeyDown={(e) => e.key === 'Enter' && onSelect(suggestion.title)}
                >
                    <div className="shrink-0 relative w-12 aspect-square rounded-md overflow-hidden bg-muted/50">
                        {suggestion.poster ? (
                            <img
                                width={64}
                                height={96}
                                src={suggestion.poster}
                                alt={`${suggestion.title} poster`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={handleImageError}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted/30">
                                <ImageIcon className="w-4 h-4 text-muted-foreground" />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium">{suggestion.title}</p>
                        {(suggestion.year || suggestion.runtime) && (
                            <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                                {suggestion.year && <span>{suggestion.year}</span>}
                                <span>•</span>
                                {suggestion.runtime && (
                                    <span>{suggestion.runtime}m</span>
                                )}
                                <span>•</span>
                                <span>{capitalize(suggestion.type || "movie")}</span>
                            </div>
                        )}
                    </div>
                </button>
            ))}

            {suggestions.length === 0
                ? <div
                    className="px-4 py-6 text-center text-muted-foreground"
                    role="status"
                    aria-live="polite"
                >
                    <div className="flex flex-col items-center gap-2">
                        <Search className="w-6 h-6" />
                        <p className="text-sm">No results found</p>
                        <p className="text-xs mt-1">Try different keywords</p>
                    </div>
                </div>
                : <Button onClick={() => onSelect(query)} className="mt-2 cursor-pointer w-full">
                    <span>View all results</span>
                    <ChevronRight />
                </Button>
            }
        </div>
    )
}

export default MovieSuggestionList