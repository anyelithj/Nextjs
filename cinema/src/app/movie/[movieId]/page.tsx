import { fetchMovieById, fetchRecomendations } from "@/actions/actions";
import Row from "@/components/Row";
import Image from "next/image";
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import {StarBorderIcon} from '@mui/icons-material/StarBorder';

type Props = {
    params: {
        movieId: string;
    }
}

// const sleep = async (ms) => {
//     await new Promise(resolve => setTimeout(resolve, ms));
//   };
const MoviePage = async ({ params }: Props) => {
    // const movieId = parseInt(params.movieId);
    const movieId = params.movieId;
    const movie: Movie = await fetchMovieById(movieId);
    const recommendations = await fetchRecomendations(movieId);

  return (
    <div className="bg-[#111] min-h-screen">
        <div className="relative h-96 w-full"  
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
            <div className="absolute z-10 top-10 flex-col md:flex-row justify-center items-center w-full gap-8 md:gap-16 p-10 md:p-20">
                <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={500}
                    height={750}
                    className="hidden md:block h-80 w-52 md:h-96 md:w-64"
                />
                <div className="space-y-8 text-gray-300 max-w-3xl">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        {movie.original_title}
                    </h1>
                    <div className="flex items-center gap-x-8">
                        <div className="text-lg font-medium flex items-center gap-x-2">
                            {/* <CalendarMonthIcon className="size-5"/> */}
                            {movie.release_date.split("-")[0]}
                        </div>
                        <div className="flex items-center gap-x-2">
                            {/* <StarBorderIcon className="size-5 text-yellow-500" fill="currentColor"/> */}
                           {movie.vote_average.toFixed(1)}
                        </div>
                    </div>
                    <p  className="text-xl text-gray-300">{movie.overview}</p>
                </div>
            </div>
            <div className="absolute inset-8 bg-[#111] opacity-50"/>
            <div className="absolute inset-8 bg-gradient-to-t from-[#111] to-transparent"/>
        </div>
            <div className="mt-40 md:mt-52">
                <Row title="Similar Titles" data={recommendations.results}/>
            </div>
    </div>
  )
}

export default MoviePage