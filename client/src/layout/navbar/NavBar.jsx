import "./style.css"
import CustomLink from "../../components/custom-link/CustomLink";

const NavBar = () => {
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
                    <li><CustomLink to="/account" children={<>Account</>}/></li>
                    <li><CustomLink to="/login" children={<>Login</>}/></li>
                    <li><CustomLink to="/favourite-scholars" children={<>Favoutite Scholars</>}/></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;