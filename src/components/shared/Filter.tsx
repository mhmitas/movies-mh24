"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, FilterIcon, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GENRES } from "@/constants"
import { Separator } from "../ui/separator"
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"

export default function ToggleButton() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false)

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    // console.log("searhParams geners", searchParams.get('genre')?.split('+'))

    useEffect(() => {
        const urlGenres = searchParams.get("genre")?.split("+") || [];
        setSelectedGenres(urlGenres);
    }, []);

    const handleFilterChange = () => {
        let newUrl = '';

        if (selectedGenres.length > 0) {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'genre',
                value: selectedGenres.join('+')
            })
        } else {
            console.log("I need to remove the genre")
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['genre']
            })
        }

        router.push(newUrl, { scroll: true })
    }

    const toggleGenre = (genre: string) => {
        setSelectedGenres((prev) =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
        );
    };


    return (
        <div className="w-full my-container">
            <div className="flex justify-end mb-2">
                <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
                    <FilterIcon />
                    <span>Filter</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
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
                        className="overflow-hidden"
                    >
                        <div className="border border-muted rounded p-4 bg-card w-full">
                            <h3 className="font-semibold mb-2">Genre</h3>
                            <div className="flex flex-wrap gap-2">
                                {GENRES.map((genre) => (
                                    <Button
                                        variant={
                                            selectedGenres.includes(genre)
                                                ? 'default'
                                                : 'ghost'
                                        }
                                        key={genre}
                                        onClick={() => toggleGenre(genre)}
                                        className={`cursor-pointer rounded-full`}
                                        size={"sm"}
                                    >
                                        {genre}
                                    </Button>
                                ))}
                            </div>
                            <Separator className="mt-4" />
                            <div className="flex mt-4 gap-4">
                                <Button onClick={handleFilterChange} className="cursor-pointer"><Search /><span>Filter</span></Button>
                                <Button onClick={() => setIsOpen(false)} variant={"secondary"} className="cursor-pointer"><X /> <span>Close</span></Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
