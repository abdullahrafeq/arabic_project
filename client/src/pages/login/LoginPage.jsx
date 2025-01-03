import "./style.css";
import Button from "../../components/button/Button";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom"
import { Oval } from 'react-loader-spinner'


const LoginPage = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [email, setEmail] = useState()
    const [action, setAction] = useState("login")
    const [isCorrectLogin, setIsCorrectLogin] = useState(true)
    const [isCorrectSignup, setIsCorrectSignup] = useState(true)
    const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
    const [errMsgs, setErrMsgs] = useState({})
    const { login, signup, isLoading } = useAuth()
    const navigate = useNavigate()


    const resetValues = () => {
        setUsername("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }

    const handleSignUp = async () => {
        try {
            await signup("http://localhost:8000/api/register/", { 
                email, 
                username, 
                password,
                confirmPassword
            })
            resetValues()
        } catch (err) {
            console.error("In signup page error: ", err)
            setIsCorrectSignup(false)
            setErrMsgs(err)
        } finally {
            //resetValues()
        }
    }

    const handleLogin = async () => {
        try {
            const result = await login("http://localhost:8000/api/login/", username, password);            
            resetValues()
            if (result?.tokens?.access) {
                console.log("Login successful, navigating to homepage...");
                navigate("/")
            }
        } catch (err) {
            console.error("In login page error: ", err)
            setIsCorrectLogin(false)
            setErrMsgs(err)
        } finally {
            //resetValues()
        }
    }

    const handleClick = (event, clickAction) => {
        event.preventDefault()
        
        if (action !== clickAction) {
            setAction(clickAction);
            setHasAttemptedSubmit(false); // Reset submit trigger
            return // Prevent fetching when switching modes
        }
        if (clickAction === "signup") {
            setHasAttemptedSubmit(true);
            handleSignUp()
        } else if (clickAction === "login") {
            setHasAttemptedSubmit(true);
            handleLogin()
        }
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
                        {hasAttemptedSubmit && action === 'login' && !isCorrectLogin && "username" in errMsgs && <p>{errMsgs?.username}</p>}
                        {hasAttemptedSubmit && action === 'signup' && !isCorrectSignup && "username" in errMsgs && <p>{errMsgs?.username}</p>}
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
                            {hasAttemptedSubmit && action === 'signup' && !isCorrectSignup && "email" in errMsgs && <p>{errMsgs?.email}</p>}
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
                        {hasAttemptedSubmit && action === 'login' && !isCorrectLogin && "password" in errMsgs && <p>{errMsgs?.password}</p>}
                        {hasAttemptedSubmit && action === 'signup' && !isCorrectSignup && "password" in errMsgs && <p>{errMsgs?.password}</p>}
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
                            {hasAttemptedSubmit && action === 'signup' && !isCorrectSignup && "confirm_password" in errMsgs && <p>{errMsgs?.confirm_password}</p>}
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
                {isLoading &&
                    <div>
                        <Oval
                            height={40} 
                            width={40} 
                            color="#555" /* Neutral gray or preferred color */
                            secondaryColor="#ddd" /* Optional lighter color */
                            ariaLabel="oval-loading"
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default LoginPage;