"use server"

import { GetAllMoviesParams } from "@/types"
import { Movie } from "../database/models/movie.model"
import { connectDB } from "../database/mongoose"
import { escapeRegExp } from "lodash";
import { buildMovieQuery } from "../utils";


// Common query builder


// GET MOVIES
export const getMovies = async ({ page = 1, limit = 12, query, type, genre }: GetAllMoviesParams) => {
    try {
        await connectDB();

        const conditions = buildMovieQuery({ query, type, genre });
        const skipAmount = (Number(page) - 1) * limit;

        const projection = {
            title: 1,
            poster: 1,
            year: 1,
            genres: 1,
            type: 1,
            runtime: 1,
            imdb: 1,
            released: 1
        };

        const [movies, totalMovies] = await Promise.all([
            Movie.find(conditions, projection)
                .sort({ released: -1, _id: 1 })
                .skip(skipAmount)
                .limit(limit)
                .lean(),

            Movie.countDocuments(conditions)
        ]);

        return {
            data: JSON.parse(JSON.stringify(movies)),
            totalPages: Math.ceil(totalMovies / limit)
        };
    } catch (error) {
        throw error;
    }
};

// GET SEARCH SUGGESTIONS
export const getSearchSuggestions = async ({
    query,
    limit = 5
}: {
    query: string,
    limit: number

}) => {
    try {
        await connectDB()

        if (!query.trim()) return [];

        const conditions = {
            title: {
                $regex: `^${escapeRegExp(query)}`,
                $options: "i"
            }
        }

        const suggestions = await Movie
            .find(
                conditions,
                { title: 1, poster: 1, year: 1, runtime: 1, type: 1 }
            )
            .limit(limit)
            .lean()

        return JSON.parse(JSON.stringify(suggestions));
    } catch (error) {
        throw error;
    }
}

/* Just to audit the data
const hello = async () => {
    await connectDB()
    // const totalMovies = await Movie.countDocuments();
    // const totalSeries = await Movie.countDocuments({ type: "series" });

    const uniqueTypes = await Movie.distinct("type")

    console.log({ uniqueTypes })
}
hello() */

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