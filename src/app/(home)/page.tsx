import MovieCollection from '@/components/shared/MovieCollection';
import { getMovies } from '@/lib/actions/movies.actions';
import React from 'react'

const Home = async () => {

    const movies = await getMovies({
        limit: 12,
        type: 'movie',
        genre: []
    })

    return (
        <div className='space-y-12 md:space-y-16 lg:space-y-20'>
            <section>
                <h1 className='text-2xl lg:text-3xl font-medium my-container mb-5'>Trending</h1>
                <MovieCollection movies={movies.data} />
            </section>
            <section>
                <h1 className='text-2xl lg:text-3xl font-medium my-container mb-5'>Latest</h1>
                <MovieCollection movies={movies.data} />
            </section>
            <section>
                <h1 className='text-2xl lg:text-3xl font-medium my-container mb-5'>Popular</h1>
                <MovieCollection movies={movies.data} />
            </section>
        </div>
    )
}

export default Home;