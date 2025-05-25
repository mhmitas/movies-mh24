// app/api/sitemap-movies/route.ts
import { Movie } from '@/lib/database/models/movie.model'
import { connectDB } from '@/lib/database/mongoose'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const url = new URL(req.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = parseInt(url.searchParams.get('limit') || '1000', 10)

    await connectDB()

    const skip = (page - 1) * limit
    // only fetch _id
    const movies: { _id: any }[] = await Movie.find({}, { _id: 1 })
        .sort({ released: -1, _id: 1 })
        .skip(skip)
        .limit(limit)
        .lean()

    // determine if there are more pages
    const totalCount = await Movie.countDocuments()
    const hasMore = skip + movies.length < totalCount

    // return IDs and hasMore flag
    return NextResponse.json({
        movies: movies.map((m) => ({ id: m._id.toString() })),
        hasMore,
    })
}
