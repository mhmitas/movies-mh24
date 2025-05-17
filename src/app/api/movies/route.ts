import { Movie } from "@/lib/database/models/movie.model";
import { connectDB } from "@/lib/database/mongoose";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const searchParams = request.nextUrl.searchParams;

        // Validate and set pagination parameters
        let limit = Math.min(Number(searchParams.get('limit')) || 10, 100);
        limit = Math.max(1, limit); // Ensure at least 1

        let skipAmount = Math.max(0, Number(searchParams.get("skip")) || 0);

        const movies = await Movie.find()
            .sort({ _id: "desc" })
            .skip(skipAmount)
            .limit(limit)
            .lean();

        return new Response(JSON.stringify(movies), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}