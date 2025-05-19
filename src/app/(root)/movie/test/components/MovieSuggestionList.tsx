"use client"

import { Separator } from '@/components/ui/separator'
import { MovieSuggestion } from '@/types'
import { HistoryIcon, Search } from 'lucide-react'
import React from 'react'


const MovieSuggestionList = ({ suggestions }: { suggestions: MovieSuggestion[] }) => {

    return (
        <div className="absolute top-18 left-0 right-0 bg-card pb-4 rounded-b-2xl">
            <Separator className="my-1" />
            {suggestions.map((suggestion, index) => (
                <div className="relative py-2 hover:bg-muted cursor-pointer" key={index}>
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <p className='pl-12 pr-10'>{suggestion.title}</p>
                </div>
            ))}
            {[0, 1, 3, 4].map((index) => <div className="relative py-2 hover:bg-muted cursor-pointer" key={index}>
                <HistoryIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <p className='pl-12 pr-10'>Lorem ipsum dolor sit amet.</p>
            </div>)}
        </div>
    )
}

export default MovieSuggestionList;