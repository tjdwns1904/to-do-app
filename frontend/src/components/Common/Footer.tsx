import IMAGES from "@/assets/images/images";
import { Link } from "react-router-dom";

const INSTAGRAM = "https://www.instagram.com/tjdwns99/";
const FACEBOOK = "https://www.facebook.com/profile.php?id=100008141106316";
const GITHUB = "https://github.com/tjdwns1904";
const LINKEDIN = "https://www.linkedin.com/in/seongjoon-hong-193a742b9/";

function Footer() {
    return (
        <div className="footer-container">
            <div>
                <div className="logo-name">
                    <img className="logo" src={IMAGES.logo} alt="" />
                    <h2>TodoList</h2>
                </div>
                <p>Join millions of people who organize<br /> work and life with TodoList.</p>
                <div className="footer-subcontainer">
                    <p>Security</p>
                    <p className="privacy">Privacy</p>
                    <p>Terms</p>
                    <p>ⓒ SJ</p>
                </div>
            </div>
            <div className="contact-container">
                <Link to={LINKEDIN} target="_blank" className="linkedin"/>
                <Link to={INSTAGRAM} target="_blank" className="ig"/>
                <Link to={FACEBOOK} target="_blank" className="fb"/>
                <Link to={GITHUB} target="_blank" className="github"/>
            </div>
        </div>
    )
}

export default Footer;