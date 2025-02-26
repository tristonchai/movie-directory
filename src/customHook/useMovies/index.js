import {useState, useEffect} from 'react'
import { getMovieByDiscover, getMoviesBySearch } from "../../services/movie"
import { updateSearchCount } from "../../appwrite";

const useMovies = (query = "", year = -1, page = 1) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [movies, setMovies] = useState([])
    const [totalResult, setTotalResult] = useState(0)

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            setErrorMessage("");

            try {
                if(query){
                    const resp = await getMoviesBySearch(query, year, page);
                    // const data = resp.then(resp => console.log("DATA: ", resp));
                    // console.log("RESP with QUERY", resp);
                    if (resp.Response === "false") {
                        setErrorMessage(resp.Error || "Failed to fetch movies");
                        setMovies([]);
                        return;
                    }
                    setMovies(resp.results || []);
                    setTotalResult(resp.total_results || 0);

                    // update db for trending movies
                    if (query && resp.results.length > 0) {
                        await updateSearchCount(query, resp.results[0]);
                    }
                } else {
                    const resp = await getMovieByDiscover(year, page);
                    // const data = resp.then(resp => console.log("DATA: ", resp));
                    // console.log("RESP with DISCOVER", resp);
                    if (resp.Response === "false") {
                        setErrorMessage(resp.Error || "Failed to fetch movies");
                        setMovies([]);
                        return;
                    }
                    setMovies(resp.results || []);
                    setTotalResult(resp.total_results || 0);

                    // update db for trending movies
                    if (query && resp.results.length > 0) {
                        await updateSearchCount(query, resp.results[0]);
                    }
                }       
            } catch (error) {
                console.log(error)
                setErrorMessage("Error fetching movies. Please try again later.")
                setMovies([]);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovies();

        // setIsLoading(true);
        // setErrorMessage("");
        // try {
        //     if(query){
        //         const resp = getMoviesBySearch(query, year, page);
        //         resp.then(resp => {
        //             console.log("RESP with QUERY", resp);
        //             if (resp.Response === "false") {
        //                 setErrorMessage(resp.Error || "Failed to fetch movies");
        //                 setMovies([]);
        //                 return;
        //             }
        //             setMovies(resp.results || []);
        //             setTotalResult(resp.total_results || 0);
        //         });
        //     } else {
        //         const resp = getMovieByDiscover(year, page);
        //         resp.then(resp => {
        //             console.log("RESP with DISCOVER", resp);
        //             if (resp.Response === "false") {
        //                 setErrorMessage(resp.Error || "Failed to fetch movies");
        //                 setMovies([]);
        //                 return;
        //             }
        //             setMovies(resp.results || []);
        //             setTotalResult(resp.total_results || 0);
        //         });
        //     }       
        // } catch (error) {
        //     console.log(error)
        //     setErrorMessage("Error fetching movies. Please try again later.")
        //     setMovies([]);
        // } finally {
        //     setIsLoading(false);
        // }

    }, [query, year, page])
    
    return {movies, totalResult, isLoading, errorMessage};
}

export default useMovies