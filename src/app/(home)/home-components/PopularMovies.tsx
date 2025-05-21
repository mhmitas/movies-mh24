import MovieCollection from '@/components/shared/MovieCollection'
import { getPopularMovies } from '@/lib/actions/homepage-data.actions'
import React from 'react'

const PopularMovies = async ({ type }: { type: "movie" | "series" }) => {

    const { data: movies } = await getPopularMovies({ type, limit: 12, page: 1 })

    return (
        <div>
            <MovieCollection movies={movies} />
        </div>
    )
}

export default PopularMovies;