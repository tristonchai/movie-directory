import React, { createContext, useContext, useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import { account } from "../../appwrite";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        checkUserStatus();
        // setLoading(false);
    }, []);

    const loginUser = async (userInfo) => {
        setLoading(true);
        // pass to
        try {
            // passing email and password to appwrite to authenticate user account to get Session
            let response = await account.createEmailPasswordSession(
                userInfo.email,
                userInfo.password
            );

            let accountDetails = await account.get();

            // console.log("accountDetails: ", accountDetails, response);
            setUser(accountDetails);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const logoutUser = () => {
        account.deleteSession("current");
        setUser(null);
        navigate("/login");
    };

    const registerUser = async (userInfo) => {
        setLoading(true);
        const fullName = userInfo.firstName + " " + userInfo.lastName;
        try {
            let response = await account.create(
                // appwrite provide ID generation
                ID.unique(),
                userInfo.email,
                userInfo.password,
                fullName,
                userInfo.phone
            );

            await account.createEmailPasswordSession(
                userInfo.email,
                userInfo.password
            );

            let accountDetails = await account.get();
            // console.log("accountDetails: ", accountDetails, response);
            setUser(accountDetails);
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    const checkUserStatus = async () => {
        try {
            let accountDetails = await account.get();
            setUser(accountDetails);
        } catch (error) {
            console.error("Check user status failed:", error.message);
            if (error.code === 401) {
                // Unauthorized - no session or expired
                setUser(null);
                // navigate("/login"); // Uncomment if you want auto-redirect
            } else {
                // Other errors (e.g., network, server down)
                console.error("Unexpected error:", error);
                setUser(null);
            }
            // setUser(null); // Explicitly clear user if no session
            // navigate("/login"); // Redirect to login if unauthorized
        }
        setLoading(false);
    };

    // the datas that want to pass to AuthProvider => whole site
    const contextData = {
        user,
        loginUser,
        logoutUser,
        registerUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {/* to ensure the page is show after loaded completely */}
            {loading ? (
                <div className="loading-page">
                    <Spinner />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

// make the AuthContext as a custom hook
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
