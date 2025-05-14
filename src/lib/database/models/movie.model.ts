import mongoose, { model, models, Schema } from "mongoose";

const movieSchema = new Schema({
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

export const Movie = models.Movie || model('Movie', movieSchema);
