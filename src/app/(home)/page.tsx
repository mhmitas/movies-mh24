import ErrorBoundary from '@/components/shared/ErrorBoundary';
import MovieCollection from '@/components/shared/MovieCollection';
import { getMovies } from '@/lib/actions/movies.actions';
import React from 'react'
import PopularMovies from './home-components/PopularMovies';
import Head from 'next/head';
import LoadingSpinner2 from '@/components/shared/spinners/LoadingSpinner2';
import LoadingSpinner from '@/components/shared/spinners/LoadingSpinner';

const Home = async () => {

    return <LoadingSpinner2 />
    // return <LoadingSpinner />

    const { data: latestMovies } = await getMovies({ type: 'movie', limit: 12 })
    const { data: latestSeries } = await getMovies({ type: 'series', limit: 12 })

    return (
        <>
            <Head>
                <title>Movies MH24</title>
                <meta name="description" content="Discover and explore movies by genre, year, and more." />
                <meta name="keywords" content="movies, genres, movie app, nextjs, film explorer" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://www.yourdomain.com/current-page" />
            </Head>
            <div className='space-y-12 md:space-y-16 lg:space-y-20 mt-20'>
                <section>
                    <h1 className='text-2xl lg:text-3xl font-medium my-container mb-5'>Popular Movies</h1>
                    <ErrorBoundary message='Something went wrong.'>
                        <PopularMovies type='movie' />
                    </ErrorBoundary>
                </section>
                <section>
                    <h1 className='text-2xl lg:text-3xl font-medium my-container mb-5'>Popular TV Shows</h1>
                    <ErrorBoundary message='Something went wrong.'>
                        <PopularMovies type='series' />
                    </ErrorBoundary>
                </section>
                <section>
                    <h1 className='text-2xl lg:text-3xl font-medium my-container mb-5'>Latest Movies</h1>
                    <MovieCollection movies={latestMovies} />
                </section>
                <section>
                    <h1 className='text-2xl lg:text-3xl font-medium my-container mb-5'>Latest TV Shows</h1>
                    <MovieCollection movies={latestSeries} />
                </section>
            </div>
        </>
    )
}

export default Home;