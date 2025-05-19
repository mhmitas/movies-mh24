"use client"

import { Search } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect, useTransition, useRef } from "react"
import { getSearchSuggestions } from "@/lib/actions/search.actions"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import MovieSuggestionList from "@/app/(root)/test/search/components/MovieSuggestionList"

type Suggestion = {
    _id: string
    title: string
    type?: string
    poster?: string
    year?: number
    runtime?: number
}

export default function NavbarSearchBox({ className }: { className?: string }) {
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [isPending, startTransition] = useTransition()
    const [debouncedQuery, setDebouncedQuery] = useState('')


    useEffect(() => {
        setOpen(false);
        setQuery('')
    }, [pathname])

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

    function handleSuggestionSelect(params: any) {

    }

    // Add click-outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div ref={containerRef} className={cn("relative suggestion-container", className)}>
            <Input
                className={cn(
                    "rounded-full pl-10 w-full sm:h-10 lg:h-9",
                )}
                onChange={(e) => {
                    setQuery(e.target.value)
                    setOpen(true)
                }}
                onFocus={() => setOpen(true)}
                aria-label="Search input"
                aria-expanded={open}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            {open && <MovieSuggestionList
                className="bg-card top-12 shadow border left-0 right-0"
                suggestions={suggestions}
                onSelect={handleSuggestionSelect}
            />}
            {isPending && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
            )}
        </div>
    )
}