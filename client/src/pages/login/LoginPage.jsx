import "./style.css";
import Button from "../../components/button/Button";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";

const LoginPage = () => {
    const { setAuthUser, setIsLoggedIn } = useAuth()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [email, setEmail] = useState()
    const [action, setAction] = useState("login");
    const [isUsernameExisting, setIsUsernameExisting] = useState(false)
    const [isEmailExisting, setIsEmailExisting] = useState(false)
    const [isCorrectLogin, setIsCorrectLogin] = useState(true)
    const [isMatchingPassowrd, setIsMatchingPassword] = useState(true)
    const [userNameErrorMessage, setUsernameErrorMessage] = useState()
    const [emailErrorMessage, setEmailErrorMessage] = useState()
    const [passwordErrorMessage, setPasswordErrorMessage] = useState()
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState()
    const [isUserError, setIsUserError] = useState(false)
    const [isEmailError, setIsEmailError] = useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false)
    const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false)

    const resetValues = () => {
        setUsername("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }
        
    const resetIncorrectValues = () => {
        setIsUsernameExisting(false)
        setIsEmailExisting(false)
        setIsMatchingPassword(true)
        setIsUserError(false)
        setIsEmailError(false)
        setIsPasswordError(false)
        setIsConfirmPasswordError(false)
    }

    const { appendData: registerUser, data, setData, errorStatus, setErrorStatus } = useFetch("http://localhost:8000/api/register/", {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password,
            confirm_password: confirmPassword
        }),
    })
    
    useEffect(() => {
        console.log("useEffect triggered:", { data, errorStatus, action });
        if (action === "signup") {
            handleSignUpResponse(data);
        } else if (action === "login") {
            handleLoginResponse(data);
        }
    }, [data, errorStatus, action, userNameErrorMessage, emailErrorMessage, passwordErrorMessage, confirmPasswordErrorMessage]);

    const handleSignUp = () => {
        registerUser("http://localhost:8000/api/register/", { 
            email: email, 
            username: username, 
            password: password ,
            confirm_password: confirmPassword
        })
    }

    const handleLogin = () => {
        console.log(username, password)
        registerUser("http://localhost:8000/api/token/", { 
            username: username, 
            password: password 
        })
    }

    const handleSignUpResponse = (data) => {
        console.log("in handle signup response")
        console.log("data: ", data)
        if (data === null) {
            if (errorStatus?.username) {
                setIsUserError(true)
                if (errorStatus.username === "Username already exists") {
                    console.log("existing username")
                    setIsUsernameExisting(true)
                }
                setUsernameErrorMessage(errorStatus.username)
            } 
                
            if (errorStatus?.email) {
                setIsEmailError(true)
                if (errorStatus.email === "Email already exists") {
                    console.log("existing email")
                    setIsEmailExisting(true)
                }
                setEmailErrorMessage(errorStatus.email)
            }

            if (errorStatus?.password) {
                setIsPasswordError(true)
                setIsConfirmPasswordError(true)
                if (errorStatus?.password === "Passwords do not match") {
                    console.log("passwords dont match")
                    setIsMatchingPassword(false)
                }
                setConfirmPasswordErrorMessage(errorStatus.password)
                setPasswordErrorMessage(errorStatus.password)
            }

            if (errorStatus?.confirm_password) {
                setIsConfirmPasswordError(true)
                setConfirmPasswordErrorMessage(errorStatus.confirm_password)
            }
            return
        }

        resetValues()
        console.log("successfull")
    }

    const handleLoginResponse = (data) => {
        if (data === null) {
            if (errorStatus?.detail === "No active account found with the given credentials") {
                console.log("invalid login")
                setIsCorrectLogin(false)
                return
            }
        }

        resetValues()
        setIsCorrectLogin(true)
        setIsLoggedIn(true)
        console.log("data: ", data)


        setAuthUser({
            username: username,
            email: email, 
        })
    }
        
    const handleClick = (event, clickAction) => {
        event.preventDefault();
        resetIncorrectValues()
        setAction(clickAction)

        if (clickAction === "signup") {
            console.log("in signup")
            handleSignUp()
        } else {
            console.log("in login")
            handleLogin()
        }
        setData(null)
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
                        {action === 'login' && !isCorrectLogin && <p>invalid input</p>}
                        {action === 'signup' && isUserError && <p>{userNameErrorMessage}</p>}
                    </div>
                    {action==="signup" &&
                    <div className="input">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <input 
                            type ="email" 
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {action === 'signup' && isEmailError && <p>{emailErrorMessage}</p>}
                    </div>}
                    <div className="input">
                        <FontAwesomeIcon icon={faLock} />
                        <input 
                            type ="text" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {action === 'login' && !isCorrectLogin && <p>invalid input</p>}
                        {action === 'signup' && isPasswordError && <p>{passwordErrorMessage}</p>}
                    </div>
                    {action==="signup"&&
                    <div className="input">
                        <FontAwesomeIcon icon={faLock} />
                        <input 
                            type ="text" 
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {action === 'signup' && isConfirmPasswordError && <p>{confirmPasswordErrorMessage}</p>}
                    </div>}
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