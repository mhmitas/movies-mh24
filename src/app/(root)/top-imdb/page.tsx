import Filter from '@/components/shared/Filter';
import MovieCollPagination from '@/components/shared/MovieCollPagination';
import { getPopularMovies } from '@/lib/actions/homepage-data.actions';
import LoadingSpinner2 from '@/components/shared/spinners/LoadingSpinner2';
import React, { Suspense } from 'react'

// Cache top IMDB page for 24 hours
export const revalidate = 86400;

// Separate async component for data fetching
const TopImdbMovieList = async ({ type, currentPage }: { type: string; currentPage: number }) => {
    const movies = await getPopularMovies({
        page: currentPage,
        limit: 36,
        type: type === "movies" ? "movie" : "series",
    })

    return (
        <MovieCollPagination
            movies={movies?.data}
            page={currentPage}
            totalPages={movies?.totalPages}
        />
    )
}

const TopImdbPage = async (props: {
    searchParams?: Promise<{
        page?: string;
        type?: string;
    }>;
}) => {
    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams?.page) || 1;
    const type = searchParams?.type || "movies";

    return (
        <section className='scroll-smooth space-y-10'>
            <div className='page-top-margin'>
                <Filter heading={`Top IMDB ${type === "movies" ? "Movies" : "TV Shows"}`} />
            </div>
            <Suspense fallback={<LoadingSpinner2 />}>
                <TopImdbMovieList type={type} currentPage={currentPage} />
            </Suspense>
        </section>
    )
}

export default TopImdbPage