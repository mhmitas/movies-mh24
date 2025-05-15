import { Badge } from '@/components/ui/badge';
import { getMovieById } from '@/lib/actions/movies.actions';
import { formatDuration } from '@/lib/utils';
import React from 'react'
import { FaCheck, FaHeart, FaPlay, FaStar } from 'react-icons/fa6';
import MovieMetadata, { MovieActionButton } from './movie-detail-page-components';
import Image from 'next/image';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';

const MovieDetails = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;

    const { data: movie } = await getMovieById(id);
    console.log(movie)
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

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className='cursor-pointer hover:text-primary'>Show Full Plot</AccordionTrigger>
                            <AccordionContent>
                                {movie?.fullplot}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div></div>
                </div>
            </div>
        </main>
    )
}

export default MovieDetails