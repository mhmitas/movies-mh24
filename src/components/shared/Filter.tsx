"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, FilterIcon, Search, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GENRES, TYPES } from "@/constants"
import { Separator } from "../ui/separator"
import { useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import { debounce } from "lodash"

type FilterParams = {
    genre?: string;
    type?: string;
    [key: string]: string | undefined;
}

export default function Filter({ heading }: { heading?: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [filterKey, setFilterKey] = useState(0) // Force re-render on clear

    // Initialize state from URL params
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [selectedType, setSelectedType] = useState<string>("")

    // Sync state with URL params
    useEffect(() => {
        const urlGenres = searchParams.get("genre")?.split("+") || []
        setSelectedGenres(urlGenres)
        setSelectedType(searchParams.get("type") || "")
    }, [searchParams, filterKey])

    // Debounced filter handler
    const debouncedApply = useMemo(
        () =>
            debounce((params: FilterParams) => {
                const newUrl = qs.stringifyUrl(
                    {
                        url: "/filter",
                        query: params,
                    },
                    { skipNull: true, skipEmptyString: true, encode: true }
                );
                router.push(newUrl, { scroll: false });
                setIsLoading(false);
            }, 500),
        [router]
    );

    const applyFilters = useCallback(
        (params: FilterParams) => {
            debouncedApply(params);
        },
        [debouncedApply]
    );

    const handleFilterChange = useCallback(() => {
        setIsLoading(true)

        const newQuery: FilterParams = {
            ...qs.parse(searchParams.toString()),
            type: selectedType || undefined,
            genre: selectedGenres.length > 0 ? selectedGenres.join('+') : undefined,
            page: '1' // reset pagination
        }

        applyFilters(newQuery)
        setIsOpen(false)
    }, [selectedType, selectedGenres, searchParams, applyFilters])

    const toggleGenre = (genre: string) => {
        setSelectedGenres(prev =>
            prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
        )
    }

    const clearFilters = () => {
        setSelectedGenres([])
        setSelectedType("")
        setFilterKey(prev => prev + 1) // Force re-render

        // Apply empty filters immediately
        const newUrl = qs.stringifyUrl(
            {
                url: window.location.pathname,
                query: {},
            },
            { skipNull: true }
        )
        router.push(newUrl, { scroll: false })
        setIsOpen(false)
    }

    return (
        <div className="w-full my-container filter-container">
            <div className="flex justify-between mb-2">
                <h1 className="text-2xl font-medium">{heading || "Filter results"}</h1>
                <Button
                    variant="outline"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2"
                    aria-label={isOpen ? "Close filters" : "Open filters"}
                >
                    <FilterIcon size={16} />
                    <span>Filter</span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown className="h-4 w-4" />
                    </motion.div>
                </Button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden shadow-lg"
                    >
                        <div className="border border-muted rounded-lg p-4 bg-card w-full space-y-4">
                            {/* Type Filter */}
                            <div>
                                <h3 className="font-semibold mb-2">Type</h3>
                                <div className="flex flex-wrap gap-2">
                                    {TYPES.map((type) => (
                                        <Button
                                            variant={selectedType === type.value ? "default" : "outline"}
                                            key={type.value}
                                            onClick={() => setSelectedType(prev =>
                                                prev === type.value ? "" : type.value
                                            )}
                                            className="rounded-full min-w-[80px]"
                                            size="sm"
                                        >
                                            {type.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            {/* Genre Filter */}
                            <div>
                                <h3 className="font-semibold mb-2">Genre</h3>
                                <div className="flex flex-wrap gap-2">
                                    {GENRES.map((genre) => (
                                        <Button
                                            variant={
                                                selectedGenres.includes(genre)
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            key={genre}
                                            onClick={() => toggleGenre(genre)}
                                            className="rounded-full"
                                            size="sm"
                                        >
                                            {genre}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            {/* Action Buttons */}
                            <div className="flex gap-2 justify-between">
                                <Button
                                    variant="ghost"
                                    onClick={clearFilters}
                                    disabled={!selectedType && selectedGenres.length === 0}
                                    className="gap-2"
                                >
                                    <X size={16} />
                                    <span>Clear All</span>
                                </Button>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => setIsOpen(false)}
                                        variant="secondary"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleFilterChange}
                                        disabled={(!selectedType && selectedGenres.length === 0) || isLoading}
                                        className="gap-2"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Search size={16} />
                                        )}
                                        <span>Apply</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}