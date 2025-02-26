import React from "react";
import LazyImage from "../LazyImage";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const TrendingMovieList = ({ movies }) => {
    // console.log("movies: ", movies, movies.length);

    const { user } = useAuth();

    const settings = {
        className: "center",
        dots: false,
        infinite: false,
        centerPadding: "60px",
        slidesToShow: 5,
        swipeToSlide: true,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    // slidesToScroll: 3,
                    dots: true,
                    infinite: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    // slidesToScroll: 2,
                    // initialSlide: 2,
                    dots: true,
                    infinite: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    // slidesToScroll: 1,
                    dots: true,
                    infinite: true,
                },
            },
        ],
        afterChange: function (index) {
            console.log(
                `Slider Changed to: ${
                    index + 1
                }, background: #222; color: #bada55`
            );
        },
    };

    return (
        <>
            {movies.length > 0 ? (
                <section className="trending">
                    <h2>Trending Movies</h2>
                    {/* <ul>
                        {movies.map((movie, i) => (
                            <li key={movie.$id}>
                                <p>{i + 1}</p>
                                <div className="max-w-[127px] ml-auto mr-auto">
                                    <LazyImage
                                        src={movie.poster_url}
                                        alt={movie.title}
                                        className="image-lazy"
                                        style={{}}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <hr /> */}
                    <div className="carousel-trending">
                        {user ? null : (
                            <div className="hide-trending-panel">
                                <div className="hide-trending-bg"></div>
                                <div className="hide-trending-panel-inner">
                                    <p>
                                        Please <Link to="/login">login</Link> to{" "}
                                        <br />
                                        view Trending Movie
                                    </p>
                                </div>
                            </div>
                        )}
                        <Slider {...settings}>
                            {movies.map((movie, i) => (
                                <div key={movie.$id}>
                                    <p>{i + 1}</p>
                                    <div className="max-w-[127px] ml-[5px]">
                                        <LazyImage
                                            src={movie.poster_url}
                                            alt={movie.title}
                                            className="image-lazy"
                                            style={{}}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </section>
            ) : null}
        </>
    );
};

export default TrendingMovieList;
