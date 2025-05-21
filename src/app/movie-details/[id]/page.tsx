import { Badge } from '@/components/ui/badge';
import { getAdditionDataFromTmdb, getMovieById } from '@/lib/actions/movies.actions';
import { formatDuration } from '@/lib/utils';
import React, { Suspense } from 'react'
import { FaCheck, FaHeart, FaPlay, FaStar } from 'react-icons/fa6';
import MovieMetadata, { MovieActionButton } from './movie-detail-page-components';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import PosterImage from '@/components/shared/MoviePoster';
import RecommendedMovies from '@/components/shared/RecommendedMovies';
import LoadingSpinner from '../loading';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { IMovie } from '@/lib/database/models/movie.model';
import { Skeleton } from '@/components/ui/skeleton';
import MovieCardSkeleton from '@/components/shared/movie-cards/MovieCardSkeleton';

const MovieDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const { data: movie }: { data: IMovie } = await getMovieById(id);
    // console.log(movie)

    let moviePosterUrl = movie?.poster;
    // Check if the poster is available
    if (!moviePosterUrl && movie?.imdb?.id) {
        try {
            const { posterUrl } = await getAdditionDataFromTmdb(movie?.imdb?.id);
            moviePosterUrl = posterUrl || "/images/poster-placeholder.svg";
        } catch {
            moviePosterUrl = "/images/poster-placeholder.svg";
        }
    }

    // Final fallback if nothing worked
    if (!moviePosterUrl) {
        moviePosterUrl = "/images/poster-placeholder.svg";
    }

    return (
        <main className='text-foreground/90'>
            {/* backgroud image */}
            <div className='fixed inset-0 -z-20'>
                <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${moviePosterUrl})` }}></div>
                <div className='absolute inset-0 bg-gradient-to-r from-background via-background/50 to-background z-0'></div>
            </div>
            {/* detail page wrapper container */}
            <div className='mt-48 text-sm lg:text-base bg-background min-h-screen'>
                {/* detail page primary container */}
                <div className='bg-muted relative'>
                    {/* info container (title, ...) */}
                    <div className='flex justify-between items-center py-6 pl-[32.45vw] pr-[2%]'>
                        <div className='space-y-2'>
                            <h1 className='text-xl lg:text-2xl font-bold line-clamp-1'>{movie?.title}</h1>
                            <div className='flex items-center gap-4'>
                                <span>{movie?.year}</span>
                                <span>{formatDuration(movie?.runtime || 0)}</span>
                                {movie?.rated && <Badge variant={'outline'}>{movie?.rated}</Badge>}
                                <div className='flex items-center gap-1'>
                                    <FaStar className='inline text-yellow-500' />
                                    <span>{movie?.imdb?.rating || "N/A"}</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-wrap items-center'>
                            <MovieActionButton icon={<FaPlay />} />
                            <MovieActionButton icon={<FaCheck />} />
                            <MovieActionButton icon={<FaHeart />} />
                            <Link href={`https://www.google.com/search?q=${movie?.title}`} target="_blank" rel="noopener noreferrer">
                                <button className="custom-primary-btn text-2xl rounded-full"><FcGoogle /></button>
                            </Link>
                        </div>
                        {/*  */}
                    </div>

                    {/* terrible poster */}
                    <div className="left-[3.3%] max-h-none top-[10%] lg:top-[-80%] w-[25vw] absolute rounded-md overflow-hidden shadow-lg">
                        <div className='relative w-full aspect-[2/3]'>
                            <PosterImage poster={moviePosterUrl} title={movie?.title} imdbId={movie?.imdb?.id} />
                            {/* <Image
                                src={moviePosterUrl}
                                alt={movie?.title || "Movie poster"}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                                className="object-cover transition duration-200 w-full"
                                placeholder="blur"
                                blurDataURL="/images/poster-placeholder.svg"
                            /> */}
                        </div>
                    </div>
                </div>
                {/* detail page secondary container */}
                <div className='pl-[32.45vw] pr-[2%] bg-background pt-8 space-y-6'>
                    <div>
                        <p>{movie?.plot}</p>
                    </div>

                    <MovieMetadata genres={movie?.genres} cast={movie?.cast} countries={movie?.countries} />

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className='cursor-pointer hover:text-primary'>Show Full Plot</AccordionTrigger>
                            <AccordionContent>
                                {movie?.fullplot}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Suspense fallback={<RecommendationsLoadingFallback />}>
                        <ErrorBoundary message='Could not find recommendations'>
                            <RecommendedMovies id={String(movie?._id)} />

                        </ErrorBoundary>
                    </Suspense>
                </div>
            </div>

        </main>
    )
}

export default MovieDetails;



function RecommendationsLoadingFallback() {
    return (
        <div className='py-10'>
            <h1 className='text-2xl lg:text-3xl font-medium mb-5'>Loading More Like This...</h1>
            <section className='grid md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6'>
                {Array.from(Array(10).keys()).map((i) => (
                    <MovieCardSkeleton key={i} />
                ))}
            </section>
        </div>
    )
}