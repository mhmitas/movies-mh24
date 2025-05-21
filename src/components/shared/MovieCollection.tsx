import React from 'react'
import MovieCard from './movie-cards/movieCard'
import { IMovie } from '@/lib/database/models/movie.model'

type MovieCollectionProps = {
    movies: IMovie[]
}

const MovieCollection = ({ movies }: MovieCollectionProps) => {
    return (
        <section className='my-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-6'>
            {
                movies.map((movie, idx) => (
                    <MovieCard
                        key={idx}
                        {...movie} />
                ))
            }
        </section>
    )
}

export default MovieCollection