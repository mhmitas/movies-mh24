import MovieCard from '@/components/shared/movieCard'
import { getMovies } from '@/lib/actions/movies.actions'
import React from 'react'

const Home = async () => {

    const movies = await getMovies({ page: 1, limit: 4, query: "", type: "movie" })

    // console.log(movies.data)

    return (
        <div>
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
    )
}

export default Home