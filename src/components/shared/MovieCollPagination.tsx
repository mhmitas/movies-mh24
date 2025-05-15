import React from 'react'
import MovieCollection from './MovieCollection'
import { IMovie } from '@/lib/database/models/movie.model'
import Pagination from './Pagination'

type MovieCollectionProps = {
    movies: IMovie[],
    totalPages: number,
    page: number
}

const MovieCollPagination = ({ movies, totalPages, page }: MovieCollectionProps) => {
    return (
        <div className='space-y-10'>
            <Pagination page={page} totalPages={totalPages} urlParamName='page' />
            {/* collection niya kono jhamela korte chai na */}
            <MovieCollection movies={movies} />
        </div>
    )
}

export default MovieCollPagination