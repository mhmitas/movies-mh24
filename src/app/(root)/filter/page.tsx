import Filter from '@/components/shared/Filter'
import MovieCollPagination from '@/components/shared/MovieCollPagination'
import { getMovies } from '@/lib/actions/movies.actions'
import LoadingSpinner2 from '@/components/shared/spinners/LoadingSpinner2';
import React, { Suspense } from 'react'

// Cache filter page for 12 hours
export const revalidate = 43200;

// Separate async component for data fetching
const FilterMovieList = async ({ genre, type, currentPage }: { genre: string[]; type?: string; currentPage: number }) => {
    const movies = await getMovies({
        page: currentPage,
        limit: 36,
        query: "",
        type: type === "movies" ? "movie" : "series",
        genre
    })

    return (
        <MovieCollPagination
            movies={movies?.data}
            page={currentPage}
            totalPages={movies?.totalPages}
        />
    )
}

const FilterPage = async (props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
        genre?: string;
        type?: string;
    }>;
}) => {
    const searchParams = await props.searchParams;
    // const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const genre = searchParams?.genre?.split("+") || [];
    const type = searchParams?.type

    return (
        <section className='scroll-smooth space-y-10'>
            <div className='page-top-margin'>
                <Filter />
            </div>
            <Suspense fallback={<LoadingSpinner2 />}>
                <FilterMovieList genre={genre} type={type} currentPage={currentPage} />
            </Suspense>
        </section>
    )
}

export default FilterPage;


export const metadata = {
    title: "Filter Movies & Series | Movies MH24",
    description: "Browse and filter movies and series by genre, type, and more on Movies MH24.",
};