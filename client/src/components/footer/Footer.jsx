import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="container center">
      <nav>
        <lu></lu>
        <ul >
          <li><NavLink to="/">About Us</NavLink></li>
          <li><NavLink to="/">Contact</NavLink></li>
          <li><NavLink to="/">Legal</NavLink></li>
          
        </ul>
        <lu></lu>
      </nav>
      <small>All rigths reserved. 2023</small>
    </footer>
  );
};

export default Footer;
