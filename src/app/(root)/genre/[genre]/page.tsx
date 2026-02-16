import Filter from '@/components/shared/Filter';
import MovieCollPagination from '@/components/shared/MovieCollPagination';
import LoadingSpinner2 from '@/components/shared/spinners/LoadingSpinner2';
import { getMovies } from '@/lib/actions/movies.actions';
import React, { Suspense } from 'react'

// Revalidate every 12 hours - genre pages don't change frequently
export const revalidate = 43200;

// Separate async component for data fetching
const GenreMovieList = async ({ genre, currentPage }: { genre: string; currentPage: number }) => {
    const movies = await getMovies({
        page: currentPage,
        limit: 36,
        genre: [genre]
    })

    return (
        <MovieCollPagination
            movies={movies?.data}
            page={currentPage}
            totalPages={movies?.totalPages}
        />
    )
}

const GenrePage = async (props: {
    searchParams?: Promise<{
        page?: string;
    }>;
    params: Promise<{ genre: string }>
}) => {
    const params = await props?.params;
    const decodedQuery = await decodeURIComponent(params?.genre)

    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <section className='scroll-smooth space-y-10'>
            <div className='page-top-margin'>
                <Filter heading={decodedQuery + " Movies & TV Shows"} />
            </div>
            <Suspense fallback={<LoadingSpinner2 />}>
                <GenreMovieList genre={decodedQuery} currentPage={currentPage} />
            </Suspense>
        </section>
    )
}

export default GenrePage;

