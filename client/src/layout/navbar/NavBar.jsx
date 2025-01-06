import "./style.css"
import CustomLink from "../../components/custom-link/CustomLink";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
    const { isLoggedIn, logout, isAdmin } = useAuth()
    const handleLogout = async () => {
        try {
            await logout()
        } catch (err) {
            console.error("Error during logout: err")
        }
    }
    
    return (
        <nav className="navbar">
            <div className="navbar-title">
                <CustomLink to="/" children={<FontAwesomeIcon icon={faBook}/>}/>
            </div>
            <div className="navbar-info">
                <ul>
                    <li><CustomLink to="/" children={<>Home</>}/></li>
                    <li><CustomLink to="/scholars" children={<>Scholars</>}/></li>
                    <li><CustomLink to="/books" children={<>Books</>}/></li>
                    <li><CustomLink to="/favourite-scholars" children={<>Favoutite Scholars</>}/></li>
                    <li><CustomLink to="/favourite-books" children={<>Favoutite Books</>}/></li>
                    <li><CustomLink to="/account" children={<>Account</>}/></li>
                    {isAdmin && 
                        <li><CustomLink to="/admin-guide" children={<>Admin Guide</>}/></li>
                    }
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