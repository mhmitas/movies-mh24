// app/search-test/page.tsx
"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import SearchBox from './components/SearchBoxTest'

const SearchTestPage = () => {
    const router = useRouter()

    const handleSearch = (searchTerm: string) => {
        const encodedQuery = encodeURIComponent(searchTerm.trim())
        if (encodedQuery) {
            router.push(`/search/${encodedQuery}`)
        }
    }

    return (
        <div className='my-container my-20 min-h-screen'>
            <SearchBox
                onSearch={handleSearch}
                className="max-w-xl mx-auto"
            />
        </div>
    )
}

export default SearchTestPage