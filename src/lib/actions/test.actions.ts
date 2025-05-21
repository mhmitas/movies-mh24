"use server"

import { MOVIE_PROJECTIONS } from "@/constants";
import { Embedded_Movie, Movie } from "../database/models/movie.model"
import { connectDB } from "../database/mongoose";
import { PipelineStage } from "mongoose";

export async function handleMovieSearchTest({
    query,
    page = 1,
    limit = 12,
}: {
    query: string;
    page?: number;
    limit?: number;
}) {
    if (!query?.trim()) {
        return { data: [], totalPages: 0 };
    }

    await connectDB();
    const text = query.trim();
    // const isSuggestions = purpose === "suggestions";
    const skip = (Math.max(1, page) - 1) * limit;

    // Aggregation pipeline with a $facet
    const pipeline: PipelineStage[] = [
        {
            $search: {
                index: "sample_mflix",
                autocomplete: {
                    path: "title",
                    query: query
                }
            }
        },
        {
            $facet: {
                data: [
                    { $project: MOVIE_PROJECTIONS },
                    { $skip: skip },
                    { $limit: limit },
                ],
                totalCount: [
                    { $count: "count" }
                ]
            }
        }
    ];

    const results = await Embedded_Movie.aggregate(pipeline).exec();

    const { data, totalCount } = results[0];
    const count = totalCount[0]?.count ?? data.length;

    return {
        data: JSON.parse(JSON.stringify(data)),
        totalPages: Math.ceil(count / limit),
    };
}