import Filter from '@/components/shared/Filter'
import MovieCollPagination from '@/components/shared/MovieCollPagination'
import { getMovies } from '@/lib/actions/movies.actions'
import React from 'react'

const FilterPage = async (props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
        genre?: string;
        type?: string;
    }>;
}) => {

    const searchParams = await props.searchParams;
    // const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const genre = searchParams?.genre?.split("+") || [];
    const type = searchParams?.type

    const movies = await getMovies({
        page: currentPage,
        limit: 36,
        query: "",
        type: type === "movies" ? "movie" : "series",
        genre
    })

    // console.log(movies.data)

    return (
        <section className='scroll-smooth space-y-10'>
            <div className='mt-24'>
                <Filter />
            </div>
            <MovieCollPagination
                movies={movies?.data}
                page={currentPage}
                totalPages={movies?.totalPages}
            />
        </section>
    )
}

export default FilterPage
