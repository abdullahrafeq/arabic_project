import { Link } from "react-router-dom";
import "./style.css"

const CustomLink = ({ className, to, children, onClick, ...props }) => {

    return (
        <Link className={`custom-link ${className}`} to={to} onClick={onClick} {...props}>
            {children}
        </Link>
    );
  };

  export default CustomLink;