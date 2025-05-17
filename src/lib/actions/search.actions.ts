"use server"

import { SearchOptionsParams } from "@/types";
import { connectDB } from "../database/mongoose";
import { Movie } from "../database/models/movie.model";
import { escapeRegExp } from "lodash";
import { MOVIE_PROJECTIONS } from "@/constants";


// SEARCH OPTION 2
export async function handleMovieSearch({ purpose, query, page = 1, limit }: SearchOptionsParams) {
    // Quick return on empty queries
    if (!query?.trim()) {
        return { data: [], totalPages: 0 };
    }

    await connectDB()

    const text = query.trim();
    const isSuggestions = purpose === 'suggestions';
    const perPage = limit ?? (isSuggestions ? 5 : 12);
    const currentPage = Math.max(1, page);
    const regex = new RegExp(escapeRegExp(text), 'i');

    const filter = { title: { $regex: regex } };

    // Choose projection fields
    const projection = isSuggestions
        ? { title: 1, poster: 1, year: 1, runtime: 1, type: 1 }
        : MOVIE_PROJECTIONS;

    // Build query
    let movieQuery = Movie.find(filter).select(projection).lean();
    if (isSuggestions) {
        movieQuery = movieQuery.limit(perPage);
    } else {
        const skip = (currentPage - 1) * perPage;
        movieQuery = movieQuery.skip(skip).limit(perPage);
    }

    // Execute fetch and count in parallel
    const [movies, totalCount] = await Promise.all([
        movieQuery.exec(),
        isSuggestions
            ? Promise.resolve(undefined)
            : Movie.countDocuments(filter),
    ]);
    return {
        data: JSON.parse(JSON.stringify(movies)),
        totalPages: isSuggestions ? 1 : Math.ceil((totalCount ?? 0) / perPage),
    };
}

// SEARCH OPTION 3's

// Common type for search parameters
type SearchBaseParams = {
    query: string;
    limit?: number;
    page?: number;
};

// Search suggestions specific function
export async function getMovieSuggestions({
    query,
    limit = 5
}: SearchBaseParams) {
    try {
        await connectDB();

        if (!query.trim()) return [];

        const safeQuery = escapeRegExp(query.trim());

        const suggestions = await Movie.find(
            { title: { $regex: `^${safeQuery}`, $options: "i" } },
            { title: 1, poster: 1, year: 1, type: 1 }
        )
            .sort({ year: -1, _id: 1 }) // Show recent first
            .limit(limit)
            .lean();

        return JSON.parse(JSON.stringify(suggestions));
    } catch (error) {
        throw error
    }
}

// Search results specific function
export async function getMovieSearchResults({
    query,
    page = 1,
    limit = 12
}: SearchBaseParams) {
    try {
        await connectDB();

        if (!query.trim()) {
            return { data: [], totalPages: 0 };
        }

        const safeQuery = escapeRegExp(query.trim());
        const skipAmount = (page - 1) * limit;

        const conditions: any = { title: { $regex: safeQuery, $options: "i" } }

        const [results, totalResults] = await Promise.all([
            Movie.find(
                conditions,
                MOVIE_PROJECTIONS
            )
                .sort({ _id: -1 }) // Default sorting
                .skip(skipAmount)
                .limit(limit)
                .lean(),

            Movie.countDocuments(conditions)
        ]);

        return {
            data: JSON.parse(JSON.stringify(results)),
            totalPages: Math.ceil(totalResults / limit)
        };
    } catch (error) {
        throw error
    }
}
