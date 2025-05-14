import { Footer } from '@/components/shared/Footer'
import MovieCard from '@/components/shared/movieCard'
import { Button } from '@/components/ui/button'
import { getMovies } from '@/lib/actions/movies.actions'
import React from 'react'

const Home = async () => {

    const movies = await getMovies({ page: 1, limit: 16, query: "", type: "movie" })

    // console.log(movies.data)

    return (
        <section className=''>
            <div className='my-container grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4'>
                {
                    movies.data.map((movie: any) => (
                        <MovieCard
                            key={movie._id}
                            title={movie.title}
                            poster={movie.poster}
                            year={movie.year}
                            genres={movie.genres}
                            _id={movie._id} />
                    ))
                }
            </div>
            <Footer />
        </section>
    )
}

export default Home