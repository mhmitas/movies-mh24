import LoadingSpinner from '@/app/loading';
import Filter from '@/components/shared/Filter';
import MovieCollection from '@/components/shared/MovieCollection';
import { getMovies, getRecommendedMoviesByPlot } from '@/lib/actions/movies.actions';
import { Metadata } from 'next';
import React, { Suspense } from 'react'

const MoreSuggestionsPage = async (props: {
    searchParams?: Promise<{
        page?: string;
        title?: string;
    }>;
    params: Promise<{ id: string }>
}) => {
    const params = await props?.params;
    const id = await decodeURIComponent(params?.id)

    const searchParams = await props.searchParams;
    const title = await decodeURIComponent(searchParams?.title ?? "")
    // const currentPage = Number(searchParams?.page) || 1;

    const movies = await getRecommendedMoviesByPlot({
        id: id,
        limit: 36,
    })

    console.log(movies[0])

    return (
        <section className='scroll-smooth space-y-16 mb-10'>
            <div className='page-top-margin'>
                <Filter heading={`Similar to - ${title}`} />
            </div>
            <Suspense fallback={<LoadingSpinner />}>
                <MovieCollection
                    movies={movies}
                />
            </Suspense>
        </section>
    )
}

export default MoreSuggestionsPage;

export async function generateMetadata(props: {
    searchParams?: Promise<{
        title?: string;
    }>;
    params: Promise<{ id: string }>
}): Promise<Metadata> {

    const searchParams = await props.searchParams;
    const decodedQuery = decodeURIComponent(searchParams?.title ?? "")

    return {
        title: `${decodedQuery}`,
        description: `Search results for ${decodedQuery} Movies and TV Shows`,
    }
}