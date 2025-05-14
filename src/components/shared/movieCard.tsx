import { IMovie } from "@/lib/database/models/movie.model";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

const MovieCard = ({ title, poster, year, genres, _id }
  : Pick<IMovie, 'title' | 'poster' | 'year' | 'genres' | '_id'>) => {

  return (
    <div className="w-full max-w-sm shadow-lg overflow-hidden py-0">
      <section className="w-full aspect-[2/3] relative">
        <Image
          src={poster || "/images/poster-placeholder.png"}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
          className="object-cover"
          placeholder="blur"
          blurDataURL="/images/poster-placeholder.png"
        />
        {/* Would you like help generating a proper low-res blurDataURL from your posters? Or want to add a fallback image if the poster is missing or fails?: YES */}
      </section>
      <section className="p-1">
        <h2 className="line-clamp-1 font-semibold text-center">{title}</h2>
        <p className="text-sm text-primary-foreground/60 text-center">Released - {year}</p>
      </section>
    </div>
  );
};

export default MovieCard;
