import React from "react";
import { useState, useEffect } from "react";

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const login = () => setIsLoggedIn(true)
    const logout = () => {
        console.log("in logout i authcontext")
        localStorage.clear() // Assuming you store tokens in localStorage
        console.log("localstorage is: " + localStorage)
        setIsLoggedIn(false)
    }

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setIsLoggedIn(!!token); // Set isLoggedIn based on token presence
    }, []); // Only run on mount

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }