import React from "react";
import { NavLink } from "react-router-dom";
import "./footer.css";


const Footer = () => {
  return (
    <footer>
      <div className="container-secundario">
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

      </nav>
      </div>
      <div className="conteiner-redes">
      <h3>Seguinos en</h3>
      <div className="redes">
          <a href="https://www.facebook.com/profile.php?id=100009931907774">Facebook</a>
          <a href="https://www.instagram.com/gonzaleguizaa/">instagram</a>
          <a href="https://www.linkedin.com/in/gonzalo-leguiza-75b155200/">linkedin</a>
        </div>
      

      </div>
   
      <small>All rigths reserved. 2023</small>
    </footer>
  );
};

export default Footer;
