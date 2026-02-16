import MovieCollPagination from '@/components/shared/MovieCollPagination';
import { handleMovieSearch } from '@/lib/actions/search.actions';
import LoadingSpinner2 from '@/components/shared/spinners/LoadingSpinner2';
import React, { Suspense } from 'react'

// Separate async component for data fetching
const SearchMovieList = async ({ query, currentPage }: { query: string; currentPage: number }) => {
    const movies = await handleMovieSearch({
        page: currentPage,
        limit: 36,
        query: query,
    })

    return (
        <MovieCollPagination
            movies={movies?.data}
            page={currentPage}
            totalPages={movies?.totalPages}
        />
    )
}

const SearchResultsPage = async (props: {
    searchParams?: Promise<{
        page?: string;
    }>;
    params: Promise<{ title: string }>
}) => {
    const params = await props?.params;
    const decodedQuery = await decodeURIComponent(params?.title)

    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <main className='scroll-smooth space-y-10'>
            <h1 className='page-top-margin text-2xl my-container'>Search results for "{decodedQuery}"</h1>
            <Suspense fallback={<LoadingSpinner2 />}>
                <SearchMovieList query={decodedQuery} currentPage={currentPage} />
            </Suspense>
        </main>
    )
}

export default SearchResultsPage;

