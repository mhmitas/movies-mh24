import { getRecommendedMoviesByPlot } from '@/lib/actions/movies.actions'
import React from 'react'
import MovieCard from './movie-cards/movieCard'
import { IMovie } from '@/lib/database/models/movie.model'
import { Button } from '../ui/button'
import Link from 'next/link'

const RecommendedMovies = async (
    {
        id,
        title
    }: {
        id: string,
        title?: string
    }
) => {

    const movies: IMovie[] = await getRecommendedMoviesByPlot({ id, limit: 11 })
    // const movies = data as 

    movies.shift()

    return (
        <div className='py-10'>
            <h1 className='text-2xl lg:text-3xl font-medium mb-5'>More Like This</h1>
            <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6'>
                {
                    movies.map((movie, idx) => (
                        <MovieCard
                            key={idx}
                            {...movie} />
                    ))
                }
            </section>
            {movies.length >= 10 && <div className='flex justify-center my-6'>
                <Button asChild>
                    <Link href={`/movie-details/more-suggestions/${id}?title=${encodeURIComponent(title ?? "")}`}>Show More</Link>
                </Button>
            </div>}
        </div>
    )
}

export default RecommendedMovies