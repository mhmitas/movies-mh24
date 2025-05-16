import MovieCollPagination from '@/components/shared/MovieCollPagination';
import { getMovies } from '@/lib/actions/movies.actions';
import React from 'react'

// const Search = async ({ params }: { params: Promise<{ id: string }> }) => {
const Search = async (props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
    params: Promise<{ id: string }>
}) => {
    const { id } = await props?.params;

    const searchParams = await props.searchParams;
    // const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const movies = await getMovies({
        page: currentPage,
        limit: 36,
        query: "",
        type: "",
        genre: []
    })

    return (
        <main className='mt-24'>
            <MovieCollPagination
                movies={movies?.data}
                page={currentPage}
                totalPages={movies?.totalPages}
            />
        </main>
    )
}

export default Search