import React from "react";
import { useState, useEffect } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import useFetch from "../hooks/useFetch";

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { currentUser, requestCurrentUser, errorStatusCurrentUser } = useCurrentUser()
    const [token, setToken] = useState(localStorage.getItem('accessToken'))
    
    const { 
        appendData: registerUser, 
        data: userData, 
        setData: setUserData, 
        errorStatus: errorStatusUser,
        setErrorStatus: setErrorStatusUser 
    } = useFetch("http://localhost:8000/api/register/", {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const signup = (url, { email, username, password, confirmPassword }) => {
        registerUser(url, { 
            email: email, 
            username: username, 
            password: password, 
            confirm_password: confirmPassword 
        })
    }

    const getTokens = (url, { username, password }) => {
        registerUser(url, {
            username: username,
            password: password
        })
    }

    const login = ({ username, email }) => {
        console.log("in auth login")
        setToken(localStorage.getItem('accessToken'))
        localStorage.setItem('accessToken', userData.access);
        console.log("Access token saved to localStorage:", userData.access);
        setAuthUser({ username: username, email: email, })
        setIsLoggedIn(true)
    }

    const logout = () => {
        localStorage.clear()
        setIsLoggedIn(false)
        setAuthUser(null)
    }

    useEffect(() => {
        console.log("currentUser: " + currentUser)
    }, [])
    
    useEffect(() => {
        console.log("user is: " + currentUser)
        if (currentUser) {
            setAuthUser(currentUser)
        } else if (errorStatusUser) {
            setAuthUser(null)
        }
    }, [currentUser, errorStatusUser])

    const value = {
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
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            <div>
                {authUser?.username}
            </div>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }