import React from 'react'
import MovieCard from './movieCard'
import { IMovie } from '@/lib/database/models/movie.model'

type MovieCollectionProps = {
    movies: IMovie[]
}

const MovieCollection = ({ movies }: MovieCollectionProps) => {
    return (
        <section className='my-container grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4'>
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