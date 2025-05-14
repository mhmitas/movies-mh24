import React from 'react'
import MovieCard from './movieCard'
import { IMovie } from '@/lib/database/models/movie.model'

type MovieCollectionProps = {
    movies: IMovie[]
}

const MovieCollection = ({ movies }: MovieCollectionProps) => {
    return (
        <section className='my-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-6'>
            {
                movies.map((movie, idx) => (
                    <MovieCard
                        key={idx}
                        title={movie.title}
                        poster={movie.poster}
                        year={movie.year}
                        genres={movie.genres}
                        _id={movie._id} />
                ))
            }
        </section>
    )
}

export default MovieCollection