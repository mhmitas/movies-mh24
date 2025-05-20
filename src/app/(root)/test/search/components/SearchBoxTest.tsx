"use client"

import { MovieSuggestion } from '@/types'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import React, { useEffect, useState, useTransition } from 'react'
import MovieSuggestionList from './MovieSuggestionList'
import { autocompleteSearchTest } from '@/lib/actions/test.actions'
import { useRouter, useSearchParams } from 'next/navigation'

const SearchBox = () => {
    const [open, setOpen] = useState(false)
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
                    const results = await autocompleteSearchTest({
                        query: debouncedQuery,
                        limit: 10
                    })
                    if (isMounted) setSuggestions(results)
                } catch (error) {
                    console.error("Search failed:", error)
                    if (isMounted) setSuggestions([])
                }
            })
        } else {
            setSuggestions([])
        }
        return () => { isMounted = false }
    }, [debouncedQuery])

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (open && !target.closest('.suggestion-container')) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [open])

    // handle form submit to a full search  
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(query)
        setOpen(false)
    }

    // handle click on suggestions
    const handleSuggestionSelect = (title: string) => {
        onSearch(title)
        setOpen(false)
        setQuery(title)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={cn("relative mb-2 mt-20 max-w-xl mx-auto pt-6 suggestion-container text-gray-800")}
        >
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-800" />
                <input
                    autoFocus
                    type="text"
                    placeholder="Search for Movies, TV Shows..."
                    className={cn(
                        "pl-12 pr-10 h-12 w-full bg-gray-50 text-gray-800",
                        "font-medium rounded-full"
                    )}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setOpen(true)
                    }}
                    onFocus={() => setOpen(true)}
                    aria-label="Search input"
                    aria-expanded={open}
                />
                {isPending && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    </div>
                )}
            </div>
            {open && <MovieSuggestionList
                className='bg-gray-50 text-black top-20 left-0 right-0'
                suggestions={suggestions}
                onSelect={handleSuggestionSelect}
                query={query}
            />}
        </form>
    )
}

export default SearchBox