"use client"

import { autocompleteSearchTest } from '@/lib/actions/test.actions'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'
import MovieSuggestionList from './components/MovieSuggestionList'
import { cn } from '@/lib/utils'

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
    const [open, setOpen] = useState(true)
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

    // Close filter when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (open && !target.closest('.suggestion-list')) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [open])

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
        <div className='my-container my-20 min-h-screen'>
            <form onSubmit={handleSubmit} className="relative mb-2 max-w-xl mx-auto pt-6 suggestion-list">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Search for Movies, TV Shows..."
                        className={cn(
                            "pl-12 pr-10 h-12 border-none outline-none bg-card w-full",
                            "remove-input-outline font-medium",
                            open ? "rounded-t-2xl" : "rounded-full"
                        )}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setOpen(true)}
                        aria-label="Search input"
                    />
                    {isPending && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        </div>
                    )}
                </div>
                {open && <MovieSuggestionList suggestions={suggestions} />}
            </form>
        </div>
    )
}

export default SearchTestPage;