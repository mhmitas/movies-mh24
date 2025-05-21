import MovieCollPagination from '@/components/shared/MovieCollPagination';
import { handleMovieSearch } from '@/lib/actions/search.actions';
import { Metadata } from 'next';
import React from 'react'

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

    const movies = await handleMovieSearch({
        page: currentPage,
        limit: 36,
        query: decodedQuery,
    })

    // console.log(movies)

    return (
        <main className='scroll-smooth space-y-10'>
            <h1 className='page-top-margin text-2xl my-container'>Search results for "{decodedQuery}"</h1>
            <MovieCollPagination
                movies={movies?.data}
                page={currentPage}
                totalPages={movies?.totalPages}
            />
        </main>
    )
}

export default SearchResultsPage;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ title: string }>
}): Promise<Metadata> {

    const { title: dynamicTitle } = await params
    const decodedQuery = decodeURIComponent(dynamicTitle)

    return {
        title: `Search results for "${decodedQuery}"`,
        description: `Search results for ${decodedQuery}`,
    }
}