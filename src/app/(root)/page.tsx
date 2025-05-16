import { Footer } from '@/components/shared/Footer'
import MovieCollPagination from '@/components/shared/MovieCollPagination'
import { getMovies } from '@/lib/actions/movies.actions'
import React from 'react'

const Home = async (props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) => {

    const searchParams = await props.searchParams;
    // const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const movies = await getMovies({
        page: currentPage,
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
                page={currentPage}
                totalPages={movies?.totalPages}
            />
            <Footer />
        </section>
    )
}

export default Home