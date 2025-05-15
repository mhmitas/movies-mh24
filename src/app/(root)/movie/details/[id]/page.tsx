import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Star, Award, Calendar, Clock, Globe, Film } from "lucide-react"

export default function MovieDetails({ params }: { params: { id: string } }) {
    const movie = {
        id: "573a13d2f29313caabd91d33",
        title: "Captain America: The Winter Soldier",
        year: 2014,
        rated: "PG-13",
        released: "2014-04-04",
        runtime: 136,
        genres: ["Action", "Adventure", "Sci-Fi"],
        directors: ["Anthony Russo", "Joe Russo"],
        writers: ["Christopher Markus (screenplay)", "Stephen McFeely (screenplay)"],
        cast: ["Chris Evans", "Samuel L. Jackson", "Scarlett Johansson", "Robert Redford"],
        plot: "As Steve Rogers struggles to embrace his role in the modern world, he teams up with another super soldier, the black widow, to battle a new threat from old history: an assassin known as the Winter Soldier.",
        languages: ["English"],
        countries: ["USA"],
        poster:
            "https://m.media-amazon.com/images/M/MV5BMzA2NDkwODAwM15BMl5BanBnXkFtZTgwODk5MTgzMTE@._V1_SY1000_SX677_AL_.jpg",
        ratings: {
            imdb: {
                rating: 7.8,
                votes: 398260,
            },
            rottenTomatoes: {
                critic: {
                    score: 89,
                    reviews: 253,
                    consensus:
                        "Suspenseful and politically astute, Captain America: The Winter Soldier is a superior entry in the Avengers canon and is sure to thrill Marvel diehards.",
                },
                audience: {
                    score: 92,
                    reviews: 271294,
                },
            },
            metacritic: 70,
        },
        boxOffice: "$259.7M",
        production: "Walt Disney Pictures",
        website: "http://marvel.com/captainamerica",
        awards: {
            wins: 6,
            nominations: 46,
            summary: "Nominated for 1 Oscar. Another 5 wins & 46 nominations.",
        },
    }

    return (
        <main className="container mx-auto py-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Movie Poster */}
                <div className="md:col-span-1">
                    <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-lg">
                        <Image src={movie.poster || "/placeholder.svg"} alt={movie.title} fill className="object-cover" priority />
                    </div>

                    {/* Ratings Card */}
                    {/* <div className="mt-6">
                        <div className="pt-6">
                            <h3 className="text-lg font-semibold mb-4">Ratings</h3>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="font-medium">IMDb</span>
                                        <span className="flex items-center">
                                            <Star className="h-4 w-4 text-yellow-500 mr-1 inline" />
                                            {movie.ratings.imdb.rating}/10
                                        </span>
                                    </div>
                                    <Progress value={movie.ratings.imdb.rating * 10} className="h-2" />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {movie.ratings.imdb.votes.toLocaleString()} votes
                                    </p>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="font-medium">Rotten Tomatoes (Critics)</span>
                                        <span>{movie.ratings.rottenTomatoes.critic.score}%</span>
                                    </div>
                                    <Progress value={movie.ratings.rottenTomatoes.critic.score} className="h-2" />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {movie.ratings.rottenTomatoes.critic.reviews} reviews
                                    </p>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="font-medium">Rotten Tomatoes (Audience)</span>
                                        <span>{movie.ratings.rottenTomatoes.audience.score}%</span>
                                    </div>
                                    <Progress value={movie.ratings.rottenTomatoes.audience.score} className="h-2" />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {movie.ratings.rottenTomatoes.audience.reviews.toLocaleString()} reviews
                                    </p>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="font-medium">Metacritic</span>
                                        <span>{movie.ratings.metacritic}/100</span>
                                    </div>
                                    <Progress value={movie.ratings.metacritic} className="h-2" />
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* Movie Details */}
                <div className="md:col-span-2">
                    <h1 className="text-3xl md:text-4xl font-bold">{params.id}</h1>

                    <div className="flex flex-wrap items-center gap-2 mt-2">
                        <Badge variant="outline">{movie.rated}</Badge>
                        <span className="text-muted-foreground flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {movie.released} ({movie.year})
                        </span>
                        <span className="text-muted-foreground flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {movie.runtime} min
                        </span>
                    </div>

                    {/* <div className="flex flex-wrap gap-2 mt-4">
                        {movie.genres.map((genre) => (
                            <Badge key={genre} variant="secondary">
                                {genre}
                            </Badge>
                        ))}
                    </div> */}

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Plot</h2>
                        <p className="text-muted-foreground">{movie.plot}</p>
                    </div>

                    <Separator className="my-6" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-3">Cast</h2>
                            <ul className="space-y-2">
                                {movie.cast.map((actor) => (
                                    <li key={actor} className="flex items-start">
                                        <span>{actor}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-3">Crew</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium">Directors</h3>
                                    <p className="text-muted-foreground">{movie.directors.join(", ")}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium">Writers</h3>
                                    <p className="text-muted-foreground">{movie.writers.join(", ")}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-3">Critics Consensus</h2>
                        <blockquote className="border-l-4 pl-4 italic text-muted-foreground">
                            "{movie.ratings.rottenTomatoes.critic.consensus}"
                        </blockquote>
                    </div>

                    <Separator className="my-6" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-3">Details</h2>
                            <dl className="space-y-2">
                                <div className="flex items-start">
                                    <dt className="w-24 font-medium">Box Office:</dt>
                                    <dd>{movie.boxOffice}</dd>
                                </div>
                                <div className="flex items-start">
                                    <dt className="w-24 font-medium">Production:</dt>
                                    <dd>{movie.production}</dd>
                                </div>
                                <div className="flex items-start">
                                    <dt className="w-24 font-medium">Website:</dt>
                                    <dd>
                                        <a
                                            href={movie.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                        >
                                            {movie.website}
                                        </a>
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-3">Additional Info</h2>
                            <dl className="space-y-2">
                                <div className="flex items-center">
                                    <dt className="w-24 font-medium flex items-center">
                                        <Globe className="h-4 w-4 mr-1" />
                                        Languages:
                                    </dt>
                                    <dd>{movie.languages.join(", ")}</dd>
                                </div>
                                <div className="flex items-center">
                                    <dt className="w-24 font-medium flex items-center">
                                        <Film className="h-4 w-4 mr-1" />
                                        Countries:
                                    </dt>
                                    <dd>{movie.countries.join(", ")}</dd>
                                </div>
                                <div className="flex items-start">
                                    <dt className="w-24 font-medium flex items-center">
                                        <Award className="h-4 w-4 mr-1" />
                                        Awards:
                                    </dt>
                                    <dd>{movie.awards.summary}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
