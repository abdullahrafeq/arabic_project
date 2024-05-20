import "./style.css"
import CustomLink from "../../components/custom-link/CustomLink";

const NavBar = () => {
    return (
        <nav className="navbar">
            <span className="navbar-logo">
                Logo
            </span>
            <span className="navbar-info">
                <ul>
                    <li>
                        <CustomLink to="/account" children={<>Account</>}/>
                    </li>
                    <li>
                        <CustomLink to="/login" children={<>Login</>}/>
                    </li>
                    <li>
                        <CustomLink to="/favourite-scholars" children={<>Favoutite Scholars</>}/>
                    </li>
                </ul>
            </span>
        </nav>
    )
}

export default NavBar;