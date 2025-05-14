"use server"

import { GetAllMoviesParams } from "@/types"
import { Movie } from "../database/models/movie.model"
import { connectDB } from "../database/mongoose"


/* POPULATE MOVIE if needed
export const populateEvent = async (query) => {
    return query
        .populate({
            model: Movie, path: 'organizer', select: "name avatar"
        })
        .populate({
            model: Category, path: 'category', select: "name"
        })
}
 */

// GET MOVIES
export const getMovies = async ({ page = 1, limit = 12, query, type }: GetAllMoviesParams) => {
    try {
        await connectDB();

        const titleCondition = query ? { title: { $regex: query, $options: "i" } } : {};
        const typeCondition = type ? { type } : {};

        const movies = await Movie.find(
            { ...titleCondition, ...typeCondition },
            'title poster year genres'
        )
            .sort({ year: -1 })
            .limit(limit);

        return { data: JSON.parse(JSON.stringify(movies)), success: true };
    } catch (error) {
        throw error;
    }
};
