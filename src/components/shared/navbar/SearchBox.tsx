"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getSearchSuggestions } from "@/lib/actions/movies.actions"
import { ChevronRight, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect, useTransition } from "react"
import MovieSuggestionList from "./MovieSuggestionItem"

type Suggestion = {
    _id: string
    title: string
    type?: string,
    poster?: string,
    year?: number,
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
        const timer = setTimeout(() => setDebouncedQuery(query), 300)
        return () => clearTimeout(timer)
    }, [query])

    // Fetch suggestions
    useEffect(() => {
        if (debouncedQuery.length > 2) {
            startTransition(async () => {
                const results = await getSearchSuggestions({ query: debouncedQuery, limit: 5 })
                setSuggestions(results)
                console.log(results)
            })
        } else {
            setSuggestions([])
        }
    }, [debouncedQuery])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/search/${encodeURIComponent(query.trim())}`)
            setOpen(false)
            setQuery('')
        }
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
                <Button variant="primary" size="icon">
                    <Search className="size-5" />
                    <span className="sr-only">Search</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-background">
                {/* <div className="max-h-[70vh] overflow-y-auto pr-1 mt-4 thin-scrollber"> */}
                <ScrollArea className="max-h-[70vh] overflow-y-auto pr-2 mt-4 ">
                    <form onSubmit={handleSubmit} className="relative mb-2">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                autoFocus
                                type="text"
                                placeholder="Search movies, TV shows..."
                                className="pl-12 pr-10 h-12 text-base"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            {isPending && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                </div>
                            )}
                        </div>
                    </form>
                    <MovieSuggestionList suggestions={suggestions} />
                    {suggestions.length > 0 &&
                        <Button asChild className="w-full m-2">
                            <Link href={`/search/${encodeURIComponent(query.trim())}`}>
                                <span>View all results</span>
                                <ChevronRight />
                            </Link>
                        </Button>
                    }
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}