import type React from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Star } from "lucide-react"
import { IMovie } from "@/lib/database/models/movie.model"


export default function MovieDetailPage({
    genres,
    cast,
    directors,
    countries,
    languages,
    plot,
    imdb,
    metacritic,
    fullplot,
    tomatoes,
}: IMovie
) {

    return (
        <div className="">
            <div className="grid gap-12 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <section className='space-y-2'>
                        <MetaDataRow title='Genres' items={genres} />
                        <MetaDataRow title='Casts' items={cast} />
                        <MetaDataRow title='Directors' items={directors} />
                        <MetaDataRow title='Countries' items={countries} />
                        <MetaDataRow title='Languages' items={languages} />
                    </section>
                    <Separator className="mt-4" />

                    {/* Plot */}
                    {plot && (
                        <section>
                            <div className="border-l-4 border-primary pl-6">
                                <p className="text-base leading-relaxed text-muted-foreground italic">"{plot}"</p>
                            </div>
                        </section>
                    )}
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className='cursor-pointer hover:text-primary'>Show Full Plot</AccordionTrigger>
                            <AccordionContent>
                                {fullplot}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Separator className="mt-4" />
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    {/* Ratings */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Star className="w-6 h-6 text-primary" />
                            <h2 className="text-xl font-medium">Ratings</h2>
                        </div>

                        <div className="space-y-4">
                            <RatingItem title="IMDb" rating={imdb?.rating} votes={imdb?.votes} />
                            <RatingItem title="Metacritic" rating={metacritic} maxRating={100} />
                            {tomatoes?.critic?.rating && (
                                <RatingItem
                                    title="Critics Score"
                                    rating={tomatoes.critic.rating}
                                    maxRating={100}
                                    reviews={tomatoes.critic.numReviews}
                                />
                            )}
                            {tomatoes?.viewer?.rating && (
                                <RatingItem
                                    title="Audience Score"
                                    rating={tomatoes.viewer.rating}
                                    maxRating={100}
                                    reviews={tomatoes.viewer.numReviews}
                                />
                            )}

                            {tomatoes && (tomatoes.fresh || tomatoes.rotten) && (
                                <div className="mt-6 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                                    <div className="text-sm font-medium mb-3 text-center">Rotten Tomatoes</div>
                                    <div className="flex justify-center gap-6">
                                        {tomatoes.fresh && (
                                            <div className="text-center">
                                                <div className="text-xl font-medium text-green-600">{tomatoes.fresh}</div>
                                                <div className="text-xs text-muted-foreground">Fresh</div>
                                            </div>
                                        )}
                                        {tomatoes.rotten && (
                                            <div className="text-center">
                                                <div className="text-xl font-medium text-red-600">{tomatoes.rotten}</div>
                                                <div className="text-xs text-muted-foreground">Rotten</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

interface RatingItemProps {
    title: string
    rating: number | undefined
    maxRating?: number
    votes?: number
    reviews?: number
}

function RatingItem({ title, rating, maxRating = 10, votes, reviews }: RatingItemProps) {
    if (rating === undefined) return null

    return (
        <div className="flex items-center justify-between py-3 border-l-4 border-primary/20 pl-4">
            <div>
                <div className="font-medium text-sm">{title}</div>
                {(votes || reviews) && (
                    <div className="text-xs text-muted-foreground">
                        {votes ? `${votes.toLocaleString()} votes` : `${reviews} reviews`}
                    </div>
                )}
            </div>
            <div className="text-right">
                <div className="text-xl font-medium">{rating}</div>
                <div className="text-xs text-muted-foreground">/ {maxRating}</div>
            </div>
        </div>
    )
}


function MetaDataRow({ title, items }: { title: string; items?: string[] | undefined }) {

    if (!items?.length) return null

    return (
        <div className='grid grid-cols-5 max-w-3xl'>
            <div className='col-span-1'>{title}</div>
            <div className='col-span-4 flex flex-wrap gap-x-2'>
                {items?.map((item, index) => (
                    <span key={index} className=''>{item} {index !== items.length - 1 && ','}</span>
                ))}
            </div>
        </div>
    )
}

export const MovieActionButton = ({ icon }: { icon: React.ReactNode }) => (
    <button className="custom-primary-btn text-xl rounded-full">
        {icon}
    </button>
);