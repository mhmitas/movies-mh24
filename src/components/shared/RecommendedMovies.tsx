import { getRecommendedMoviesByPlot } from '@/lib/actions/movies.actions'
import React from 'react'
import MovieCollection from './MovieCollection'
import MovieCard from './movie-cards/movieCard'
import { IMovie } from '@/lib/database/models/movie.model'

const RecommendedMovies = async (
    {
        plot_embedding
    }: {
        plot_embedding: number[]
    }
) => {

    const movies: IMovie[] = await getRecommendedMoviesByPlot({ plot_embedding })

    return (
        <div className='py-10'>
            <h1 className='text-2xl lg:text-3xl font-medium mb-5'>More Like This</h1>
            <section className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6'>
                {
                    movies.map((movie, idx) => (
                        <MovieCard
                            key={idx}
                            {...movie} />
                    ))
                }
            </section>
        </div>
    )
}

export default RecommendedMovies