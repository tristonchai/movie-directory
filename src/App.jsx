import { useContext } from "react";

import Header from "./components/Header/index.jsx";
import { ThemeContext } from "./context/ThemeContext.js";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Singup";
import Profile from "./pages/Profile";

import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import { AuthProvider } from "./context/AuthContext/index.jsx";

function App() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const location = useLocation();
    const hideHeaderPaths = ["/login", "/signup"];
    const showHeader = !hideHeaderPaths.includes(location.pathname);
    // console.log("showHeader; ", showHeader, location);

    return (
        <main data-theme={theme}>
            <AuthProvider>
                {showHeader && (
                    <Header theme={theme} toggleTheme={toggleTheme} />
                )}

                {/* <Router> */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* the child pages of PrivateRoutes can only access with user login, else will redirect to login page */}
                    <Route element={<PrivateRoutes />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Routes>
                {/* </Router> */}
            </AuthProvider>
        </main>
    );
}

export default App;
