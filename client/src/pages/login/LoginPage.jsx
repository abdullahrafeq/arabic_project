import "./style.css";
import Button from "../../components/button/Button";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [email, setEmail] = useState()
    const [action, setAction] = useState("login")
    const [isCorrectLogin, setIsCorrectLogin] = useState(true)
    const [isCorrectSignup, setIsCorrectSignup] = useState(true)
    const [userNameErrorMessage, setUsernameErrorMessage] = useState()
    const [emailErrorMessage, setEmailErrorMessage] = useState()
    const [passwordErrorMessage, setPasswordErrorMessage] = useState()
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState()
    const [isUserError, setIsUserError] = useState(false)
    const [isEmailError, setIsEmailError] = useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false)
    const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false)
    const { signup, getTokens, login, userData, setUserData, errorStatusUser } = useAuth()
    const navigate = useNavigate()

    const resetValues = () => {
        setUsername("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }
        
    const resetIncorrectValues = () => {
        setIsUserError(false)
        setIsEmailError(false)
        setIsPasswordError(false)
        setIsConfirmPasswordError(false)
        setIsCorrectLogin(true)
    }

    useEffect(() => {
        resetIncorrectValues()
    }, [])

    useEffect(() => {
        console.log("useEffect triggered:", { userData, errorStatusUser, action })
        if (action === "signup") {
            handleSignUpResponse(userData)
        } else if (action === "login") {
            handleLoginResponse(userData)
        }
    }, [userData, errorStatusUser, action, userNameErrorMessage, emailErrorMessage, passwordErrorMessage, confirmPasswordErrorMessage]);

    const handleSignUp = () => {
        signup("http://localhost:8000/api/register/", { 
            email, 
            username, 
            password,
            confirmPassword
        })
    }

    const handleLogin = () => {
        console.log(username, password)
        getTokens("http://localhost:8000/api/token/", { 
            username, 
            password 
        })
    }

    const handleSignUpResponse = (userData) => {
        if (userData === null) {
            if (errorStatusUser?.username) {
                setIsCorrectSignup(false)
                setIsUserError(true)
                setUsernameErrorMessage(errorStatusUser.username)
            }

            if (errorStatusUser?.email) {
                setIsCorrectSignup(false)
                setIsEmailError(true)
                setEmailErrorMessage(errorStatusUser.email)
            }

            if (errorStatusUser?.password) {
                setIsCorrectSignup(false)
                setIsPasswordError(true)
                setIsConfirmPasswordError(true)
                setConfirmPasswordErrorMessage(errorStatusUser.confirm_password)
                setPasswordErrorMessage(errorStatusUser.password)
            }

            return
        }

        resetValues()
        console.log("successfull")
    }

    const handleLoginResponse = (userData) => {
        console.log("here")
        if (userData === null) {
            if (errorStatusUser?.detail === "No active account found with the given credentials") {
                console.log("in my error")
                setIsCorrectLogin(false)
                setPasswordErrorMessage("Invalid username or password")
                setUsernameErrorMessage("Invalid username or password")
                return
            }

            if (errorStatusUser?.username) {
                console.log("in user error")
                setIsCorrectLogin(false)
                setIsUserError(true)
                setUsernameErrorMessage(errorStatusUser.username)
            }

            if (errorStatusUser?.password) {
                setIsCorrectLogin(false)
                setIsPasswordError(true)
                setPasswordErrorMessage(errorStatusUser.password)
            }
        }
        
        if (userData?.access) {
            resetValues()
            login({ username, email })
            console.log("userData: ", userData)
            navigate('/')
        }
    }
        
    const handleClick = (event, clickAction) => {
        event.preventDefault()
        resetIncorrectValues()
        setAction(clickAction)
        
        if (clickAction === "signup") {
            handleSignUp()
        } else if (clickAction === "login") {
            handleLogin()
        }
        setUserData(null)
    }

    return (
        <div className="login-page-container">
            <div className="login-container">
                <div className="login-header">
                    <h1>{action==="login"?
                        <>
                            Login
                        </>:
                        <>
                            Sign Up
                        </>}
                    </h1>
                    <div className="login-underline"></div>
                </div>
                <div className="login-inputs-container">
                    <div className="input">
                        <FontAwesomeIcon icon={faUser} />
                        <input 
                            type ="text" 
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {action === 'login' && !isCorrectLogin && <p>{userNameErrorMessage}</p>}
                        {action === 'signup' && !isCorrectSignup && isUserError && <p>{userNameErrorMessage}</p>}
                    </div>
                    {action === "signup" &&
                        <div className="input">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input 
                                type ="email" 
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {action === 'signup' && !isCorrectSignup && isEmailError && <p>{emailErrorMessage}</p>}
                        </div>
                    }
                    <div className="input">
                        <FontAwesomeIcon icon={faLock} />
                        <input 
                            type ="text" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {action === 'login' && !isCorrectLogin && <p>{passwordErrorMessage}</p>}
                        {action === 'signup' && !isCorrectSignup && isPasswordError && <p>{passwordErrorMessage}</p>}
                    </div>
                    {action==="signup" &&
                        <div className="input">
                            <FontAwesomeIcon icon={faLock} />
                            <input 
                                type ="text" 
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {action === 'signup' && !isCorrectSignup && isConfirmPasswordError && <p>{confirmPasswordErrorMessage}</p>}
                        </div>
                    }
                </div>
                <div className="submit-container">
                    <Button 
                        className={action==="signup"?"submit-active":"submit-gray"} 
                        children={<>Sign Up</>}
                        onClick={(event) => handleClick(event, "signup")}
                    />
                   <Button 
                        className={action==="login"?"submit-active":"submit-gray"} 
                        children={<>Login</>}
                        onClick={(event) => handleClick(event, "login")}
                    />
                </div>
            </div>
        </div>
    )
}

export default LoginPage;