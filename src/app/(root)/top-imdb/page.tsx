import Filter from '@/components/shared/Filter';
import MovieCollPagination from '@/components/shared/MovieCollPagination';
import { getPopularMovies } from '@/lib/actions/homepage-data.actions';
import React from 'react'

const TopImdbPage = async (props: {
    searchParams?: Promise<{
        page?: string;
        type?: string;
    }>;
}) => {

    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams?.page) || 1;
    const type = searchParams?.type || "movies";

    const movies = await getPopularMovies({
        page: currentPage,
        limit: 36,
        type: type === "movies" ? "movie" : "series",
    })

    return (
        <section className='scroll-smooth space-y-10'>
            <div className='page-top-margin'>
                <Filter heading={`Top IMDB ${type === "movies" ? "Movies" : "TV Shows"}`} />
            </div>
            <MovieCollPagination
                movies={movies?.data}
                page={currentPage}
                totalPages={movies?.totalPages}
            />
        </section>
    )
}

export default TopImdbPage