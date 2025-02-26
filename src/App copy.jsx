import { useState, useEffect, useRef } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
// import useDebounce from "./customHook/useDebounce";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";
import LazyImage from "./components/LazyImage";
import { Pagination } from "antd";
import FilterSelection from "./components/FilterSelection";
import {
    setUrlParam,
    removeUrlParam,
    getUrlParam,
    getAllUrlParams,
} from "./utils/urlUtils";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};

let numTest = 0;

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [isLoadingTrending, setIsLoadingTrending] = useState(false);
    const [totalResult, setTotalResult] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const prevSearchTermRef = useRef("");
    const [years, setYears] = useState(-1);
    const isInitialLoadRef = useRef(true); //to track initial load
    const abortControllerRef = useRef(null);

    // custom debounce fn
    // const debounceSearchTerm = useDebounce(searchTerm, 300);

    useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

    const fetchMovies = async (query = "") => {
        // Abort any ongoing fetch
        if (abortControllerRef.current) {
            console.log(abortControllerRef.current);
            abortControllerRef.current.abort();
            console.log("Aborted previous fetch", abortControllerRef.current);
        }

        // Create a new AbortController for this fetch
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;
        console.log("signal: ", signal, abortControllerRef.current);
        // abortControllerRef.current.abort();
        // console.log("Aborted previous fetch22", abortControllerRef.current);

        setIsLoading(true);
        setErrorMessage("");

        const newYears = years === -1 ? "" : years;
        console.log("newYears: ", newYears, query);

        if (query) {
            setUrlParam("query", query);
        }

        try {
            const endpoint = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
                      query
                  )}&page=${page}&year=${newYears}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}&year=${newYears}`;

            // Add abort controller signal
            const response = await fetch(endpoint, API_OPTIONS, signal);
            // console.log(response);
            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }
            const data = await response.json();
            console.log(data, data.Response, data.Error, page);

            if (data.Response === "false") {
                setErrorMessage(data.Error || "Failed to fetch movies");
                setMovieList([]);
                return;
            }
            setMovieList(data.results || []);
            setTotalResult(data.total_results || 0);

            if (query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }
        } catch (error) {
            if (error.name === "AbortError") {
                console.log("Fetch aborted:", query);
                return; // Ignore aborted fetches
            }
            console.log(`Error fetching movie: ${error}`);
            setErrorMessage("Error fetching movies. Please try again later.");
        } finally {
            setIsLoading(false);
            // Clear controller only if not aborted, to avoid reuse issues
            if (!signal.aborted) {
                abortControllerRef.current = null;
            }
        }
    };

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

    // useEffect(() => {
    //     // fetchMovies(searchTerm);

    //     fetchMovies(debounceSearchTerm);

    //     // return() => {
    //     // }
    // }, [debounceSearchTerm]);

    useEffect(() => {
        if (isInitialLoadRef.current) {
            console.log("wait for 2nd times render");
            return; // Skip on initial load
        }
        console.log("2nd times render!!");

        // console.log("prevSearchTermRef: ", prevSearchTermRef);
        // Check if the search term changed
        const prevSearchTerm = prevSearchTermRef.current;
        const searchTermChanged = prevSearchTerm !== debounceSearchTerm;

        if (searchTermChanged && debounceSearchTerm && page > 1) {
            console.log("set page size to 1");
            setPage(1);
            // onPageSizeChange(1, 20);

            prevSearchTermRef.current = debounceSearchTerm; // Update ref

            if (getUrlParam("page")) {
                setUrlParam("page", 1);
            }

            return; // Wait for next render with pagesize = 1
        }
        console.log(
            prevSearchTerm,
            prevSearchTermRef.current,
            page,
            debounceSearchTerm,
            years,
            page
        );

        // Fetch movies with current pageSize
        fetchMovies(debounceSearchTerm);

        // Update prevSearchTermRef after fetch
        prevSearchTermRef.current = debounceSearchTerm;
        // console.log(prevSearchTerm, prevSearchTermRef.current);
    }, [debounceSearchTerm, page, years]);

    // only 1st time to get trending movie
    useEffect(() => {
        // loadTrendingMovies();
        const urlParams = getAllUrlParams();
        console.log("get all params on 1st load: ", urlParams);
        // if (urlParams.query) {
        //     setSearchTerm(urlParams.query);
        //     console.log("set QUERY param on 1st load: ", urlParams.query);
        // }
        // if (urlParams.year) {
        //     setYears(Number(urlParams.year));
        //     console.log("set YEAR param on 1st load: ", urlParams.year);
        // }
        // if (urlParams.page) {
        //     setPage(Number(urlParams.page));
        //     console.log("set PAGE param on 1st load: ", urlParams.page);
        // }

        setYears(urlParams.year ? Number(urlParams.year) : -1);
        setPage(urlParams.page ? Number(urlParams.page) : 1);
        setSearchTerm(urlParams.query || "");
        console.log(
            "set param on 1st load: ",
            urlParams.query,
            urlParams.year,
            urlParams.page
        );

        loadTrendingMovies();
        fetchMovies(urlParams.query || "");

        console.log("isInitialLoadRef 1st load", isInitialLoadRef);

        // mark initial load as complete
        isInitialLoadRef.current = false;

        // Cleanup function to abort fetch on unmount (optional)
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
                console.log("Cleanup: Aborted fetch on unmount");
            }
        };
    }, []);

    console.log("LOADED: ", debounceSearchTerm, years, page, numTest);
    numTest++;
    return (
        <main>
            <div className="pattern"></div>
            <header>
                <nav></nav>
            </header>
            <div className="wrapper">
                <section className="hero-banner">
                    <img src="./hero.png" alt="Hero Banner" />
                    <h1>
                        Find <span className="text-gradient">Movies</span>{" "}
                        You'll Love Without the Hassle
                    </h1>
                    <Search
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </section>

                {isLoadingTrending ? (
                    <div className="flex justify-center">
                        <Spinner />
                        {/* <p className="text-white">Loading...</p> */}
                    </div>
                ) : (
                    <></>
                )}
                {trendingMovies.length > 0 ? (
                    <section className="trending">
                        <h2>Trending Movies</h2>
                        <ul>
                            {trendingMovies.map((movie, i) => (
                                <li key={movie.$id}>
                                    <p>{i + 1}</p>
                                    {/* <img
                                        src={movie.poster_url}
                                        alt={movie.title}
                                    /> */}
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
                    </section>
                ) : null}

                <section className="all-movies">
                    <div className="all-movies-header mt-[40px]">
                        <h2 className="">All Movies</h2>
                        <FilterSelection
                            onChange={onYearChange}
                            years={years}
                        />
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center">
                            <Spinner />
                            {/* <p className="text-white">Loading...</p> */}
                        </div>
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : movieList.length === 0 ? (
                        <p className="text-gray-500 text-center mt-4">
                            No movies found. Try a different search or filter!
                        </p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    )}
                    <Pagination
                        align="center"
                        current={page}
                        defaultCurrent={1}
                        total={totalResult}
                        // defaultPageSize={20}
                        showTotal={(total) => `Total ${total} items`}
                        // onShowSizeChange={onShowSizeChange}
                        onChange={onPageSizeChange}
                        className="antd-pagination"
                    />
                </section>
            </div>
        </main>
    );
}

export default App;
