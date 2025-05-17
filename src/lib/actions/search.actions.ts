"use server"

import { connectDB } from "../database/mongoose";
import { Movie } from "../database/models/movie.model";
import { escapeRegExp } from "lodash";
import { MOVIE_PROJECTIONS } from "@/constants";
import { Document, PipelineStage } from "mongoose";

export async function handleMovieSearch({
    purpose,   // 'suggestions' | 'full'
    query,     // string
    page = 1,  // number, 1-based
    limit,     // optional override
}: {
    purpose: "suggestions" | "full";
    query: string;
    page?: number;
    limit?: number;
}) {
    if (!query?.trim()) {
        return { data: [], totalPages: 0 };
    }

    await connectDB();
    const text = query.trim();
    const isSug = purpose === "suggestions";
    const perPage = limit ?? (isSug ? 5 : 12);
    const skip = isSug ? 0 : (Math.max(1, page) - 1) * perPage;

    // 1) Build your $match stage: first try text-search
    const textMatch = { $text: { $search: text } };
    // Optionally, build a regex fallback:
    const regex = { title: { $regex: `^${escapeRegExp(text)}`, $options: "i" } };

    // 2) Build projection of fields + score
    const baseProj = isSug
        ? { title: 1, poster: 1, year: 1, runtime: 1, type: 1 }
        : MOVIE_PROJECTIONS;
    const projectStage = {
        $project: {
            score: { $meta: "textScore" },
            ...baseProj
        }
    };

    // 3) Aggregation pipeline with a $facet
    const pipeline: PipelineStage[] = [
        { $match: textMatch },
        { $sort: { score: { $meta: "textScore" } } },
        projectStage,
        {
            $facet: {
                data: [
                    { $skip: skip },
                    { $limit: perPage }
                ],
                totalCount: [
                    { $count: "count" }
                ]
            }
        }
    ];

    let aggResult = await Movie.aggregate(pipeline).exec();

    // 4) If you want to fall back to regex when text returns zero:
    if (!isSug && aggResult[0].totalCount.length === 0) {
        // try regex match instead
        const fallbackPipeline = [
            { $match: regex },
            projectStage,
            {
                $facet: {
                    data: [
                        { $skip: skip },
                        { $limit: perPage }
                    ],
                    totalCount: [{ $count: "count" }]
                }
            }
        ];
        aggResult = await Movie.aggregate(fallbackPipeline).exec();
    }

    const { data, totalCount } = aggResult[0];
    const count = totalCount[0]?.count ?? data.length;

    return {
        data,
        totalPages: isSug ? 1 : Math.ceil(count / perPage),
    };
}
