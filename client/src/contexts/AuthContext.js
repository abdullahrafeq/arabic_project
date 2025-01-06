import React from "react";
import { useState, useEffect } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import useFetch from "../hooks/useFetch";
import { useBaseUrl } from "./BaseUrlContext";

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { 
        currentUser, updateCurrentUser, requestCurrentUser, errorStatusCurrentUser, 
        isSuccessfulUpdate, isFailedUpdate, setSuccessfulUpdate, setFailedUpdate, updateHeaders } = useCurrentUser()
    const [token, setToken] = useState(localStorage.getItem('accessToken'))
    const [isAdmin, setAdmin] = useState(false)
    const BASE_URL = useBaseUrl()

    const { 
        data: userData, 
        setData: setUserData,
        appendData: registerUser,
        errorStatus: errorStatusUser,
        setErrorStatus: setErrorStatusUser,
        isLoading
    } = useFetch(BASE_URL+"/api/register/", {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const updateUser = async (url, {email, username, oldPassword, newPassword}) => {
        try {
            console.log(localStorage.getItem("accessToken"))
            await updateCurrentUser(url, {
                username: username || authUser?.user?.username, 
                email: email || authUser?.user?.email,         
                old_password: oldPassword || "",
                new_password: newPassword || ""
            }, { token: localStorage.getItem("accessToken") })
            const user = await requestCurrentUser({ token: localStorage.getItem("accessToken") }); // Fetch user details immediately
            setAuthUser(user)
        } catch (err) {
            console.error("Error during update: ", err)
            throw err
        }
    }

    const signup = async (url, { email, username, password, confirmPassword }) => {
        try {
            const response = await registerUser(url, { 
                email: email || "", 
                username: username || "", 
                password: password || "", 
                confirm_password: confirmPassword || "", 
            })

            console.log(response)
            return response;
        } catch (err) {
            console.log("Error during signup: ", err)
            throw err
        }
    }
    
    const getTokens = (url, { username, password }) => {
        return registerUser(url, {
            username: username || "",
            password: password || ""
        })
    }

    const login = async (url, username, password) => {
        console.log("in auth login2")
        try {
            const response = await getTokens(url, { username, password })
            console.log(response)
            if (response?.tokens?.access) {
                localStorage.setItem("accessToken", response.tokens.access);
                setToken(response.tokens.access);
                setIsLoggedIn(true);
                const user = await requestCurrentUser({ token: response.tokens.access }); // Fetch user details immediately
                setAuthUser(user)
                console.log(user)
                console.log("User successfully logged in");
                return response;
            }
        } catch (err) {
            setAuthUser(null)
            console.error("Error during login: ", err)
            throw err
        }
    }
     

    const logout = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            console.warn("No refresh token found. User already logged out.");
            setIsLoggedIn(false);
            setAuthUser(null);
            localStorage.clear();
            return;
        }
        try {
            await registerUser(BASE_URL+"/api/logout/", { 
                refresh_token: refreshToken 
            })
            console.log("User successfully logged out");

            // Clear auth state and localStorage
            setIsLoggedIn(false);
            setAuthUser(null);
            localStorage.clear();
        } catch (err) {
            console.error("Error during logout:", err);
        }
    }

    useEffect(() => {
        console.log("AuthProvider mounted!");
        console.log("currentUser:", currentUser);
        localStorage.clear()
    }, [])
    
    useEffect(() => {
        if (authUser) {
            setAdmin(authUser?.user?.is_superuser || false)
            console.log(authUser)
            console.log("isAdmin: ", isAdmin)
        } else {
            setAdmin(false)
            console.log("here")
        }
    }, [authUser, isAdmin])

    const value = {
        currentUser,
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        signup,
        getTokens,
        userData,
        setUserData,
        errorStatusUser,
        setErrorStatusUser,
        logout,
        updateUser,
        isSuccessfulUpdate, 
        isFailedUpdate,
        requestCurrentUser,
        setSuccessfulUpdate, 
        setFailedUpdate,
        isAdmin,
        token,
        login,
        isLoading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }