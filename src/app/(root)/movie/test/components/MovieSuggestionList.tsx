"use client"

import { MovieSuggestion } from '@/types'
import { Search } from 'lucide-react'
import React from 'react'


const MovieSuggestionList = ({ suggestions }: { suggestions: MovieSuggestion[] }) => {

    return (
        // max-w-2xl border border-t-2 shadow-muted/50 shadow-md border-t-muted-foreground rounded-xl p-4 mx-auto 
        <div className="absolute top-20 left-0 right-0 bg-card py-4">
            {suggestions.map((suggestion, index) => (
                <div key={index}>
                    <p>{suggestion.title}</p>
                </div>
            ))}
            {[0, 1, 3, 4].map((index) => <div className="relative py-2 hover:bg-muted cursor-pointer hover:text-muted-foreground" key={index}>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <p className='pl-12 pr-10'>Lorem ipsum dolor sit amet.</p>
            </div>)}
        </div>
    )
}

export default MovieSuggestionList;