import { model, models, Schema, Types } from "mongoose";

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
    fullplot_embedding?: number[];
    plot_embedding?: number[];
}

// Sub-schemas
const awardsSchema = new Schema({
    wins: Number,
    nominations: Number,
    text: String
});

const imdbSchema = new Schema({
    rating: Number,
    votes: Number,
    id: Number
});

const tomatoesViewerSchema = new Schema({
    rating: Number,
    numReviews: Number,
    meter: Number
});

const tomatoesSchema = new Schema({
    viewer: tomatoesViewerSchema,
    dvd: Date,
    lastUpdated: Date
});

// MOVIE SCHEMA
const movieSchema = new Schema({
    title: { type: String, required: true, unique: true },
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
    imdb: imdbSchema,
    metacritic: Number,
    awards: awardsSchema,
    tomatoes: tomatoesSchema,
    lastupdated: String,
    num_mflix_comments: Number,
    fullplot_embedding: { type: Buffer }
});


// EMBEDDED MOVIE SCHEMA
const embeddedMovieSchema = new Schema({
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
    imdb: imdbSchema,
    metacritic: Number,
    awards: awardsSchema,
    tomatoes: tomatoesSchema,
    lastupdated: String,
    num_mflix_comments: Number,
    plot_embedding: [Number]
});

// Create the MOVIE model
export const Movie = models.Movie || model<IMovie>('Movie', movieSchema);

// Create the EMBEDDED MOVIE model
export const Embedded_Movie = models.Embedded_Movie || model('Embedded_Movie', embeddedMovieSchema);