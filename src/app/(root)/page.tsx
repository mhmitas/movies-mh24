import { getMovies } from '@/lib/actions/movies.actions'
import React from 'react'

const Home = async () => {

    const movies = await getMovies()

    return (
        <div>page</div>
    )
}

export default Home