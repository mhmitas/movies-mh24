import MovieCollPagination from '@/components/shared/MovieCollPagination';
import { handleMovieSearch } from '@/lib/actions/search.actions';
import { Metadata } from 'next';
import React from 'react'

const Search = async (props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
    params: Promise<{ title: string }>
}) => {
    const params = await props?.params;
    const decodedQuery = decodeURIComponent(params?.title)

    const searchParams = await props.searchParams;
    // const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const movies = await handleMovieSearch({
        purpose: "results",
        page: currentPage,
        limit: 36,
        query: decodedQuery,
    })

    return (
        <main className='scroll-smooth space-y-10'>
            <h1 className='mt-24 text-2xl my-container'>Search results for "{decodedQuery}"</h1>
            <MovieCollPagination
                movies={movies?.data}
                page={currentPage}
                totalPages={movies?.totalPages}
            />
        </main>
    )
}

export default Search;

export async function generateMetadata({
    params,
}: {
    params: { query: string }
}): Promise<Metadata> {
    const decodedQuery = decodeURIComponent(params.query)

    return {
        title: `Search: ${decodedQuery}`,
        description: `Search results for ${decodedQuery}`,
    }
}