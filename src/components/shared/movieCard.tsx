import { IMovie } from "@/lib/database/models/movie.model";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

const MovieCard = ({ title, poster, year, genres, _id }
  : Pick<IMovie, 'title' | 'poster' | 'year' | 'genres' | '_id'>) => {

  return (
    <Card className="w-full max-w-sm shadow-lg rounded-2xl overflow-hidden">
      <div className="w-full aspect-[2/3] relative">
        <img
          src={poster}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-500">Released: {year}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {genres?.map((genre) => (
            <Badge key={genre} variant="secondary">
              {genre}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
