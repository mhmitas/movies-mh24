"use client"

import { Search } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect, useTransition, useRef } from "react"
import { getSearchSuggestions } from "@/lib/actions/search.actions"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import MovieSuggestionList from "@/components/shared/MovieSuggestionList"

type Suggestion = {
    _id: string
    title: string
    type?: string
    poster?: string
    year?: number
    runtime?: number
}

export default function NavbarSearchBox({ className, isHomePage }: { className?: string, isHomePage?: boolean }) {
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

    function handleSuggestionSelect(title: string, condition?: "all") {
        if (condition === "all") {
            handleSearch(query)
        }
        else {
            handleSearch(title)
        }
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
        <div ref={containerRef} className={cn("relative group", className)}>
            <form onSubmit={handleSubmit} className="relative">
                <Input
                    className={cn(
                        "w-full",
                        isHomePage ? "h-16 terrible-input-text pl-14 pr-10 rounded-full" : " pl-10 pr-8 rounded-xl h-9.5"
                    )}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setOpen(true)
                    }}
                    value={query}
                    placeholder="Search..."
                    onFocus={() => setOpen(true)}
                    aria-label="Search input"
                    aria-expanded={open}
                />

                {/* Search Icon - Responsive sizing */}
                <Search className={cn(
                    "absolute text-muted-foreground",
                    isHomePage ? "left-6 top-1/2 -translate-y-1/2" : "left-4 top-1/2 -translate-y-1/2 h-5 w-5 sm:h-4 sm:w-4"
                )} />

                {/* Loading Spinner - Responsive positioning */}
                {isPending && (
                    <div className={cn(
                        "absolute",
                        isHomePage ? "right-4 top-1/2 -translate-y-1/2" : "right-3 top-1/2 -translate-y-1/2 sm:right-2" // Adjust for smaller screens
                    )}>
                        <div className="h-5 w-5 sm:h-4 sm:w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    </div>
                )}
            </form>

            {/* Suggestion List - Responsive positioning */}
            {open && (
                <MovieSuggestionList
                    className={cn(
                        "bg-card shadow-lg border mt-1 absolute w-full",
                        "top-[calc(100%+0.25rem)] sm:top-[calc(100%+0.5rem)]", // Dynamic positioning
                        "max-h-[60vh] overflow-y-auto thin-scrollbar" // Scroll for mobile
                    )}
                    suggestions={suggestions}
                    onSelect={handleSuggestionSelect}
                    query={query}
                />
            )}
        </div>
    )
}