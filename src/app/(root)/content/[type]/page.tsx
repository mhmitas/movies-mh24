import Filter from '@/components/shared/Filter'
import MovieCollPagination from '@/components/shared/MovieCollPagination'
import { getMovies } from '@/lib/actions/movies.actions'
import LoadingSpinner2 from '@/components/shared/spinners/LoadingSpinner2';
import React, { Suspense } from 'react'

// Cache content type pages for 12 hours
export const revalidate = 43200;

// Separate async component for data fetching
const ContentMovieList = async ({ type, currentPage }: { type: string; currentPage: number }) => {
    const movies = await getMovies({
        page: currentPage,
        limit: 36,
        type: type === "movies" ? "movie" : "series",
        genre: []
    })

    return (
        <MovieCollPagination
            movies={movies?.data}
            page={currentPage}
            totalPages={movies?.totalPages}
        />
    )
}

const MoviesPage = async (props: {
    searchParams?: Promise<{
        page?: string;
    }>;
    params: Promise<{ type: string }>
}) => {
    const params = await props?.params;
    const searchParams = await props.searchParams;
    // const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const type = params?.type

    return (
        <section className='scroll-smooth space-y-10'>
            <div className='page-top-margin'>
                <Filter heading={`Browse Your Favorite ${type === "movies" ? "Movies" : "TV Shows"}`} />
            </div>
            <Suspense fallback={<LoadingSpinner2 />}>
                <ContentMovieList type={type} currentPage={currentPage} />
            </Suspense>
        </section>
    )
}

export default MoviesPage
