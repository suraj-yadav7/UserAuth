import React from "react";
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <header>
        <nav className="navbar">
          <ul className="navItem">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/registration">Registration</Link>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
