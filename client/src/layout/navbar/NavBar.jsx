import "./style.css"
import CustomLink from "../../components/custom-link/CustomLink";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NavBar = () => {
    const { isLoggedIn, logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate("/login")
    }
    useEffect(() => {
        console.log("isLoggedIn: " + isLoggedIn)
    }, [isLoggedIn])
    
    return (
        <nav className="navbar">
            <div className="navbar-title">
                <CustomLink to="/" children={<>Logo</>}/>
            </div>
            <div className="navbar-info">
                <ul>
                    <li><CustomLink to="/" children={<>Home</>}/></li>
                    <li><CustomLink to="/scholars" children={<>Scholars</>}/></li>
                    <li><CustomLink to="/books" children={<>Books</>}/></li>
                    <li><CustomLink to="/favourite-scholars" children={<>Favoutite Scholars</>}/></li>
                    <li><CustomLink to="/favourite-books" children={<>Favoutite Books</>}/></li>
                    <li><CustomLink to="/account" children={<>Account</>}/></li>
                    <li>
                        {isLoggedIn ? 
                            <CustomLink to="/login" children={<>Logout</>} onClick={handleLogout}/>
                         : <CustomLink to="/login" children={<>Login</>}/>}
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;