"use client"

import MovieSuggestionList from '@/components/shared/navbar/MovieSuggestionItem'
import { Input } from '@/components/ui/input'
import { autocompleteSearchTest } from '@/lib/actions/test.actions'
import { MovieSuggestion } from '@/types'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'

type Suggestion = {
    _id: string
    title: string
    type?: string
    poster?: string
    year?: number
    runtime?: number
}


const SearchTestPage = () => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [query, setQuery] = useState('')
    const [isPending, startTransition] = useTransition()
    const [debouncedQuery, setDebouncedQuery] = useState('')

    // Debounce query input
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(query.trim()), 300)
        return () => clearTimeout(timer)
    }, [query])

    // Fetch suggestions
    useEffect(() => {
        if (debouncedQuery.length >= 2) {
            startTransition(async () => {
                try {
                    const results = await autocompleteSearchTest({
                        query: debouncedQuery,
                        limit: 10
                    })
                    setSuggestions(results)
                    // console.log(results)
                } catch {
                    // console.error("Search failed:", error)
                    setSuggestions([])
                }
            })
        } else {
            setSuggestions([])
        }
    }, [debouncedQuery])

    const handleSearch = (searchTerm: string) => {
        const encodedQuery = encodeURIComponent(searchTerm.trim())
        if (encodedQuery) {
            router.push(`/search/${encodedQuery}`)
            setOpen(false)
            setQuery('')
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleSearch(query)
    }


    return (
        <div className='my-container my-20'>

            <form onSubmit={handleSubmit} className="relative mb-2 max-w-2xl mx-auto">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        autoFocus
                        type="text"
                        placeholder="Search movies, TV shows..."
                        className="pl-12 pr-10 h-12 text-base rounded-full border border-input/50 bg-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:ring-offset-background"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Search input"
                    />
                    {isPending && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        </div>
                    )}
                </div>
                <MovieSuggestionTitles suggestions={suggestions} />
            </form>
        </div>
    )
}

export default SearchTestPage;


function MovieSuggestionTitles({ suggestions }: { suggestions: MovieSuggestion[] }) {
    return (
        <div className="space-y-1 sm:space-y-2 max-w-2xl border border-t-2 shadow-muted/50 shadow-md border-t-muted-foreground rounded-xl p-4 mx-auto absolute top-16 left-0 right-0 bg-background">
            {suggestions.map((suggestion, index) => (
                <div key={index}>{suggestion.title}</div>
            ))}
        </div>
    )
}