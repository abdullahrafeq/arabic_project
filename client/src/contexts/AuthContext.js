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
    
    const { 
        data: userData, 
        setData: setUserData,
        appendData: registerUser,
        errorStatus: errorStatusUser,
        setErrorStatus: setErrorStatusUser 
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

    const signup = (url, { email, username, password, confirmPassword }) => {
        registerUser(url, { 
            email: email || "", 
            username: username || "", 
            password: password || "", 
            confirm_password: confirmPassword || "", 
        })
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
            if (response?.access) {
                localStorage.setItem("accessToken", response.access);
                setToken(response.access);
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
     

    const logout = () => {
        setUserData(null)
        setIsLoggedIn(false)
        localStorage.clear()
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
        login
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }