import { Footer } from '@/components/shared/Footer'
import MovieCollPagination from '@/components/shared/MovieCollPagination'
import { getMovies } from '@/lib/actions/movies.actions'
import { SearchParamProps } from '@/types'
import React from 'react'

const Home = async ({ searchParams }: SearchParamProps) => {

    const { page } = await searchParams

    const pageNumber = Number(page) || 1;
    // const searchText = await (searchParams?.searchText as string) || "";

    const movies = await getMovies({
        page: pageNumber,
        limit: 24,
        query: "",
        type: "movie"
    })

    // console.log(movies.data)

    return (
        <section className=''>
            <div className='pt-24'></div>
            <MovieCollPagination
                movies={movies?.data}
                page={pageNumber}
                totalPages={movies?.totalPages}
            />
            <Footer />
        </section>
    )
}

export default Home