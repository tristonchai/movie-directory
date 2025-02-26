import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const { user, loginUser } = useAuth();
    const auth = useAuth();
    // console.log("auth: ", auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [showPass, setShowPass] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = (value, key) => {
        // let tempErrors = {};
        // let tempErrors = errors;
        let tempErrors = { ...errors };

        if (key === "email") {
            // if empty email value
            if (!formData.email) {
                // tempErrors.email = "Email is required";
                tempErrors = { ...tempErrors, email: "Email is required" };
            }
            // if email format is incorrect
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                // tempErrors.email = "Invalid email format";
                tempErrors = { ...tempErrors, email: "Invalid email format" };
            }
            // else remove error msg
            else {
                // delete tempErrors.email;
                const { email, ...rest } = tempErrors;
                // console.log(email, rest, tempErrors);
                tempErrors = rest;
            }
        } else if (key === "password") {
            // if empty password value
            if (!formData.password) {
                // tempErrors.password = "Password is required";
                tempErrors = {
                    ...tempErrors,
                    password: "Password is required",
                };
            }
            // else remove password msg
            else {
                // delete tempErrors.password;
                const { password, ...rest } = tempErrors;
                // console.log(password, rest, tempErrors);
                tempErrors = rest;
            }
        } else {
            if (!formData.email) {
                // tempErrors.email = "Email is required";
                tempErrors = { ...tempErrors, email: "Email is required" };
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                // tempErrors.email = "Invalid email format";
                tempErrors = { ...tempErrors, email: "Invalid email format" };
            }

            if (!formData.password) {
                // tempErrors.password = "Password is required";
                tempErrors = {
                    ...tempErrors,
                    password: "Password is required",
                };
            }
        }

        setErrors(tempErrors);
        console.log("tempErrors: ", tempErrors, errors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (newInfo, key) => {
        // console.log("handleChange: ", newInfo, key);
        setFormData((prevState) => ({
            ...prevState,
            [key]: newInfo,
        }));
    };

    const handleBlur = (value, key) => {
        // console.log("BLUR:", value, key);
        validateForm(value, key);
    };

    const handleVisible = () => {
        // console.log("handleVisible");
        setShowPass(!showPass);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // console.log(e);
        if (validateForm()) {
            console.log("Login submitted", formData);

            // pass to useAuth() hook
            loginUser(formData);
        }
    };

    return (
        <div className="login-container">
            <div className="login-container-inner">
                <div className="login-panel">
                    <div className="login-logo">
                        <Link to="/">
                            <div className="header-inner-logo">
                                <img
                                    src="./logo-movie.png"
                                    alt="Movie Directory"
                                />
                                {/* <span>MovieDirectory</span> */}
                            </div>
                        </Link>
                    </div>
                    <div className="login-title">
                        <h1>Welcome back!</h1>
                        <p>
                            New to MovieDirectory?{" "}
                            <Link to="/signup">Create an account.</Link>
                        </p>
                    </div>
                    <form
                        id="email"
                        className="login-panel-inner"
                        onSubmit={handleLogin}
                    >
                        <div className="login-panel-field">
                            <label htmlFor="emailField">Email</label>
                            <div className="login-panel-field-container">
                                <input
                                    type="text"
                                    placeholder="E.g. johndoe@gmail.com"
                                    id="emailField"
                                    value={formData.email}
                                    autoComplete="username"
                                    // required
                                    onChange={(e) => {
                                        handleChange(e.target.value, "email");
                                    }}
                                    onBlur={(e) => {
                                        handleBlur(e.target.value, "email");
                                    }}
                                />
                            </div>
                            <span
                                className={
                                    errors.email ? "errMsg show" : "errMsg"
                                }
                            >
                                {errors.email}
                            </span>
                        </div>
                        <div className="login-panel-field">
                            <label htmlFor="passwordField">Password</label>
                            <div className="login-panel-field-container">
                                <input
                                    type={showPass ? "text" : "password"}
                                    placeholder="Enter your password"
                                    id="passwordField"
                                    value={formData.password}
                                    autoComplete="current-password"
                                    // required
                                    onChange={(e) => {
                                        handleChange(
                                            e.target.value,
                                            "password"
                                        );
                                    }}
                                    onBlur={(e) => {
                                        handleBlur(e.target.value, "password");
                                    }}
                                />
                                <span
                                    className={
                                        showPass ? "icon visible" : "icon"
                                    }
                                    onClick={handleVisible}
                                ></span>
                            </div>
                            <span
                                className={
                                    errors.password ? "errMsg show" : "errMsg"
                                }
                            >
                                {errors.password}
                            </span>
                        </div>
                        <div className="login-panel-field-remember">
                            <input
                                type="checkbox"
                                id="rmbMe"
                                value={formData.rememberMe}
                                onChange={(e) => {
                                    handleChange(
                                        e.target.checked,
                                        "rememberMe"
                                    );
                                }}
                            />
                            <label htmlFor="rmbMe">Remember Me</label>
                        </div>
                        <div className="login-panel-btn">
                            <button>Login</button>
                        </div>
                        <div className="login-panel-footer">
                            <Link to="/">Back to home page</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
