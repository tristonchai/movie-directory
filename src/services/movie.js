// Get movies data
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};
/**
 * 
 * @param {*} query keyword value from search field
 * @param {*} year year value from select menu
 * @param {*} page page value from pagination
 * @returns 
 */
export async function getMoviesBySearch(query = "", year = -1, page = 1){
    const newYears = year === -1 ? "" : year;
    // console.log("YEAR: ", year, newYears, typeof year, typeof newYears)
    const endpoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}&year=${newYears}`;
    // return await fetch(endpoint, API_OPTIONS).then(resp => resp.json()).then(resp => resp.data);
    const response = await fetch(endpoint, API_OPTIONS);
    if(!response.ok){
        throw new Error("Failed to fetch movies");
    }
    const data = await response.json();
    return data;
}

export async function getMovieByDiscover(year = -1, page = 1){
    const newYears = year === -1 ? "" : year;
    // console.log("YEAR: ", year, newYears, typeof year, typeof newYears)
    const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}&year=${newYears}`;
    // return await fetch(endpoint, API_OPTIONS).then(resp => resp.json()).then(resp => resp.data);
    const response =  await fetch(endpoint, API_OPTIONS);
    if(!response.ok){
        throw new Error("Failed to fetch movies");
    }
    const data = await response.json();
    return data;
}