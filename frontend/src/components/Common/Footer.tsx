import IMAGES from "@/assets/images/images";

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
                <a href="/" className="yt"></a>
                <a href="/" className="ig"></a>
                <a href="/" className="fb"></a>
                <a href="/" className="twit"></a>
            </div>
        </div>
    )
}

export default Footer;