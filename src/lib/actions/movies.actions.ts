"use server"

import { GetAllMoviesParams } from "@/types"
import { Embedded_Movie, Movie } from "../database/models/movie.model"
import { connectDB } from "../database/mongoose"
import { buildMovieQuery } from "../utils";
import { MOVIE_PROJECTIONS } from "@/constants";
import { Types } from "mongoose";


// Common query builder


// GET MOVIES
export const getMovies = async ({ page = 1, limit = 12, type, genre }: GetAllMoviesParams) => {
    try {
        await connectDB();

        const conditions = buildMovieQuery({ type, genre });
        const skipAmount = (Number(page) - 1) * limit;

        const [movies, totalMovies] = await Promise.all([
            Movie.find(conditions, MOVIE_PROJECTIONS)
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
        throw new Error("Sorry! Failed to fetch movies | Please try again later.");
    }
};

// GET MOVIE BY ID
export const getMovieById = async (id: string) => {
    try {
        await connectDB();

        const movie = await Movie.findById(id).lean();

        return {
            data: JSON.parse(JSON.stringify(movie))
        };
    } catch (error) {
        throw new Error("This content is not available. It may have been removed or is temporarily offline.");
    }
}

// GET RECOMMENDED MOVIES BY PLOT
export const getRecommendedMoviesByPlot = async ({ id }: { id: string }) => {
    try {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error("Invalid movie ID");
        }

        await connectDB();

        const movie = await Movie.findById(id)

        // console.log("plot embedding", movie)

        if (!movie?.plot_embedding) {
            throw new Error("No recommendations found (actually plot not found)");
        }


        /* db.movies.aggregate([
            {
                "$vectorSearch": {
                    "index": "new_movies_vector_index",
                    "path": "plot_embedding",
                    "queryVector": [<array-of - numbers >],
                    "numCandidates": <number-of - candidates >,
                    "limit": <number-of - results >
                }
            }
        ])*/

        // VECTOR SEARCH
        const agg = [
            {
                $vectorSearch: {
                    index: 'new_movies_vector_index',
                    path: "plot_embedding",
                    queryVector: movie.plot_embedding,
                    numCandidates: 150,
                    limit: 11,
                }
            },
            {
                $project: {
                    plot: 1,
                    ...MOVIE_PROJECTIONS,
                    score: {
                        $meta: 'vectorSearchScore'
                    },
                }
            }
        ]

        const movies = await Movie.aggregate(agg);

        if (!movies?.length) {
            throw new Error("No recommendations found");
        }

        return JSON.parse(JSON.stringify(movies));
    } catch (error) {
        throw new Error(typeof error === 'object' && error instanceof Error
            ? error.message
            : "Sorry! Failed to fetch recommended movies | Please try again later.");
    }
}

// GET MOVIE BY IMDB ID from TMDB
export const getAdditionDataFromTmdb = async (imdbId: number) => {
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