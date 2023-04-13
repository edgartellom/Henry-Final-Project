import { NavLink } from "react-router-dom";
import useCommonStore from "../../store/commons";
import { shallow } from "zustand/shallow";
import "./navbar.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAuth } from "firebase/auth";
import ErrorAlert from "../alert/ErrorAlert";
import "firebase/app";
import "firebase/auth";

import SearchBar from "../searchbar/SearchBar";
import { getTotals } from "../../store/ShoppingCartRedux";


const Navbar = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [menu, setMenu] = useState(false);
  const theme = useCommonStore((state) => state.theme, shallow);
  const { changeTheme } = useCommonStore();

  const dispatch = useDispatch()
  const {cartTotalQuantity, cart} = useSelector((state) => state.cart)
  const carts = useSelector((state) => state.cart.cartItems)
  

  useEffect(()=> {
    dispatch(getTotals());
  },[cart, cartTotalQuantity])

  const ChangeTheme = (e) => {
    e.preventDefault();
    changeTheme();
  };

  const changeMenu = (e) => {
    e.preventDefault();
    setMenu(!menu);
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await signOut(auth);
      // Sign-out successful.
      return (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="info">You have logged out!</Alert>
        </Stack>
      );
    } catch (error) {
      <ErrorAlert error={error} />;
    }
  };

  return (
    <>
      <nav className="container-fluid">
        <ul>
          <li>
            <NavLink to="/">
              <strong style={{ textAlign: "left" }}>BESTIFY-PC</strong>
            </NavLink>
          </li>
        </ul>

        <ul className="menu-items">
          <li>
            <SearchBar></SearchBar>
          </li>
          <li>
            <details role="list" dir="list">
              <summary aria-haspopup="list-box" role="list">
                Items
              </summary>
              <ul role="list-box">
                {/* <li>
                  <NavLink to="/products">Desktops</NavLink>
                </li>
                <li>
                  <NavLink to="/products">Laptops</NavLink>
                </li> */}
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
                  <NavLink to="/">Profile</NavLink>
                </li>
                <li>
                  {user ? (
                    <NavLink to="/sign-in">Sign in</NavLink>
                  ) : (
                    <NavLink to="/" onClick={handleLogout}>
                      Sign out
                    </NavLink>
                  )}
                </li>
              </ul>
            </details>
          </li>
          <li data-tooltip="Go to cart" data-placement = "bottom">
            <NavLink to="/cart">
              
              <i className="bi bi-cart"></i>
              <strong>
                {/* <sup>{cartTotalQuantity}</sup> */} 
                <sup>{carts.length}</sup>
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
                  {/* <li>
                    <NavLink to="/">Desktops</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Laptops</NavLink>
                  </li> */}
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
                    <NavLink to="/">Profile</NavLink>
                  </li>
                  <li>
                    {user ? (
                      <NavLink to="/sign-in">Sign in</NavLink>
                    ) : (
                      <NavLink to="/" onClick={handleLogout}>
                        Sign out
                      </NavLink>
                    )}
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
