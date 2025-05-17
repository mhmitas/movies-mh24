"use server"

import { MOVIE_PROJECTIONS } from "@/constants";
import { Movie } from "../database/models/movie.model"
import { connectDB } from "../database/mongoose";

export async function autocompleteSearchTest({
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
        {
            $search: {
                autocomplete: {
                    path: "title",
                    query: query
                }
            }
        },
        { $limit: limit },
        { $project: MOVIE_PROJECTIONS }
    ]

    const movies = await Movie.aggregate(pipeline);

    return JSON.parse(JSON.stringify(movies))
}