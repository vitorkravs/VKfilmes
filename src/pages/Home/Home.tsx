import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";

import "../Movie/MovieGrid.css";

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
}

const moviesURL: string = import.meta.env.VITE_API;
const apiKey: string = import.meta.env.VITE_API_KEY;

const Home: React.FC = () => {
  const [topMovies, setTopMovies] = useState<Movie[]>([]);

  const getTopRatedMovies = async (url: string): Promise<void> => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setTopMovies(data.results);
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    }
  };

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;
    console.log(topRatedUrl);
    getTopRatedMovies(topRatedUrl);
  }, []);

  console.log(topMovies);

  return (
    <div className="container">
      <h2 className="title">Melhores filmes:</h2>
      <div className="movies-container">
        {topMovies.length > 0 &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Home;
