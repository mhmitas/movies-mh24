import ErrorBoundary from '@/components/shared/ErrorBoundary'
import MovieCollection from '@/components/shared/MovieCollection'
import { getPopularMovies } from '@/lib/actions/movies.actions'
import React from 'react'

const PopularMovies = async () => {

    const popularMovies = await getPopularMovies({ type: 'movie', limit: 12 })

    return (
        <div>
            <MovieCollection movies={popularMovies} />
        </div>
    )
}

export default PopularMovies;


function ErrorFallback({ error }: { error: Error }) {
    return (
        <div>
            <h2>Something went wrong</h2>
            <p>{error.message}</p>
        </div>
    );
}