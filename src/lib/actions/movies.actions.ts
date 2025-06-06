"use server"

import { GetAllMoviesParams } from "@/types"
import { Movie } from "../database/models/movie.model"
import { connectDB } from "../database/mongoose"
import { buildMovieQuery } from "../utils";
import { MOVIE_PROJECTIONS } from "@/constants";
import { Types } from "mongoose";

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
    } catch (error: any) {
        // console.log(error)
        throw new Error(error.message);
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
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getMovieByIdForMetaData(id: string) {
    try {
        await connectDB();

        const movie = await Movie.findById(id, { plot: 1, title: 1, year: 1, genres: 1, poster: 1 }).lean();

        if (!movie) {
            throw new Error("Movie not found");
        }

        return movie
    } catch (error: any) {
        throw new Error(error.message);
    }
}

// GET RECOMMENDED MOVIES BY PLOT
export const getRecommendedMoviesByPlot = async ({ id, limit = 12, page = 1 }: { id: string, limit: number, page?: number }) => {
    try {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error("Invalid movie ID");
        }

        await connectDB();


        const movie = await Movie.findById(id, { overview_embedding: 1, _id: 0 });

        // const buffer = Buffer.from(array);
        // const convertedBuffer = new BSON.Binary(buffer);
        const queryField = movie?.overview_embedding
        // console.log("🍿🍿:", queryField)
        if (!queryField) {
            throw new Error("No recommendations found (actually plot not found)");
        }

        // VECTOR SEARCH
        const agg = [
            {
                $vectorSearch: {
                    // index: 'new_movies_vector_index',
                    // path: "fullplot_embedding",
                    index: 'mflix_overview_vector_index',
                    path: "overview_embedding",
                    queryVector: queryField,
                    numCandidates: 150,
                    // skip: 10,
                    limit: limit,
                }
            },
            {
                $project: {
                    ...MOVIE_PROJECTIONS,
                    "paginationToken": { "$meta": "searchSequenceToken" },
                    "score": { "$meta": "searchScore" }
                }
            }
        ]

        const movies = await Movie.aggregate(agg);

        if (!movies?.length) {
            throw new Error("No recommendations found");
        }

        return JSON.parse(JSON.stringify(movies));
    } catch (error) {
        throw new Error(
            error instanceof Error
                ? error.message
                : "Failed to fetch recommendations"
        );
    }
}

// GET MOVIE BY IMDB ID from TMDB
export const getAdditionDataFromTmdb = async (imdbId: number) => {
    try {
        const url = `https://api.themoviedb.org/3/find/tt0068646?api_key=${process.env.TMDB_API_KEY}&external_source=imdb_id`

        const tmdbRes = await fetch(url, { cache: 'force-cache' })
        const data = await tmdbRes.json();

        const srcArr = data.movie_results[0] || data.tv_results[0] || data.person_results[0] || data.tv_episode_results[0] || data.tv_season_results[0]

        console.log({ srcArr })

        const posterPath = srcArr?.poster_path;
        const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
        return { posterUrl }
    } catch (error) {
        throw error;
    }
}