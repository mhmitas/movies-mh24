import LoadingSpinner from '@/app/loading';
import Filter from '@/components/shared/Filter';
import MovieCollPagination from '@/components/shared/MovieCollPagination';
import { getMovies } from '@/lib/actions/movies.actions';
import { Metadata } from 'next';
import React, { Suspense } from 'react'

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

    const movies = await getMovies({
        page: currentPage,
        limit: 36,
        type: "",
        genre: [decodedQuery]
    })

    return (
        <section className='scroll-smooth space-y-10'>
            <div className='mt-24'>
                <Filter heading={decodedQuery + " Movies & TV Shows"} />
            </div>
            <Suspense fallback={<LoadingSpinner />}>
                <MovieCollPagination
                    movies={movies?.data}
                    page={currentPage}
                    totalPages={movies?.totalPages}
                />
            </Suspense>
        </section>
    )
}

export default GenrePage;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ genre: string }>
}): Promise<Metadata> {

    const { genre: dynamicTitle } = await params
    const decodedQuery = decodeURIComponent(dynamicTitle)

    return {
        title: `${decodedQuery} Movies & TV Shows`,
        description: `Search results for ${decodedQuery} Movies and TV Shows`,
    }
}