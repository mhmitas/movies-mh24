"use server"

import { connectDB } from "../database/mongoose";
import { Movie } from "../database/models/movie.model";
import { PipelineStage } from "mongoose";
import { MOVIE_PROJECTIONS } from "@/constants";

const buildSearchStagePipeline = (query: string) => {
    const searchStage: PipelineStage = {
        $search: {
            index: "sample_mflix",
            compound: {
                should: [
                    {
                        autocomplete: {
                            query: query,
                            path: "title",
                        }
                    },
                    {
                        text: {
                            query: query,
                            path: "titleExact",
                            score: { boost: { value: 5 } } // Exact matches get 5x boost
                        }
                    }
                ]
            }
        }
    }
    return searchStage
}


export async function handleMovieSearch({
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
        buildSearchStagePipeline(query),
        {
            $facet: {
                data: [
                    {
                        $project: {
                            ...MOVIE_PROJECTIONS,
                            score: { $meta: "searchScore" }
                        }
                    },
                    { $skip: skip },
                    { $limit: limit },
                ],
                totalCount: [
                    { $count: "count" }
                ]
            }
        }
    ];

    const results = await Movie.aggregate(pipeline).exec();

    const { data, totalCount } = results[0];
    const count = totalCount[0]?.count ?? data.length;

    return {
        data: JSON.parse(JSON.stringify(data)),
        totalPages: Math.ceil(count / limit),
    };
}


export async function getSearchSuggestions({
    query,
    limit = 5
}: {
    query: string,
    limit: number
}) {
    if (!query?.trim()) {
        return { data: [], totalPages: 0 };
    }

    await connectDB()

    const pipeline = [
        buildSearchStagePipeline(query),
        { $limit: limit },
        {
            $project: {
                title: 1,
                poster: 1,
                year: 1,
                runtime: 1,
                type: 1,
                score: { $meta: "searchScore" }
            }
        }
    ]

    const movies = await Movie.aggregate(pipeline).exec();

    return JSON.parse(JSON.stringify(movies))
}