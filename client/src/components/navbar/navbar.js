import React from 'react'
import './navbar.css'
import { FaGithub } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
function Navbar() {
    return(
        <div className="topnav">
                <a href="/" className="logoLeft" ><FaTwitter/></a>
                
                <a href="https://github.com/tarek-sanat/twitterWebsite" target="_blank" rel="noreferrer" className="logoRight"><FaGithub /></a>
        </div>
    )
}

export default Navbar;