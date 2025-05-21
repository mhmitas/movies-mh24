import MovieCollPagination from '@/components/shared/MovieCollPagination';
import { handleMovieSearchTest } from '@/lib/actions/test.actions';
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

    const movies = await handleMovieSearchTest({
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