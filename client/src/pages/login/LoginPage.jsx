import "./style.css";
import Button from "../../components/button/Button";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
    const [action, setAction] = useState("login");

    const handleClick = (clickAction) => {
        if (action !== clickAction) {
            setAction(clickAction)
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
                        <FontAwesomeIcon icon={faEnvelope} />
                        <input type ="email" placeholder="E-mail"/>
                    </div>
                    <div className="input">
                        <FontAwesomeIcon icon={faLock} />
                        <input type ="password" placeholder="Password"/>
                    </div>
                    {action==="signup"?
                    <div className="input">
                        <FontAwesomeIcon icon={faLock} />
                        <input type ="password" placeholder="Confirm Password"/>
                    </div>:
                    <></>}
                </div>
                <div className="submit-container">
                    <Button 
                        className={action==="signup"?"submit-active":"submit-gray"} 
                        children={<>Sign Up</>}
                        onClick={() => handleClick("signup")}
                    />
                   <Button 
                        className={action==="login"?"submit-active":"submit-gray"} 
                        children={<>Login</>}
                        onClick={() => handleClick("login")}
                    />
                </div>
            </div>
        </div>
    )
}

export default LoginPage;