import React from "react";
import { NavLink } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="container">
      <nav>
        <ul></ul>
        <ul>
          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/">Legal</NavLink>
          </li>
        </ul>
        <ul></ul>
      </nav>
      <small>All rigths reserved. 2023</small>
    </footer>
  );
};

export default Footer;
