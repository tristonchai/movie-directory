import React from "react";
import MovieCard from "../MovieCard";

const MovieList = ({ movieData }) => {
    // console.log("movieData: ", movieData);
    return (
        <ul>
            {movieData.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </ul>
    );
};

export default MovieList;
