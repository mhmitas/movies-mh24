"use client"

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
            className="absolute top-20 left-0 right-0 py-4 rounded-xl shadow-lg z-50 bg-gray-50 text-black"
            role="listbox"
            aria-label="Search suggestions"
        >
            {suggestions.map((suggestion) => (
                <div
                    className="relative py-2 hover:bg-primary hover:text-primary-foreground cursor-pointer"
                    key={suggestion._id}
                    role="option"
                    onClick={() => onSelect(suggestion.title)}
                >
                    {
                        suggestion.poster ? (
                            <div className='absolute left-2 top-1/2 -translate-y-1/2 rounded-md aspect-square overflow-hidden bg-gray-200'>
                                <img
                                    width={32}
                                    height={20}
                                    src={suggestion.poster}
                                    alt={suggestion.title}
                                    className=""
                                />
                            </div>
                        ) :
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-800 hover:text-primary-foreground" />
                    }
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