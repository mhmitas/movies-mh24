import Filter from '@/components/shared/Filter'
import MovieCollPagination from '@/components/shared/MovieCollPagination'
import { getMovies } from '@/lib/actions/movies.actions'
import React from 'react'

const MoviesPage = async (props: {
    searchParams?: Promise<{
        page?: string;
    }>;
    params: Promise<{ type: string }>
}) => {

    const params = await props?.params;
    const searchParams = await props.searchParams;
    // const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const type = params?.type

    const movies = await getMovies({
        page: currentPage,
        limit: 36,
        type: type === "movies" ? "movie" : "series",
        genre: []
    })

    // console.log(movies.data)

    return (
        <section className='scroll-smooth space-y-10'>
            <div className='page-top-margin'>
                <Filter heading={`Browse Your Favorite ${type === "movies" ? "Movies" : "TV Shows"}`} />
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
