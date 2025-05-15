import { Badge } from '@/components/ui/badge';
import { getMovieById } from '@/lib/actions/movies.actions';
import { formatDuration } from '@/lib/utils';
import React from 'react'
import { FaCheck, FaHeart, FaPlay } from 'react-icons/fa6';
import MovieMetadata, { MovieActionButton } from './movie-detail-page-components';
import Image from 'next/image';

const MovieDetails = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;

    const { data: movie } = await getMovieById(id);
    // console.log(movie)
    return (
        <main className='text-foreground/90'>
            {/* backgroud image */}
            <div className='fixed inset-0 -z-20'>
                <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${movie?.poster})` }}></div>
                <div className='absolute inset-0 bg-gradient-to-r from-background via-background/50 to-background z-0'></div>
            </div>
            {/* detail page wrapper container */}
            <div className='mt-48'>
                {/* detail page primary container */}
                <div className='bg-muted relative'>
                    {/* info container (title, ...) */}
                    <div className='flex justify-between items-center py-6 pl-[32.45vw] pr-[2%]'>
                        <div className='space-y-2'>
                            <h1 className='text-2xl font-bold line-clamp-1'>{movie?.title}</h1>
                            <div className='flex items-center gap-4'>
                                <span>{movie?.year}</span>
                                <span>{formatDuration(movie?.runtime)}</span>
                                <Badge variant={'secondary'}>{movie?.rated}</Badge>
                            </div>
                        </div>
                        <div>
                            <MovieActionButton icon={<FaPlay />} />
                            <MovieActionButton icon={<FaCheck />} />
                            <MovieActionButton icon={<FaHeart />} />
                        </div>
                        {/*  */}
                    </div>

                    {/* terrible poster */}
                    <div className="left-[3.3%] max-h-none top-[10%] md:top-[-80%] w-[25vw] absolute rounded-md overflow-hidden shadow-lg">
                        <div className='relative w-full aspect-[2/3]'>
                            <Image
                                src={movie?.poster || "/images/poster-placeholder.svg"}
                                alt={movie?.title || "Movie poster"}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                                className="object-cover transition duration-200 w-full"
                                placeholder="blur"
                                blurDataURL="/images/poster-placeholder.svg"
                            />
                        </div>
                    </div>
                </div>
                {/* detail page secondary container */}
                <div className='pl-[32.45vw] pr-[2%] bg-background h-screen pt-8 space-y-6'>
                    <div>
                        <p>{movie?.plot}</p>
                    </div>
                    <MovieMetadata genres={movie?.genres} cast={movie?.cast} countries={movie?.countries} />
                    <div></div>
                    <div></div>
                </div>
            </div>
        </main>
    )
}

export default MovieDetails