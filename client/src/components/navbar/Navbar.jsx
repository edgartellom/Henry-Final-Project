import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (<>
        <nav class="container-fluid">
            <ul>
                <li><NavLink to="/"><strong>Marca</strong></NavLink></li>
            </ul>
            <ul>
                <li>
                <NavLink to="/login">Sing In</NavLink>
                </li>
                <li>
                    
                </li>
            </ul>
        </nav>
    </>)
};

export default Navbar;