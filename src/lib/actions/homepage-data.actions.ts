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

        const skip = (Math.max(1, page) - 1) * limit;

        const agg: PipelineStage[] = [
            {
                $match: {
                    type,
                    "imdb.rating": { $exists: true, $ne: null },
                    "imdb.votes": { $exists: true, $gt: 1 }
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
            {
                $facet: {
                    data: [
                        { $sort: { popularityScore: -1 } },
                        { $skip: skip },
                        { $limit: limit },
                        { $project: { ...MOVIE_PROJECTIONS } }
                    ],
                    totalCount: [
                        {
                            $count: "count"
                        }
                    ]
                }
            }
        ];


        const results = await Embedded_Movie.aggregate(agg).exec();

        const { data, totalCount } = results[0];
        const count = totalCount[0]?.count ?? data.length;

        return {
            data: JSON.parse(JSON.stringify(data)),
            totalPages: Math.ceil(count / limit),
        };
    } catch (error) {
        throw new Error("Sorry! Failed to fetch popular movies | Please try again later.");
    }
}