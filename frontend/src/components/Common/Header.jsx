import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.jpg';

function Header() {
    return (
        <>
            <div className="header-container">
                <Link to={'/'}><img className="logo" src={logo} alt="" /></Link>
                <div className="authenticate">
                    <Link to={'/login'} className="headerLink">Sign in</Link>|<Link to={'/signup'} className="headerLink">Sign up</Link>
                </div>
            </div>
        </>
    )
}

export default Header;