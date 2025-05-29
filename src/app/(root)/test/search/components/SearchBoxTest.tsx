"use client"

import { MovieSuggestion } from '@/types'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import React, { useEffect, useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { handleMovieSearchTest } from '@/lib/actions/test.actions'

const SearchBox = () => {
    const [suggestions, setSuggestions] = useState<MovieSuggestion[]>([])
    const searchParams = useSearchParams()
    const [query, setQuery] = useState(searchParams?.get('q') || '')
    const [isPending, startTransition] = useTransition()
    const [debouncedQuery, setDebouncedQuery] = useState('')
    const router = useRouter();

    // handle search
    function onSearch(query: string) {
        const encodedQuery = encodeURIComponent(query.trim())
        router.push(`/test/search?q=${encodedQuery}`, { scroll: true })
    }

    // Debounce query input
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(query.trim()), 300)
        return () => clearTimeout(timer)
    }, [query])

    // Fetch suggestions
    useEffect(() => {
        let isMounted = true
        if (debouncedQuery.length >= 2) {
            startTransition(async () => {
                try {
                    const results = await handleMovieSearchTest({
                        query: debouncedQuery,
                        limit: 10
                    })
                    if (isMounted) setSuggestions(results.data)
                } catch (error) {
                    if (isMounted) setSuggestions([])
                }
            })
        } else {
            setSuggestions([])
        }
        return () => { isMounted = false }
    }, [debouncedQuery])

    // handle form submit to a full search  
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(query)
    }

    // handle click on suggestions
    const handleSuggestionSelect = (title: string) => {
        onSearch(title)
        setQuery(title)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={cn("relative mb-2 mt-20 max-w-xl mx-auto pt-6 suggestion-container")}
        >
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5" />
                <Input
                    autoFocus
                    type="text"
                    placeholder="Search for Movies, TV Shows..."
                    className={cn(
                        "pl-12 pr-10 h-12 w-ful",
                        "font-medium rounded-full"
                    )}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                    }}
                />
                {isPending && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    </div>
                )}
            </div>
            <div className='flex flex-col gap-2 h-96 overflow-y-auto mt-2 rounded-lg bg-card'>
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
                        onClick={() => handleSuggestionSelect(suggestion.title)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSuggestionSelect(suggestion.title)}
                    >
                        <div className="shrink-0 relative w-12 aspect-square rounded-md overflow-hidden bg-muted/50">
                            <img
                                width={64}
                                height={96}
                                src={suggestion.poster}
                                alt={`${suggestion.title} poster`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />

                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium">{suggestion.title}</p>
                        </div>
                    </button>
                ))}
            </div>
        </form>
    )
}

export default SearchBox