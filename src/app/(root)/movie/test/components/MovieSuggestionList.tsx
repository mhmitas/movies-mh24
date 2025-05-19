"use client"

import { Separator } from '@/components/ui/separator'
import { MovieSuggestion } from '@/types'
import { Search } from 'lucide-react'
import React from 'react'

interface MovieSuggestionListProps {
    suggestions: MovieSuggestion[]
    onSelect: (title: string) => void
}

const MovieSuggestionList = ({ suggestions, onSelect }: MovieSuggestionListProps) => {
    return (
        <div
            className="absolute top-20 left-0 right-0 pb-4 rounded-xl shadow-lg z-50 bg-gray-50 text-black"
            role="listbox"
            aria-label="Search suggestions"
        >
            {suggestions.map((suggestion) => (
                <div
                    className="relative py-2 hover:bg-muted cursor-pointer"
                    key={suggestion._id}
                    role="option"
                    onClick={() => onSelect(suggestion.title)}
                >
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-800" />
                    <p className='pl-12 pr-10'>{suggestion.title}</p>
                </div>
            ))}
            {suggestions.length === 0 && (
                <div className="relative py-2 text-gray-600 text-center">
                    No suggestions found
                </div>
            )}
        </div>
    )
}

export default MovieSuggestionList