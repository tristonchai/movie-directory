import React, { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        dob: "",
    });
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
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
        } else if (key === "confirmPassword") {
            // if empty confirmPassword value
            if (!formData.confirmPassword) {
                tempErrors = {
                    ...tempErrors,
                    confirmPassword: "Please confirm your password",
                };
            } else if (value !== formData.password) {
                tempErrors = {
                    ...tempErrors,
                    confirmPassword: "Passwords do not match",
                };
            }
            // else remove confirmPassword msg
            else {
                const { confirmPassword, ...rest } = tempErrors;
                // console.log(password, rest, tempErrors);
                tempErrors = rest;
            }
        } else if (key === "firstName") {
            // if empty firstName value
            if (!formData.firstName) {
                tempErrors = {
                    ...tempErrors,
                    firstName: "First name is required",
                };
            }
            // else remove firstName msg
            else {
                const { firstName, ...rest } = tempErrors;
                // console.log(password, rest, tempErrors);
                tempErrors = rest;
            }
        } else if (key === "lastName") {
            // if empty lastName value
            if (!formData.lastName) {
                tempErrors = {
                    ...tempErrors,
                    lastName: "First name is required",
                };
            }
            // else remove lastName msg
            else {
                const { lastName, ...rest } = tempErrors;
                // console.log(password, rest, tempErrors);
                tempErrors = rest;
            }
        } else if (key === "phone") {
            // if empty phone value
            if (!formData.phone) {
                tempErrors = {
                    ...tempErrors,
                    phone: "Phone number is required",
                };
            }
            // if phone format is incorrect
            else if (!/^(?:\+?6?01[0-9]-?[0-9]{7,8})$/.test(formData.phone)) {
                tempErrors = {
                    ...tempErrors,
                    phone: "Invalid Malaysian phone number format (e.g., 0123456789)",
                };
            }
            // else remove phone msg
            else {
                const { phone, ...rest } = tempErrors;
                // console.log(password, rest, tempErrors);
                tempErrors = rest;
            }
        } else if (key === "dob") {
            // if empty dob value
            if (!formData.dob) {
                tempErrors = {
                    ...tempErrors,
                    dob: "Date of birth is required",
                };
            }
            // if dob format is incorrect
            else if (formData.dob) {
                const dob = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - dob.getFullYear();
                if (age < 13) {
                    tempErrors = {
                        ...tempErrors,
                        dob: "You must be at least 13 years old",
                    };
                } else {
                    const { dob, ...rest } = tempErrors;
                    // console.log(password, rest, tempErrors);
                    tempErrors = rest;
                }
            }
            // else remove phone msg
            // else {
            //     const { phone, ...rest } = tempErrors;
            //     // console.log(password, rest, tempErrors);
            //     tempErrors = rest;
            // }
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

            if (!formData.firstName) {
                // tempErrors.password = "Password is required";
                tempErrors = {
                    ...tempErrors,
                    firstName: "First name is required",
                };
            }

            if (!formData.lastName) {
                // tempErrors.password = "Password is required";
                tempErrors = {
                    ...tempErrors,
                    lastName: "First name is required",
                };
            }

            if (!formData.phone) {
                tempErrors = {
                    ...tempErrors,
                    phone: "Phone number is required",
                };
            }
            // if phone format is incorrect
            else if (!/^(?:\+?6?01[0-9]-?[0-9]{7,8})$/.test(formData.phone)) {
                // tempErrors.email = "Invalid email format";
                tempErrors = {
                    ...tempErrors,
                    phone: "Invalid Malaysian phone number format (e.g., 0123456789)",
                };
            }
        }

        setErrors(tempErrors);
        // console.log("tempErrors: ", tempErrors, errors);
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

    const handleVisibleConfirm = () => {
        // console.log("handleVisible");
        setShowConfirmPass(!showConfirmPass);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // console.log(e);
        if (validateForm()) {
            console.log("Login submitted", formData);
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
                        <h1>Edit Profile</h1>
                    </div>
                    <form
                        id="email"
                        className="login-panel-inner"
                        onSubmit={handleLogin}
                    >
                        <div className="login-panel-field-row">
                            <div className="login-panel-field">
                                <label htmlFor="firstname">First Name</label>
                                <div className="login-panel-field-container">
                                    <input
                                        type="text"
                                        placeholder="E.g. John"
                                        id="firstname"
                                        value={formData.firstName}
                                        // autoComplete="username"
                                        // required
                                        onChange={(e) => {
                                            handleChange(
                                                e.target.value,
                                                "firstName"
                                            );
                                        }}
                                        onBlur={(e) => {
                                            handleBlur(
                                                e.target.value,
                                                "firstName"
                                            );
                                        }}
                                    />
                                </div>
                                <span
                                    className={
                                        errors.firstName
                                            ? "errMsg show"
                                            : "errMsg"
                                    }
                                >
                                    {errors.firstName}
                                </span>
                            </div>
                            <div className="login-panel-field">
                                <label htmlFor="lasttname">Last Name</label>
                                <div className="login-panel-field-container">
                                    <input
                                        type="text"
                                        placeholder="E.g. Doe"
                                        id="lasttname"
                                        value={formData.lastName}
                                        // autoComplete="username"
                                        // required
                                        onChange={(e) => {
                                            handleChange(
                                                e.target.value,
                                                "lastName"
                                            );
                                        }}
                                        onBlur={(e) => {
                                            handleBlur(
                                                e.target.value,
                                                "lastName"
                                            );
                                        }}
                                    />
                                </div>
                                <span
                                    className={
                                        errors.lastName
                                            ? "errMsg show"
                                            : "errMsg"
                                    }
                                >
                                    {errors.lastName}
                                </span>
                            </div>
                        </div>
                        <div className="login-panel-field">
                            <label htmlFor="phoneField">
                                Phone (Malaysia +6)
                            </label>
                            <div className="login-panel-field-container">
                                <input
                                    type="number"
                                    placeholder="E.g. 0121234567"
                                    id="phoneField"
                                    value={formData.phone}
                                    // autoComplete="username"
                                    // required
                                    onChange={(e) => {
                                        handleChange(e.target.value, "phone");
                                    }}
                                    onBlur={(e) => {
                                        handleBlur(e.target.value, "phone");
                                    }}
                                />
                            </div>
                            <span
                                className={
                                    errors.phone ? "errMsg show" : "errMsg"
                                }
                            >
                                {errors.phone}
                            </span>
                        </div>
                        <div className="login-panel-field">
                            <label htmlFor="dobField">Date of Birth</label>
                            <div className="login-panel-field-container">
                                <input
                                    type="date"
                                    placeholder="E.g. 121234567"
                                    id="dobField"
                                    value={formData.dob}
                                    // autoComplete="username"
                                    // required
                                    onChange={(e) => {
                                        handleChange(e.target.value, "dob");
                                    }}
                                    onBlur={(e) => {
                                        handleBlur(e.target.value, "dob");
                                    }}
                                />
                            </div>
                            <span
                                className={
                                    errors.dob ? "errMsg show" : "errMsg"
                                }
                            >
                                {errors.dob}
                            </span>
                        </div>
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
                                    autoComplete="new-password"
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
                        <div className="login-panel-field">
                            <label htmlFor="confirmPasswordField">
                                Confirm Password
                            </label>
                            <div className="login-panel-field-container">
                                <input
                                    type={showConfirmPass ? "text" : "password"}
                                    placeholder="Enter your confirm password"
                                    id="confirmPasswordField"
                                    value={formData.confirmPassword}
                                    autoComplete="new-password"
                                    // required
                                    onChange={(e) => {
                                        handleChange(
                                            e.target.value,
                                            "confirmPassword"
                                        );
                                    }}
                                    onBlur={(e) => {
                                        handleBlur(
                                            e.target.value,
                                            "confirmPassword"
                                        );
                                    }}
                                />
                                <span
                                    className={
                                        showConfirmPass
                                            ? "icon visible"
                                            : "icon"
                                    }
                                    onClick={handleVisibleConfirm}
                                ></span>
                            </div>
                            <span
                                className={
                                    errors.confirmPassword
                                        ? "errMsg show"
                                        : "errMsg"
                                }
                            >
                                {errors.confirmPassword}
                            </span>
                        </div>

                        <div className="login-panel-btn">
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
