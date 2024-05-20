import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./style.css"

const CustomLink = ({ className, to, children, ...props }) => {
    //const resolvedPath = useResolvedPath(to);
    //const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    
    return (
        <Link className={`custom-link ${className}`} to={to} {...props}>
            {children}
        </Link>
    );
  };

  export default CustomLink;