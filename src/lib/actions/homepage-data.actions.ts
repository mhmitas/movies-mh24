"use server"

import { MOVIE_PROJECTIONS } from "@/constants";
import { Embedded_Movie } from "../database/models/movie.model";
import { PipelineStage } from "mongoose";
import { connectDB } from "../database/mongoose";

// GET POPULAR MOVIES
export const getPopularMovies = async ({
    type,
    limit = 10,
    page = 1,

}: {
    type?: "movie" | "series",
    limit: number,
    page: number
}) => {
    try {
        await connectDB();

        const agg: PipelineStage[] = [
            // 1. Only keep docs with a valid rating & votes
            {
                $match: {
                    type,
                    "imdb.rating": { $exists: true, $ne: null },
                    "imdb.votes": { $exists: true, $gt: 0 }
                }
            },

            {
                $addFields: {
                    popularityScore: {
                        $add: [

                            { $multiply: ["$imdb.rating", 10] },
                            { $log10: "$imdb.votes" },
                        ]
                    }
                }
            },

            { $sort: { popularityScore: -1 } },

            {
                $project: {
                    ...MOVIE_PROJECTIONS,
                    popularityScore: 1
                }
            },

            { $limit: limit }
        ];


        const movies = await Embedded_Movie.aggregate(agg);

        return JSON.parse(JSON.stringify(movies));
    } catch (error) {
        throw new Error("Sorry! Failed to fetch popular movies | Please try again later.");
    }
}