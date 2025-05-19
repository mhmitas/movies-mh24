// components/SearchBox.tsx
"use client"

import { MovieSuggestion } from '@/types'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import React, { useEffect, useState, useTransition } from 'react'
import MovieSuggestionList from './MovieSuggestionList'
import { autocompleteSearchTest } from '@/lib/actions/test.actions'

interface SearchBoxProps {
    onSearch: (query: string) => void
    initialQuery?: string
    className?: string
}

const SearchBox = ({ onSearch, initialQuery = '', className }: SearchBoxProps) => {
    const [open, setOpen] = useState(false)
    const [suggestions, setSuggestions] = useState<MovieSuggestion[]>([])
    const [query, setQuery] = useState(initialQuery)
    const [isPending, startTransition] = useTransition()
    const [debouncedQuery, setDebouncedQuery] = useState('')

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(query)
        setOpen(false)
        setQuery('')
    }


    const handleSuggestionSelect = (title: string) => {
        onSearch(title)
        setOpen(false)
        setQuery('')
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={cn("relative mb-2 max-w-xl mx-auto pt-6 suggestion-container text-gray-800", className)}
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
                suggestions={suggestions}
                onSelect={handleSuggestionSelect}
            />}
        </form>
    )
}

export default SearchBox