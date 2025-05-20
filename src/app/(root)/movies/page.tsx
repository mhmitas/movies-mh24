import Filter from '@/components/shared/Filter'
import MovieCollPagination from '@/components/shared/MovieCollPagination'
import { getMovies } from '@/lib/actions/movies.actions'
import React from 'react'

const MoviesPage = async (props: {
    searchParams?: Promise<{
        page?: string;
    }>;
}) => {

    const searchParams = await props.searchParams;
    // const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const movies = await getMovies({
        page: currentPage,
        limit: 36,
        type: "movie",
        genre: []
    })

    // console.log(movies.data)

    return (
        <section className='scroll-smooth space-y-10'>
            <div className='mt-24'>
                <Filter heading='Popular Movies' />
            </div>
            <MovieCollPagination
                movies={movies?.data}
                page={currentPage}
                totalPages={movies?.totalPages}
            />
        </section>
    )
}

export default MoviesPage
