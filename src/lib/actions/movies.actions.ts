"use server"

import { GetAllMoviesParams } from "@/types"
import { Movie } from "../database/models/movie.model"
import { connectDB } from "../database/mongoose"

// GET MOVIES
export const getMovies = async ({ page = 1, limit = 12, query, type, genre }: GetAllMoviesParams) => {
    try {
        await connectDB();

        const titleCondition = query ? { title: { $regex: query, $options: "i" } } : {};
        const typeCondition = type ? { type } : {};
        const genreCondition =
            Array.isArray(genre) && genre.length > 0
                ? { genres: { $in: genre } }
                : {};

        const skipAmount = (Number(page) - 1) * limit

        const filterConditions = {
            ...titleCondition,
            ...typeCondition,
            ...genreCondition,
        };

        const movies = await Movie.find(
            { ...filterConditions },
            'title poster year genres type runtime imdb genres'
        )
            .sort({ released: 'desc', _id: 'asc' })
            .skip(skipAmount)
            .limit(limit);

        const totalMovies = await Movie.countDocuments({ ...titleCondition, ...typeCondition })

        return {
            data: JSON.parse(JSON.stringify(movies)),
            totalPages: Math.ceil(totalMovies / limit)
        };
    } catch (error) {
        throw error;
    }
};

// GET MOVIE BY ID
export const getMovieById = async (id: string) => {
    try {
        await connectDB();

        const movie = await Movie.findById(id);
        if (!movie) {
            throw new Error("Movie not found");
        }
        return {
            data: JSON.parse(JSON.stringify(movie))
        };
    } catch (error) {
        throw error;
    }
}

// GET MOVIE BY IMDB ID from TMDB
export const getAdditionDataFromTmdb = async (imdbId: string) => {
    try {

        const tmdbRes = await fetch(`https://api.themoviedb.org/3/find/tt${imdbId}?api_key=${process.env.TMDB_API_KEY}&external_source=imdb_id`, { cache: 'force-cache' })

        const data = await tmdbRes.json();
        const posterPath = data.movie_results?.[0]?.poster_path;
        const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
        return { posterUrl }
    } catch (error) {
        throw error;
    }
}