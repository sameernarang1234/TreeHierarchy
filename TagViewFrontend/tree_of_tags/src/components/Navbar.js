import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {

  const [homeIsHovered, setHomeIsHovered] = useState(false);
  const handleHomeMouseEnter = () => {
    setHomeIsHovered(true)
  }
  const handleHomeMouseLeave = () => {
    setHomeIsHovered(false)
  }

  const [aboutIsHovered, setAboutIsHovered] = useState(false);
  const handleAboutMouseEnter = () => {
    setAboutIsHovered(true)
  }
  const handleAboutMouseLeave = () => {
    setAboutIsHovered(false)
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg" data-bs-theme='dark' style={{backgroundColor: "rgb(12, 16, 59)"}}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <strong>Welcome To TagTree</strong>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link 
                  className="nav-link active" 
                  aria-current="page" 
                  to="/"
                  style={{
                    color: homeIsHovered ? 'rgb(166, 166, 166)' : 'white',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={handleHomeMouseEnter}
                  onMouseLeave={handleHomeMouseLeave}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link active" 
                  aria-current="page" 
                  to="/about"
                  style={{
                    color: aboutIsHovered ? 'rgb(166, 166, 166)' : 'white',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={handleAboutMouseEnter}
                  onMouseLeave={handleAboutMouseLeave}>
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
