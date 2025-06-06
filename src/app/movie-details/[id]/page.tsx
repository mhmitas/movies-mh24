import { Badge } from '@/components/ui/badge';
import { getMovieById, getMovieByIdForMetaData } from '@/lib/actions/movies.actions';
import { cn, formatDuration } from '@/lib/utils';
import React, { Suspense } from 'react'
import { FaCheck, FaHeart, FaPlay, FaStar } from 'react-icons/fa6';
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import RecommendedMovies from '@/components/shared/RecommendedMovies';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import MovieCardSkeleton from '@/components/shared/movie-cards/MovieCardSkeleton';
import MovieDetail, { MovieActionButton } from './movie-detail-page-components';
import Image from "next/image";

const LG_COMPLEX_PADDING = " pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-[32.45vw] md:pr-[2%]";

const MovieDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { data: movie } = await getMovieById(id);

    // Determine poster URL with streamlined logic
    const poster = movie?.poster || "/images/poster-placeholder.svg";

    return (
        <main className='text-foreground/90'>
            {/* Background image */}
            <div className='fixed inset-0 -z-20'>
                <div
                    className="bg-cover bg-center min-h-screen"
                    style={{ backgroundImage: `url(${poster})` }}
                />
                <div className='absolute inset-0 md:bg-gradient-to-r from-background via-background/50 to-background z-0' />
            </div>

            {/* Content container */}
            <div className='mt-[45vh] md:mt-56 text-sm md:text-base bg-background min-h-screen'>
                <div className='bg-card relative'>
                    {/* Header section */}
                    <div className={cn(
                        "flex flex-col md:flex-row justify-between md:items-center py-4 md:py-6",
                        LG_COMPLEX_PADDING
                    )}>
                        <div className='space-y-2'>
                            <h1 className='text-xl md:text-2xl font-bold line-clamp-1'>
                                {movie?.title}
                            </h1>
                            <div className='flex items-center gap-4'>
                                <span>{movie?.year}</span>
                                <span>{formatDuration(movie?.runtime || 0)}</span>
                                {movie?.rated && (
                                    <Badge variant='outline'>{movie.rated}</Badge>
                                )}
                            </div>
                        </div>

                        <div className='flex items-center'>
                            <MovieActionButton icon={<FaPlay />} />
                            <MovieActionButton icon={<FaCheck />} />
                            <MovieActionButton icon={<FaHeart />} />
                            <Link
                                href={`https://www.google.com/search?q=${movie?.title}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="custom-primary-btn text-xl md:text-2xl rounded-full">
                                    <FcGoogle />
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Poster image */}
                    <div className="hidden md:flex md:w-[25vw] md:absolute left-[3.3%] top-[10%] md:top-[-80%] rounded-md overflow-hidden shadow-lg">
                        <div className='relative w-full aspect-[2/3]'>
                            <Image
                                src={poster}
                                alt={"Poster isn't found"}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 200px"  // Adjusted sizes for lower resolution
                                className="object-cover transition duration-200 w-full rounded"
                                placeholder="blur"
                                blurDataURL="/images/poster-placeholder.svg"
                                unoptimized
                            />
                        </div>
                    </div>
                </div>

                {/* Details section */}
                <div className={cn("bg-background pt-8 space-y-6", LG_COMPLEX_PADDING)}>
                    <MovieDetail {...movie} />

                    <Suspense fallback={<RecommendationsLoadingFallback />}>
                        <ErrorBoundary message='Could not find recommendations'>
                            <RecommendedMovies
                                id={String(movie?._id)}
                                title={movie?.title}
                            />
                        </ErrorBoundary>
                    </Suspense>
                </div>
            </div>

            {/* Structured data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": movie.type,
                    name: movie.title,
                    datePublished: movie.year,
                    genre: movie.genres,
                    url: `https://moviesmh24.vercel.app/movie-details/${movie._id}`,
                })}
            </script>
        </main>
    )
}

export default MovieDetails;



function RecommendationsLoadingFallback() {
    return (
        <div className='py-10'>
            <h1 className='text-2xl md:text-3xl font-medium mb-5'>Loading More Like This...</h1>
            <section className='grid md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6'>
                {Array.from(Array(10).keys()).map((i) => (
                    <MovieCardSkeleton key={i} />
                ))}
            </section>
        </div>
    )
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    const movie = await getMovieByIdForMetaData(id);

    if (!movie || (Array.isArray(movie) && movie.length === 0)) {
        return {
            title: 'Movie Not Found | Movies MH24',
            description: 'This movie could not be found.',
        };
    }

    // If movie is an array, use the first item
    const movieData = Array.isArray(movie) ? movie[0] : movie;

    return {
        title: `${movieData.title} | Movies MH24`,
        description: `${movieData.title} (${movieData.year}) - ${Array.isArray(movieData.genre) ? movieData.genre.join(', ') : movieData.genre}. Discover it on Movies MH24.`,
        openGraph: {
            images: [movieData?.poster],
        },
    };
}