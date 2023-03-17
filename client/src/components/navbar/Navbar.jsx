import { NavLink } from "react-router-dom";
import "./navbar.css"

const Navbar = () => {
    return (<>
        <nav className="container-fluid">
            <ul>
                <li><NavLink to="/"><strong>Marca</strong></NavLink></li>
            </ul>
            
            <ul>
                <li><input type="search" className="search" id="search" name="search" placeholder="Search" height="30%"/></li>
                <li>
                    <details role="list" dir="list">
                        <summary aria-haspopup="list-box" role="list">Items</summary>
                        <ul role="list-box">
                            <li>Desktops</li>
                            <li>Laptops</li>
                            <li>Accesories</li>
                            <li>Software</li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details role="list" dir="rtl">
                        <summary aria-haspopup="listbox" role="list"><i className="bi bi-person-circle"></i></summary>
                        <ul role="listbox">
                            <li><NavLink to="/">perfil</NavLink></li>
                            <li><NavLink to="/login">Login</NavLink></li>
                        </ul>
                    </details>
                </li>
                <li>
                <NavLink to="/"><i className="bi bi-cart"></i><strong ><sup>4</sup></strong></NavLink>
                </li>
                <li>
                    <NavLink to="/"><i className="bi bi-sun"></i></NavLink>
                </li>
            </ul>
        </nav>
    </>)
};

export default Navbar;