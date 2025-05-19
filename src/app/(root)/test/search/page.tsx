import MovieCollPagination from '@/components/shared/MovieCollPagination';
import { handleMovieSearch } from '@/lib/actions/search.actions';
import { Metadata } from 'next';
import React from 'react'

const SearchTestPage = async (props: {
    searchParams?: Promise<{
        page?: string;
        q?: string
    }>;
}) => {

    const searchParams = await props.searchParams;

    const currentPage = Number(searchParams?.page) || 1;
    const query = searchParams?.q || '';
    const decodedQuery = decodeURIComponent(query)



    const movies = await handleMovieSearch({
        page: currentPage,
        limit: 36,
        query: decodedQuery
    })

    // console.log(movies)

    return (
        <main className='scroll-smooth min-h-[50vh] space-y-10 mt-10'>
            <MovieCollPagination
                movies={movies?.data}
                page={currentPage}
                totalPages={movies?.totalPages}
            />
        </main>
    )
}

export default SearchTestPage;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ title: string }>
}): Promise<Metadata> {

    const { title: dynamicTitle } = await params
    const decodedQuery = decodeURIComponent(dynamicTitle)

    return {
        title: `${decodedQuery}`,
        description: `Search results for ${decodedQuery}`,
    }
}