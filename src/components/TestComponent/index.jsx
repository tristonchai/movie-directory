import React, { useState, useEffect } from "react";
import "./index.css";

const TestComponent = () => {
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchQuery, setSearchQuery] = useState(
        new URLSearchParams(window.location.search).get("query") || ""
    );
    const [selectedYear, setSelectedYear] = useState(
        new URLSearchParams(window.location.search).get("year") || ""
    );
    const [currentPage, setCurrentPage] = useState(
        parseInt(new URLSearchParams(window.location.search).get("page")) || 1
    );

    const moviesPerPage = 20;
    // const API_KEY = "YOUR_TMDB_API_KEY"; // Replace with your TMDB API key
    // const BASE_URL = "https://api.themoviedb.org/3";

    const API_BASE_URL = "https://api.themoviedb.org/3";
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const API_OPTIONS = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
    };

    // Generate years array from 1990 to current year
    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear - 1990 + 1 },
        (_, i) => 1990 + i
    );

    // Update URL parameters
    const updateURLParams = () => {
        const params = new URLSearchParams();
        if (searchQuery) params.set("query", searchQuery);
        if (selectedYear) params.set("year", selectedYear);
        if (currentPage > 1) params.set("page", currentPage);

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({}, "", newUrl);
    };

    // Fetch movies from API
    const fetchMovies = async () => {
        setIsLoading(true);
        setError(null);

        try {
            let url;
            if (searchQuery) {
                url = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
                    searchQuery
                )}&page=${currentPage}&year=${selectedYear}`;
            } else {
                url = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${currentPage}&year=${selectedYear}`;
            }
            // let url = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
            //     searchQuery
            // )}&page=${currentPage}`;

            // if (searchQuery) {
            //     url += `&query=${encodeURIComponent(searchQuery)}`;
            // }
            // if (selectedYear) {
            //     url += `&year=${selectedYear}`;
            // }

            const response = await fetch(url, API_OPTIONS);
            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }
            console.log("response: ", response);

            const data = await response.json();
            console.log("data: ", data);
            setMovies(data.results);
            setTotalPages(data.total_pages > 1000 ? 1000 : data.total_pages);
        } catch (err) {
            setError(err.message);
            setMovies([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle URL changes and fetch data
    useEffect(() => {
        console.log("USEEFFECT LOAD");
        updateURLParams();
        fetchMovies();

        // Listen for popstate events (browser back/forward)
        const handlePopState = () => {
            console.log("Change state inside USEEFFECT");
            const params = new URLSearchParams(window.location.search);
            setSearchQuery(params.get("query") || "");
            setSelectedYear(params.get("year") || "");
            setCurrentPage(parseInt(params.get("page")) || 1);
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [searchQuery, selectedYear, currentPage]);

    const handlePageChange = (e) => {
        setCurrentPage(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
        setCurrentPage(1);
    };

    console.log("Gloabl: ", searchQuery, selectedYear, currentPage);
    return (
        <div className="movie-list">
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />

                <select value={selectedYear} onChange={handleYearChange}>
                    <option value="">All Years</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <select value={selectedYear} onChange={handlePageChange}>
                    <option value="1">Page 1</option>
                    <option value="2">Page 2</option>
                    <option value="3">Page 3</option>
                </select>
            </div>

            {isLoading && <div>Loading movies...</div>}
            {error && <div>Error: {error}</div>}

            {!isLoading && !error && movies.length > 0 && (
                <div className="movie-grid">
                    {movies.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                                onError={(e) => {
                                    e.target.src = "placeholder.jpg";
                                }}
                            />
                            <h3>{movie.title}</h3>
                            <p>Rating: {movie.vote_average || "N/A"}</p>
                            <p>
                                Year:{" "}
                                {new Date(movie.release_date).getFullYear()}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {!isLoading && !error && movies.length === 0 && (
                <div>No movies found</div>
            )}

            {!isLoading && !error && movies.length > 0 && (
                <div className="pagination">
                    {Array.from(
                        { length: Math.min(totalPages, 10) },
                        (_, i) => i + 1
                    ).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={currentPage === page ? "active" : ""}
                        >
                            {page}
                        </button>
                    ))}
                    {totalPages > 10 && <span>...</span>}
                </div>
            )}
        </div>
    );
};

export default TestComponent;
