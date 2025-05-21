"use server"

import { GetAllMoviesParams } from "@/types"
import { Embedded_Movie, Movie } from "../database/models/movie.model"
import { connectDB } from "../database/mongoose"
import { escapeRegExp } from "lodash";
import { buildMovieQuery } from "../utils";
import { MOVIE_PROJECTIONS } from "@/constants";


// Common query builder


// GET MOVIES
export const getMovies = async ({ page = 1, limit = 12, type, genre }: GetAllMoviesParams) => {
    try {
        await connectDB();

        const conditions = buildMovieQuery({ type, genre });
        const skipAmount = (Number(page) - 1) * limit;

        const [movies, totalMovies] = await Promise.all([
            Embedded_Movie.find(conditions, MOVIE_PROJECTIONS)
                .sort({ released: -1, _id: 1 })
                .skip(skipAmount)
                .limit(limit)
                .lean(),

            Embedded_Movie.countDocuments(conditions)
        ]);

        return {
            data: JSON.parse(JSON.stringify(movies)),
            totalPages: Math.ceil(totalMovies / limit)
        };
    } catch (error) {
        throw new Error("Sorry! Failed to fetch movies | Please try again later.");
    }
};

// GET MOVIE BY ID
export const getMovieById = async (id: string) => {
    try {
        await connectDB();

        const movie = await Embedded_Movie.findById(id);
        if (!movie) {
            throw new Error("This content is not available. It may have been removed or is temporarily offline.");
        }
        return {
            data: JSON.parse(JSON.stringify(movie))
        };
    } catch (error) {
        throw error;
    }
}

// GET RECOMMENDED MOVIES BY PLOT
export const getRecommendedMoviesByPlot = async ({ plot_embedding }: { plot_embedding: number[] }) => {
    try {
        await connectDB();
        const agg = [
            {
                $vectorSearch: {
                    index: 'mflix_vector_index',
                    path: "plot_embedding",
                    queryVector: plot_embedding,
                    numCandidates: 150,
                    limit: 10
                }
            },
            {
                $project: {
                    _id: 0,
                    plot: 1,
                    ...MOVIE_PROJECTIONS,
                    score: {
                        $meta: 'vectorSearchScore'
                    }
                }
            }
        ]

        const movies = await Embedded_Movie.aggregate(agg);
        return JSON.parse(JSON.stringify(movies));
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