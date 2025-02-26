import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import TestComponent from "./components/TestComponent/index.jsx";
import { ThemeProvider } from "./context/ThemeContext.js/index.jsx";
// import { getMoviesBySearch, getMovieByDiscover } from "./services/movie.js";
// const resp = await getMoviesBySearch("avengers", -1, 1);
// console.log("RESP: ", resp);
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <App />
                {/* <TestComponent /> */}
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
