import { NavLink } from "react-router-dom";
import useCommonStore from "../../store/commons";
import { shallow } from "zustand/shallow";
import "@picocss/pico";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./navbar.css";
import "./bootstrap.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";
import "firebase/app";
import "firebase/auth";

import SearchBar from "../searchbar/SearchBar";
import { getTotals } from "../../store/ShoppingCartRedux";

import { useUserContext } from "../../components/contexts/userContexts";
import useUserStore from "../../store/users";
import useCartStore from "../../store/shoppingCartZustand";

const Navbar = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [menu, setMenu] = useState(false);
  const theme = useCommonStore((state) => state.theme, shallow);
  const { changeTheme } = useCommonStore();

  //const currentUser = useUserStore((state) => state.currentUser);

  const dispatch = useDispatch()
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const cart = useSelector((state)=> state.cart.cartItems)
  const navigate = useNavigate();
  const [userId, setUserId] = useState('')
  const getUserById = useUserStore((state) => state.getUserById);
  const { user2 } = useUserContext();

  /////////////////////////////
  const cart2 = useSelector((state) => state.cart);
  const createProduct = useCartStore((state) => state.createProduct)
  const idCart = useUserStore((state) => state.idCart) 
  const idExistente = '0034cadd-0efe-4511-be19-9b680649f35d'
  //idcart[0].id => line 47
  const aux = cart.map((i) => {
    const carritoId = idCart[0].id
    return {...i, carritoId}
  })

  
  const aux2 = aux.map((e) => {
    const { cartQuantity, id, carritoId, ...rest } = e;
    return { ...rest, quantity: cartQuantity, productId:id, cartId:carritoId };
  })
  

  // const cartUid = await axios.post(`http://localhost:3001/carts`, {userId}, {
  //   headers: {"content-type": "application/json"}
  //})

  useEffect(() => {
    if (user2) {
      const obtenerUsuario = (async () => {
        const userDb = await getUserById(user.uid);
        if (userDb) {
          setUserId(userDb.id)
          console.log(userId)
        }
      })();
      console.log("first")
      
    }
  }, [user2]);


/////////////////////////////////////
  useEffect(()=> {
    dispatch(getTotals());
  },[cart, cartTotalQuantity])

  const perfil=user?false:true

if (!user) {
  ("");
} else {
 var iduser = user.uid;
}


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


      console.log("logging out")
      const verify = createProduct(aux2)
      console.log(aux2)
      console.log(verify.data)
      console.log(idCart[0].id)



      await signOut(auth);
      alert("Sign-out successful");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <nav className="container-fluid">
        <ul className="logo">
          <li>
            <NavLink to="/">
              <strong style={{ textAlign: "left" }}>BESTIFY-PC</strong>
            </NavLink>
          </li>
        </ul>

        <ul className="search">
          <li>
            <SearchBar></SearchBar>
          </li>
        </ul>

        <ul className="container-x">
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
                {user ? (
                  <>
                    <li>
                      <NavLink to={`/profile/${iduser}`}>Profile</NavLink>
                    </li>
                    <li>
                      <NavLink to="/" onClick={handleLogout}>
                        Sign out
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/admin">admin</NavLink>
                    </li>
                  </>
                ) : (
                  <li>
                    <NavLink to="/sign-in">Sign in</NavLink>
                  </li>
                )}
              </ul>
            </details>
          </li>
          <li data-tooltip="Go to cart" data-placement="bottom">
            <NavLink to="/cart">
              <i className="bi bi-cart"></i>
              <strong>
                {/* <sup>{cartTotalQuantity}</sup> */} 
                {/* <sup>{carts.length}</sup> */}
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
                  {user ? (
                    <>
                      <li>
                        <NavLink to="/profile">Profile</NavLink>
                      </li>
                      <li>
                        <NavLink to="/" onClick={handleLogout}>
                          Sign out
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <li>
                      <NavLink to="/sign-in">Sign in</NavLink>
                    </li>
                  )}
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
