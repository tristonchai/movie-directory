import React, { useState, useEffect } from "react";
// import { ThemeContext } from "../../context/ThemeContext.js/index.jsx";
// import lightIcon from "./sun-warm-icon.svg";
// import darkIcon from "./night-icon.svg";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = ({ theme, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    // console.log("onSwitch: ", theme, toggleTheme);

    const { user, logoutUser } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={isScrolled ? "active" : ""}>
            <div className="header-inner">
                <Link to="/">
                    <div className="header-inner-logo">
                        <img src="./logo-movie.png" alt="Movie Directory" />
                        <span>MovieDirectory</span>
                    </div>
                </Link>
                <nav></nav>
                <div className="header-inner-right">
                    {user ? (
                        <button onClick={logoutUser} className="">
                            Logout
                        </button>
                    ) : (
                        <NavLink to="/login">Login</NavLink>
                    )}
                    <button onClick={toggleTheme} className="theme-toggle">
                        <span
                            className="theme-toggle-icon light-icon"
                            style={{
                                backgroundImage: "url(./sun-warm-icon.svg)",
                                opacity: theme === "light" ? 0 : 1,
                            }}
                        ></span>
                        <span
                            className="theme-toggle-icon dark-icon"
                            style={{
                                backgroundImage: "url(.//night-icon.svg)",
                                opacity: theme === "dark" ? 0 : 1,
                            }}
                        ></span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
