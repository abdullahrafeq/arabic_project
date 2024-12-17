import React from "react";
import { useState, useEffect } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import useFetch from "../hooks/useFetch";

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { 
        currentUser, updateCurrentUser, requestCurrentUser, errorStatusCurrentUser, 
        isSuccessfulUpdate, isFailedUpdate, setSuccessfulUpdate, setFailedUpdate } = useCurrentUser()
    const [token, setToken] = useState(localStorage.getItem('accessToken'))
    const [isAdmin, setAdmin] = useState(false)
    const [errMsgs, setErrMsgs] = useState({})

    const { 
        data: userData, 
        setData: setUserData,
        appendData: registerUser,
        errorStatus: errorStatusUser,
        setErrorStatus: setErrorStatusUser,
        isLoading
    } = useFetch("http://localhost:8000/api/register/", {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const updateUser = (url, {email, username, oldPassword, newPassword}) => {
        updateCurrentUser(url, {
            username: username || currentUser?.user?.username, 
            email: email || currentUser?.user?.email,         
            old_password: oldPassword || "",
            new_password: newPassword || ""
        })
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
                const user = await requestCurrentUser(); // Fetch user details immediately
                setAuthUser(user)
                console.log(user)
                console.log("User successfully logged in");
                return response;
            }
        } catch (err) {
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
            await registerUser("http://localhost:8000/api/logout/", { 
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
    }, [])
    
    useEffect(() => {
        if (currentUser) {
            setAdmin(currentUser?.is_superuser || false)
            console.log(currentUser)
        } else if (errorStatusUser) {
            setAdmin(false)
        }
    }, [currentUser, errorStatusUser])

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