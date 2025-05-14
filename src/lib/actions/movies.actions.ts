"use server"

import { connected } from "process"
import { Movie } from "../database/models/movie.model"
import { connectDB } from "../database/mongoose"

// get movies
export const getMovies = async () => {
    try {
        await connectDB()
        const movies = await Movie.find().limit(10);
        console.log('movies:', movies)
    } catch (error) {
        throw error
    }
}