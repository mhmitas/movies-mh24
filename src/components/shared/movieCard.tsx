import { IMovie } from "@/lib/database/models/movie.model";
import Image from "next/image";

const MovieCard = ({ title, poster, year, genres, _id }
  : Pick<IMovie, 'title' | 'poster' | 'year' | 'genres' | '_id'>) => {

  return (
    <div className="w-full max-w-sm shadow-lg overflow-hidden py-0">
      <section className="w-full aspect-[2/3] relative">
        <Image
          src={poster || "/images/poster-placeholder.svg"}
          alt={title || "Movie poster"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
          className="object-cover transition duration-200"
          placeholder="blur"
          blurDataURL="/images/poster-placeholder.svg"
        />
      </section>
      <section className="p-1 cursor-pointer">
        <h2 className="line-clamp-1 font-semibold text-center">{title}</h2>
        <p className="text-sm text-primary-foreground/60 text-center">Released - {year}</p>
      </section>
    </div>
  );
};

export default MovieCard;
