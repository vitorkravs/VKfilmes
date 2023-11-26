import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
  };
  showLink?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, showLink = true }) => {
  const imagesURL: string = import.meta.env.VITE_IMG;

  return (
    <div className="movie-card">
      <img src={imagesURL + movie.poster_path} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>
        <FaStar /> {movie.vote_average}
      </p>
      {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  );
};

export default MovieCard;
