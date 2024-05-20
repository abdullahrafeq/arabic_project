import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faYoutube, faGoogle } from '@fortawesome/free-brands-svg-icons';
import "./style.css"
import CustomLink from '../../components/custom-link/CustomLink';

const Footer = () => {
    return (
        <footer className="footer">
            <ul className="social-media">
                <li>
                    <CustomLink to="https://www.facebook.com" children={<FontAwesomeIcon icon={faFacebookF}/>}/>
                </li>
                <li>
                    <CustomLink to="https://www.instagram.com" children={<FontAwesomeIcon icon={faInstagram}/>}/>
                </li>
                <li>
                    <CustomLink to="https://www.X.com" children={<FontAwesomeIcon icon={faTwitter}/>}/>
                </li>
                <li>
                    <CustomLink to="https://www.youtube.com" children={<FontAwesomeIcon icon={faYoutube}/>}/>
                </li>
                <li>
                    <CustomLink to="https://www.Google.com" children={<FontAwesomeIcon icon={faGoogle}/>}/>
                </li>
            </ul>
            <ul className="services">
                <li>
                    <CustomLink to="/" children={<>Home</>}/>
                </li>
                <li>
                    <CustomLink to="/about-us" children={<>About Us</>}/>
                </li>
                <li>
                    <CustomLink to="contact-us" children={<>Contact Us</>}/>                    
                </li>
            </ul>
            <p className="copyright">
                Copytight ©2024 Designed by Abdullah Rafeq
            </p>
        </footer>
    )
}

export default Footer;