import { IMovie } from "@/lib/database/models/movie.model";
import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import { capitalize } from "@/lib/utils";
import Link from "next/link";
import { getAdditionDataFromTmdb } from "@/lib/actions/movies.actions";
import { Badge } from "@/components/ui/badge";
import PosterImage from "../MoviePoster";

interface MovieCardProps extends IMovie {
  // score: number
}


const MovieCard = async ({ title, poster, year, _id, type, runtime, imdb }
  : MovieCardProps) => {

  poster = poster || "/images/poster-placeholder.svg";

  return (
    <Link href={`/movie-details/${_id}`}>
      <div
        className="w-full max-w-sm shadow-lg overflow-hidden py-0 cursor-pointer group relative transition-all duration-300">
        <section className="relative w-full overflow-hidden rounded-xs">
          <div className="w-full aspect-[2/3] relative">
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
          <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button className="font-medium text-2xl text-primary-foreground bg-primary/70 p-3 rounded-full cursor-pointer">
              <FaPlay className="translate-x-0.5" />
            </button>
          </div>
        </section>
        <section className="p-1">
          <h1 className="line-clamp-1 font-semibold hover:text-primary">{title}</h1>
          {/* <p className="text-sm text-primary-foreground/60 text-center">{year}</p> */}
          <div className="flex items-center justify-between text-sm text-muted-foreground space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span>{year}</span>
              <span>•</span>
              <span>{runtime ? `${runtime}m` : "N/A"}</span>
            </div>
            <Badge variant={"outline"}>{capitalize(type || "Movie")}</Badge>
          </div>
        </section>
        {/* <p>{poster}</p> */}
      </div>
    </Link>
  );
};

export default MovieCard;
