import { useState, useEffect, useRef, useContext } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
// import MovieCard from "./components/MovieCard";
// import useDebounce from "./customHook/useDebounce";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";
// import LazyImage from "./components/LazyImage";
import { Pagination } from "antd";
import FilterSelection from "./components/FilterSelection";
import {
    setUrlParam,
    removeUrlParam,
    getUrlParam,
    getAllUrlParams,
} from "./utils/urlUtils";

import MovieListContainer from "./components/MovieListContainer";
import TrendingMovieList from "./components/TrendingMovieList";
import HeroBannerCarousel from "./components/HeroBannerCarousel";
import { ThemeContext } from "./context/ThemeContext.js";
import Header from "./components/Header/index.jsx";
import useMovies from "./customHook/useMovies/index.js";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};

// let numTest = 0;

function App() {
    const [movieList, setMovieList] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [isLoadingTrending, setIsLoadingTrending] = useState(false);
    const [pageSize, setPageSize] = useState(20);
    const isInitialLoadRef = useRef(true); //to track initial load
    const abortControllerRef = useRef(null);

    // const [searchTerm, setSearchTerm] = useState("");
    // const [page, setPage] = useState(1);
    // const [years, setYears] = useState(-1);
    // const prevSearchTermRef = useRef("");
    // const [debounceSearchTerm, setDebounceSearchTerm] = useState("");

    //directly get value from URL param instead, prevent setstate on initialization stage and causing re-render
    // const [isLoading, setIsLoading] = useState(false);
    // const [errorMessage, setErrorMessage] = useState("");
    // const [totalResult, setTotalResult] = useState(0);
    const prevSearchTermRef = useRef(getUrlParam("query") || "");
    const [searchTerm, setSearchTerm] = useState(getUrlParam("query") || "");
    const [debounceSearchTerm, setDebounceSearchTerm] = useState(
        getUrlParam("query") || ""
    );
    const [page, setPage] = useState(getUrlParam("page") || 1);
    const [years, setYears] = useState(getUrlParam("year") || -1);
    // const [appState, setAppState] = useState({
    //     years: -1,
    //     page: 1,
    //     searchTerm: "",
    // });

    const { theme, toggleTheme } = useContext(ThemeContext);

    // custom debounce fn
    // const debounceSearchTerm = useDebounce(searchTerm, 300);

    const ytURL = "https://www.youtube.com/embed/";
    // const ytURL = "/youtube-embed/embed/";
    const heroBannerCarouselData = [
        {
            img: "./heroBannerCarousel/captain-america-1500.jpg",
            imgM: "./heroBannerCarousel/captain-america-500.jpg",
            title: "Captain America: Brave New World",
            url: `${ytURL}1pHDWnXmK7Y`,
            urlID: "1pHDWnXmK7Y",
        },
        {
            img: "./heroBannerCarousel/companion-1500.jpg",
            imgM: "./heroBannerCarousel/companion-500.jpg",
            title: "Companion",
            url: `${ytURL}Qr_kX0D3DNA`,
            urlID: "Qr_kX0D3DNA",
        },
        {
            img: "./heroBannerCarousel/dark-nuns-1500.jpg",
            imgM: "./heroBannerCarousel/dark-nuns-500.jpg",
            title: "Dark Nuns",
            url: `${ytURL}xAdUdi1JJ4w`,
            urlID: "xAdUdi1JJ4w",
        },
        {
            img: "./heroBannerCarousel/LOTCH-1500.jpg",
            imgM: "./heroBannerCarousel/LOTCH-500.jpg",
            title: "The Legends Of Condor Heroes: The Gallants",
            url: `${ytURL}uyIPBAmY1hY`,
            urlID: "uyIPBAmY1hY",
        },
        {
            img: "./heroBannerCarousel/love-hurts-1500.jpg",
            imgM: "./heroBannerCarousel/love-hurts-500.jpg",
            title: "Love Hurts",
            url: `${ytURL}frYVyUDIwiE`,
            urlID: "frYVyUDIwiE",
        },
        {
            img: "./heroBannerCarousel/the-monkey-1500.jpg",
            imgM: "./heroBannerCarousel/the-monkey-500.jpg",
            title: "The Monkey",
            url: `${ytURL}husMGbXEIho`,
            urlID: "husMGbXEIho",
        },
    ];

    useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

    // Add initialLoad paramete
    // const fetchMovies = async (query = "") => {
    //     setIsLoading(true);
    //     setErrorMessage("");

    //     const newYears = years === -1 ? "" : years;
    //     // const newYears = urlParams.year === -1 ? "" : urlParams.year;
    //     // console.log("newYears: ", newYears, query, searchTerm);

    //     if (query) {
    //         setUrlParam("query", query);
    //     }

    //     try {
    //         const endpoint = query
    //             ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
    //                   query
    //               )}&page=${page}&year=${newYears}`
    //             : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}&year=${newYears}`;

    //         // Add abort controller signal
    //         const response = await fetch(endpoint, API_OPTIONS);
    //         // console.log(response);
    //         if (!response.ok) {
    //             throw new Error("Failed to fetch movies");
    //         }
    //         const data = await response.json();
    //         console.log(data, data.Response, data.Error, page);

    //         if (data.Response === "false") {
    //             setErrorMessage(data.Error || "Failed to fetch movies");
    //             setMovieList([]);
    //             return;
    //         }
    //         setMovieList(data.results || []);
    //         setTotalResult(data.total_results || 0);

    //         if (query && data.results.length > 0) {
    //             await updateSearchCount(query, data.results[0]);
    //         }
    //     } catch (error) {
    //         console.log(`Error fetching movie: ${error}`);
    //         setErrorMessage("Error fetching movies. Please try again later.");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const loadTrendingMovies = async () => {
        try {
            setIsLoadingTrending(true);
            const movies = await getTrendingMovies();
            console.log("trending: ", movies);
            setTrendingMovies(movies);
        } catch (error) {
            console.log(`Error fetching trending movie: ${error}`);
            setIsLoadingTrending(false);
        } finally {
            setIsLoadingTrending(false);
        }
    };

    // const onShowSizeChange = (current, pageSize) => {
    //     console.log("onShowSizeChange: ", current, pageSize);
    //     setPageSize(pageSize);
    // };

    const onPageSizeChange = (page, pageSize) => {
        console.log("onPageSizeChange: ", page, pageSize);
        setPage(page);
        setUrlParam("page", page);
    };

    const onYearChange = (value) => {
        console.log("onYearChange in APP: ", value);
        if (page > 1) {
            setPage(1);
        }
        setYears(value);
        // setUrlParam("year", value === -1 ? "" : value);
        setUrlParam("year", value);

        console.log("year: ", years, value);
        if (getUrlParam("page")) {
            setUrlParam("page", 1);
        }
    };

    useEffect(() => {
        // console.log("prevSearchTermRef: ", prevSearchTermRef);
        // Check if the search term changed
        const prevSearchTerm = prevSearchTermRef.current;
        const searchTermChanged = prevSearchTerm !== debounceSearchTerm;

        // console.log(
        //     "TERM change?? ",
        //     prevSearchTerm,
        //     debounceSearchTerm,
        //     searchTermChanged
        // );

        // !isInitialLoadRef.current => prevent 1st load to executed code below
        // the below code only will executed if search field have new value, and it will reset the page to 1
        if (
            searchTermChanged &&
            debounceSearchTerm &&
            page > 1 &&
            !isInitialLoadRef.current
        ) {
            console.log("set page size to 1");
            setPage(1);
            // onPageSizeChange(1, 20);

            prevSearchTermRef.current = debounceSearchTerm; // Update ref

            if (getUrlParam("page")) {
                setUrlParam("page", 1);
            }

            return; // Wait for next render with pagesize = 1
        }
        // console.log(page, debounceSearchTerm, years, page);

        // Fetch movies
        // if (debounceSearchTerm) {
        //     console.log("USING debounceSearchTerm to FETCH");
        //     fetchMovies(debounceSearchTerm);
        // } else {
        //     console.log("USING searchTerm to FETCH");
        //     fetchMovies(searchTerm);
        // }

        // set search value to urlParams
        if (debounceSearchTerm) {
            setUrlParam("query", debounceSearchTerm);
        }

        isInitialLoadRef.current = false;
    }, [debounceSearchTerm, page, years]);

    // const fetchMovies = async () => {
    //     // Fetch movies using the custom hook
    //     const { movies, isLoading, errorMessage } = useMovies(
    //         debounceSearchTerm,
    //         years,
    //         page
    //     );
    //     const data = await movies;
    //     console.log("DATA: ", data);
    //     return { data, isLoading, errorMessage };
    // };

    const { movies, totalResult, isLoading, errorMessage } = useMovies(
        debounceSearchTerm,
        Number(years),
        page
    );
    // console.log("movies: ", movies, totalResult, isLoading, errorMessage);

    // only 1st time to get trending movie
    useEffect(() => {
        loadTrendingMovies();
    }, []);

    // console.log("LOADED: ", debounceSearchTerm, years, page, numTest);
    // numTest++;

    return (
        <main data-theme={theme}>
            <div className="pattern"></div>
            {/* <TestYoutubeModal /> */}
            <Header theme={theme} toggleTheme={toggleTheme} />
            <div className="hero-banner-carousel">
                <HeroBannerCarousel banners={heroBannerCarouselData} />
            </div>
            <div className="wrapper">
                <section className="hero-banner">
                    {/* <img src="./hero.png" alt="Hero Banner" /> */}
                    <h1>
                        <span className="text-gradient">Movie</span> Search Made
                        Simple:
                        <br />
                        Movie Directory
                    </h1>
                    <Search
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </section>

                {isLoadingTrending ? (
                    <div className="flex justify-center">
                        <Spinner />
                    </div>
                ) : (
                    <></>
                )}

                <TrendingMovieList movies={trendingMovies} />

                <section className="all-movies">
                    <div className="all-movies-header mt-[40px]">
                        <h2 className="">All Movies</h2>
                        <FilterSelection
                            onChange={onYearChange}
                            years={years}
                        />
                    </div>

                    {/* {isLoading ? (
                        <div className="flex justify-center">
                            <Spinner />
                        </div>
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : movieList.length === 0 ? (
                        <p className="text-gray-500 text-center mt-4">
                            No movies found. Try a different search or filter!
                        </p>
                    ) : (
                        <MovieListContainer movieData={movieList} />
                    )} */}

                    {isLoading ? (
                        <div className="flex justify-center">
                            <Spinner />
                        </div>
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : movies.length === 0 ? (
                        <p className="text-gray-500 text-center mt-4">
                            No movies found. Try a different search or filter!
                        </p>
                    ) : (
                        <MovieListContainer movieData={movies} />
                    )}

                    {totalResult > 20 ? (
                        <Pagination
                            align="center"
                            current={page}
                            defaultCurrent={1}
                            total={totalResult}
                            // defaultPageSize={20}
                            showTotal={(total) => `Total ${total} items`}
                            defaultPageSize={20}
                            // onShowSizeChange={onShowSizeChange}
                            showLessItems
                            onChange={onPageSizeChange}
                            className="antd-pagination"
                        />
                    ) : null}
                </section>
            </div>
        </main>
    );
}

export default App;
