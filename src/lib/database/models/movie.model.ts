import mongoose, { model, models, Schema, Types } from "mongoose";

export interface IMovie extends Document {
    _id: Types.ObjectId;
    title: string;
    year?: number;
    rated?: string;
    released?: Date;
    runtime?: number;
    directors?: string[];
    writers?: string[];
    cast?: string[];
    genres?: string[];
    languages?: string[];
    countries?: string[];
    plot?: string;
    fullplot?: string;
    poster?: string;
    type?: string;
    imdb?: {
        rating?: number;
        votes?: number;
        id?: number;
    };
    metacritic?: number;
    awards?: {
        wins?: number;
        nominations?: number;
        text?: string;
    };
    tomatoes?: {
        critic?: {
            rating?: number;
            numReviews?: number;
            meter?: number;
        };
        viewer?: {
            rating?: number;
            numReviews?: number;
            meter?: number;
        };
        boxOffice?: string;
        production?: string;
        consensus?: string;
        website?: string;
        dvd?: Date;
        fresh?: number;
        rotten?: number;
        lastUpdated?: Date;
    };
    lastupdated?: string;
    num_mflix_comments?: number;
}

const movieSchema = new Schema<IMovie>({
    title: { type: String, required: true },
    year: Number,
    rated: String,
    released: Date,
    runtime: Number,
    directors: [String],
    writers: [String],
    cast: [String],
    genres: [String],
    languages: [String],
    countries: [String],
    plot: String,
    fullplot: String,
    poster: String,
    type: { type: String, default: 'movie' },
    imdb: {
        rating: Number,
        votes: Number,
        id: Number
    },
    metacritic: Number,
    awards: {
        wins: Number,
        nominations: Number,
        text: String
    },
    tomatoes: {
        critic: {
            rating: Number,
            numReviews: Number,
            meter: Number
        },
        viewer: {
            rating: Number,
            numReviews: Number,
            meter: Number
        },
        boxOffice: String,
        production: String,
        consensus: String,
        website: String,
        dvd: Date,
        fresh: Number,
        rotten: Number,
        lastUpdated: Date
    },
    lastupdated: String,
    num_mflix_comments: Number
});

export const Movie = models.Movie || model<IMovie>('Movie', movieSchema);
