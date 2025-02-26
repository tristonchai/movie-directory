import React from "react";
import LazyImage from "../LazyImage";

const MovieCard = ({
    movie: {
        title,
        backdrop_path,
        poster_path,
        vote_count,
        vote_average,
        original_language,
        release_date,
    },
}) => {
    return (
        <li className="movie-card">
            {/* <img
                src={
                    backdrop_path
                        ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
                        : "/no-movie.png"
                }
            /> */}
            {/* <img
                src={
                    poster_path
                        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                        : "/no-movie.png"
                }
                alt={title}
            /> */}
            <div className="">
                <LazyImage
                    src={
                        poster_path
                            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                            : "/no-movie.png"
                    }
                    alt={title}
                    className="image-lazy"
                    style={{}}
                />
            </div>
            <div className="mt-4">
                <h3>{title}</h3>
                <div className="content">
                    <div className="rating">
                        <img src="star.svg" alt="Star Icon" />
                        <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
                    </div>
                    <span>•</span>
                    <p className="lang">{original_language}</p>
                    <span>•</span>
                    <p className="year">
                        {release_date ? release_date.split("-")[0] : "N/A"}
                    </p>
                </div>
            </div>
            {/* <p>{vote_count}</p> */}
        </li>
    );
};

export default MovieCard;
