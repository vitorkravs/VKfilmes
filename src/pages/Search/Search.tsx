import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";

import "../Movie/MovieGrid.css";

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  // Adicione outros campos conforme necessário
}

const searchURL: string = import.meta.env.VITE_SEARCH;
const apiKey: string = import.meta.env.VITE_API_KEY;

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState<Movie[]>([]);
  const query: string | null = searchParams.get("q");

  const getSearchedMovies = async (url: string): Promise<void> => {
    try {
      const res = await fetch(url);
      const data: { results: Movie[] } = await res.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching searched movies:", error);
    }
  };

  useEffect(() => {
    if (query) {
      const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;
      getSearchedMovies(searchWithQueryURL);
    }
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        <span className="title-results">Resultados para:</span>{" "}
        <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Search;
