import { fetchPopular, fetchTopRated, fetchUpcoming } from "@/actions/actions"
import Row from "./Row"
import GenreRow from "./Genre-Row";


export  default  async function Rows(){
  const popularMovies = await fetchPopular();
  const topRatedMovies = await fetchTopRated();
  const upComingMovies = await fetchUpcoming();

  return (
    <div className="py-6 md:py-12 flex-col gap-y-10 md:gap-y-20">
        <Row title="Popular Now" data={popularMovies.results}/>
        <Row title="Top Rated" data={topRatedMovies.results}/>
        <Row title="Coming Soon" data={upComingMovies.results}/>
        <GenreRow/>
    </div>
  )
}
