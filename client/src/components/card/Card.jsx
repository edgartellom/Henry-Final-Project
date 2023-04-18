import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/shoppingCartRedux";
import useUserStore from "../../store/users";
import { useUserContext } from "../../components/contexts/userContexts";
import "./card.css";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const Card = ({ id, feature, price, image, stock, name }) => {
  const dispatch = useDispatch();
  const select = useSelector((state) => state.cart.cartItems);
  const updateUser = useUserStore((state) => state.updateUser);
  const { user } = useUserContext();
  const getUserById = useUserStore((state) => state.getUserById);
  const [favorito, setFavorito] = useState(false);
  const [favoritosUsuario, setFavoritosUsuario] = useState([]);

  const addHandle = (e) => {
    e.preventDefault();
    console.log(select);
    dispatch(addToCart({ id, price, image, name }));
  };

  useEffect(() => {
    if (user) {
      const obtenerUsuario = (async () => {
        const userDb = await getUserById(user.uid);
        if (userDb) {
          setFavoritosUsuario(userDb.favorites);
        }
      })();
    }
  }, [user]);

  const addFavoriteHandle = async (e) => {
    e.preventDefault();

    if (favorito) {
      // Si el producto ya está marcado como favorito, eliminarlo de la lista de favoritos
      const userDb = await getUserById(user.uid);
      if (userDb && userDb.favorites) {
        const newFavoritesList = userDb.favorites.filter((fav) => fav !== id);
        updateUser({
          ...userDb,
          favorites: newFavoritesList,
        });
        setFavorito(false);
        setFavoritosUsuario(newFavoritesList);
      }
      return;
    }

    // Si el producto no está marcado como favorito, agregarlo a la lista de favoritos
    setFavorito(true);
    const userDb = await getUserById(user.uid);
    if (!userDb) {
      console.log(`No se encontró ningún usuario con el id ${user.uid}`);
      return;
    }
    if (userDb && userDb.favorites) {
      updateUser({
        ...userDb,
        favorites: [...userDb.favorites, id],
      });
      setFavoritosUsuario([...userDb.favorites, id]);
    } else {
      console.log("Error al actualizar el usuario: objeto de usuario inválido");
    }
  };

  return (
    <>
      <div className="col">
        <div className="item-list card-container">
          <NavLink to={`/products/${id}`} role="link">
            <img className="img-fluidd" src={image[0]} alt="img not found" />
            <sup className="feature">
              <small>{feature}</small>
            </sup>
            <p className="center">
              <small className="i">
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
              </small>
            </p>
            <p className="center">${price}</p>
            <p className="center">Stock: {stock} und.</p>
          </NavLink>

          <div className="center footer-item">
            <NavLink
              to="/cart"
              role="button"
              className="primary"
              data-tooltip="Go to your cart">
              <i className="bi bi-cart-check"></i>
            </NavLink>

            <a
              href="/"
              role="button"
              className="contrast"
              data-tooltip="Add to cart"
              onClick={addHandle}>
              <i className="bi bi-cart-plus"></i>
            </a>
            {user && (
              <NavLink
                role="button"
                className="secondary"
                data-tooltip="Add to favorites"
                style={{
                  backgroundColor:
                    favoritosUsuario.find((el) => el === id) || favorito
                      ? "red"
                      : "gray",
                }}
                onClick={addFavoriteHandle}>
                <i className="bi bi-heart"></i>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
