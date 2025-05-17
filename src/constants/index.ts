// lib/constants/genres.ts

import { NavItemProps } from "@/types";

export const GENRES = [
    'Action',
    'Adventure',
    'Comedy',
    'Crime',
    'Drama',
    'Fantasy',
    'Horror',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Thriller',
    'War',
    'Western',
    'Animation',
    'Biography',
    'Family',
    'History',
    'Music',
    'Sport',
];

export const TYPES = [
    { value: "", label: "All" },
    { value: "movie", label: "Movie" },
    { value: "series", label: "Series" }
];

export const NAV_ITEMS: NavItemProps[] = [
    { id: "home", label: "Home", href: "/" },
    { id: "favorites", label: "Favorites", href: "/favorites" },
    { id: "movies", label: "Movies", href: "/movies" },
    { id: "tvshows", label: "TV Shows", href: "/tvshows" },
];

export const MOVIE_PROJECTIONS = {
    title: 1,
    poster: 1,
    year: 1,
    genres: 1,
    type: 1,
    runtime: 1,
    imdb: 1,
    released: 1
};