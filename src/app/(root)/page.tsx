import { Footer } from '@/components/shared/Footer'
import MovieCollection from '@/components/shared/MovieCollection'
import { getMovies } from '@/lib/actions/movies.actions'
import React from 'react'

const Home = async () => {

    const movies = await getMovies({ page: 1, limit: 16, query: "", type: "movie" })

    // console.log(movies.data)

    return (
        <section className=''>
            <div className='pt-32'></div>
            <MovieCollection movies={movies?.data} />
            <Footer />
        </section>
    )
}

export default Home