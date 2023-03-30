import { NavLink } from "react-router-dom";
import useCommonStore from "../../store/commons";
import { shallow } from "zustand/shallow";
import "./navbar.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const theme = useCommonStore((state) => state.theme, shallow);
  const { changeTheme } = useCommonStore();
  const {cartTotalQuantity} = useSelector((state) => state.cart)

  useEffect(()=> {

  },[cartTotalQuantity])

  const ChangeTheme = (e) => {
    e.preventDefault();
    changeTheme();
  };

  const changeMenu = (e) => {
    e.preventDefault();
    setMenu(!menu);
  };

  return (
    <>
      <nav className="container-fluid navbar-container">
        <ul>
          <li>
            <NavLink to="/">
              <strong>Marca</strong>
            </NavLink>
          </li>
        </ul>

        <ul className="menu-items">
          <li>
            <input
              type="search"
              className="search"
              id="search"
              name="search"
              placeholder="Search"
            />
          </li>
          <li>
            <details role="list" dir="list">
              <summary aria-haspopup="list-box" role="list">
                Items
              </summary>
              <ul role="list-box">
                <li>
                  <NavLink to="/products">Desktops</NavLink>
                </li>
                <li>
                  <NavLink to="/products">Laptops</NavLink>
                </li>
                <li>
                  <NavLink to="/products">Accesories</NavLink>
                </li>
                <li>
                  <NavLink to="/create">Create a product</NavLink>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details role="list" dir="rtl">
              <summary aria-haspopup="listbox" role="list">
                <i className="bi bi-person-circle"></i>
              </summary>
              <ul role="listbox">
                <li>
                  <NavLink to="/">perfil</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <NavLink to="/cart">
              <i className="bi bi-cart"></i>
              <strong>
                <sup>{cartTotalQuantity}</sup>
              </strong>
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={ChangeTheme}>
              {theme ? (
                <i className="bi bi-sun"></i>
              ) : (
                <i className="bi bi-moon"></i>
              )}
            </NavLink>
          </li>
        </ul>
        <ul className="menu-icon">
          <li>
            <NavLink to="/" onClick={changeMenu}>
              <i className="bi bi-list"></i>
            </NavLink>
          </li>
        </ul>
      </nav>
      <aside className={menu ? "side-s container" : "side-h"}>
        <nav>
          <ul>
            <li>
              <input
                type="search"
                className="search"
                id="search"
                name="search"
                placeholder="Search"
                height="30%"
              />
            </li>
            <li>
              <details role="list" dir="list">
                <summary aria-haspopup="list-box" role="list">
                  Items
                </summary>
                <ul role="list-box">
                  <li>
                    <NavLink to="/">Desktops</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Laptops</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Accesories</NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details role="list" dir="rtl">
                <summary aria-haspopup="listbox" role="list">
                  <i className="bi bi-person-circle"></i>
                </summary>
                <ul role="listbox">
                  <li>
                    <NavLink to="/">perfil</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <NavLink to="/">
                <i className="bi bi-cart"></i>
                <strong>
                  <sup>4</sup>
                </strong>
              </NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={ChangeTheme}>
                {theme ? (
                  <i className="bi bi-sun"></i>
                ) : (
                  <i className="bi bi-moon"></i>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
