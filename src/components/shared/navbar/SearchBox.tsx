"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect, useTransition } from "react"
import MovieSuggestionList from "../MovieSuggestionItem"
import { getSearchSuggestions } from "@/lib/actions/search.actions"

type Suggestion = {
    _id: string
    title: string
    type?: string
    poster?: string
    year?: number
    runtime?: number
}

export default function SearchDialog() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
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
                    const results = await getSearchSuggestions({
                        query: debouncedQuery,
                        limit: 5
                    })
                    setSuggestions(results)
                    // console.log(results)
                } catch {
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
        <Dialog
            open={open}
            onOpenChange={(open) => {
                if (!open) {
                    setQuery("")
                    setSuggestions([])
                }
                setOpen(open)
            }}
        >
            <DialogTrigger asChild>
                <Button variant="primary" className="rounded-full border">
                    <Search className="size-5" />
                    <span>Search</span>
                    <span className="sr-only">Search</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-md bg-background rounded-xl">
                <form onSubmit={handleSubmit} className="relative mb-2 pr-2 mt-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            autoFocus
                            type="text"
                            placeholder="Search movies, TV shows..."
                            className="pl-12 pr-10 h-12 text-base rounded-full"
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
                </form>
                <ScrollArea className="h-[70vh] pr-2 overflow-y-auto">

                    <MovieSuggestionList
                        suggestions={suggestions}
                    />

                    {suggestions.length > 0 && query.trim() && (
                        <Button
                            asChild
                            className="w-full m-2"
                        >
                            <Link
                                href={`/search/${encodeURIComponent(query.trim())}`}
                                onClick={() => setOpen(false)}
                            >
                                <span>View all results</span>
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}