import ErrorBoundary from '@/components/shared/ErrorBoundary';
import MovieCollection from '@/components/shared/MovieCollection';
import { getMovies, getPopularMovies } from '@/lib/actions/movies.actions';
import React from 'react'
import PopularMovies from './home-components/PopularMovies';

const Home = async () => {

    const { data: movies } = await getMovies({ type: 'movie', limit: 10 })

    return (
        <div className='space-y-12 md:space-y-16 lg:space-y-20 mt-20'>
            <section>
                <h1 className='text-2xl lg:text-3xl font-medium my-container mb-5'>Popular</h1>
                <PopularMovies />
            </section>
            <section>
                <h1 className='text-2xl lg:text-3xl font-medium my-container mb-5'>Trending</h1>
                <MovieCollection movies={movies} />
            </section>
            <section>
                <h1 className='text-2xl lg:text-3xl font-medium my-container mb-5'>Latest</h1>
                <MovieCollection movies={movies} />
            </section>
        </div>
    )
}

export default Home;