import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = () => {
    // access AuthContext function and user state
    const { user } = useAuth();

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
