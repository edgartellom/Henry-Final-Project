import { NavLink } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/products";
import ClipLoader from "react-spinners/ClipLoader";
import "./Detail.css";
import useUserStore from "../../store/users";
import { useUserContext } from "../../components/contexts/userContexts";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const Detail = () => {
  const [loadingInProgress, setLoading] = useState(false);
  const { filterId, detailProduct } = useStore();
  const updateUser = useUserStore((state) => state.updateUser);
  const { user } = useUserContext();
  const getUserById = useUserStore((state) => state.getUserById);
  const [favorito, setFavorito] = useState(false);
  const [favoritosUsuario, setFavoritosUsuario] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    filterId(id);
  }, []);

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

  //console.log(detailProduct)

  //var dataRecibe=id?products.filter((el)=>el.id===id):""

  return (
    <>
      <Navbar></Navbar>

      <main className="container">
        {loadingInProgress ? (
          <div className="loader-container">
            <ClipLoader color={"#fff"} loading={loadingInProgress} size={150} />
          </div>
        ) : (
          <div className="row">
            <div className="col">
              <div className="images">
                <img className="img-fluid" src={detailProduct.image} />
              </div>
            </div>
            <div className="col">
              <hgroup>
                <h3>{detailProduct.brand}</h3>
                <h4>{detailProduct.model}</h4>
              </hgroup>
              <div>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
              </div>
              <p>{detailProduct.feature}</p>
              <details>
                <summary>Details</summary>
                <ul>
                  <li>{detailProduct.detail}</li>
                </ul>
              </details>
              <hgroup>
                <h5>Categories</h5>
                <li>{detailProduct.categories}</li>
              </hgroup>
              <p>
                Price: <strong>{formatter.format(detailProduct.price)}</strong>
              </p>
              <div className="actions">
                <div className="btn-inline">
                  <NavLink
                    to="/cart"
                    role="button"
                    className="primary"
                    data-tooltip="Add to Cart">
                    <i className="bi bi-cart-plus"></i>
                  </NavLink>
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
          </div>
        )}
      </main>

      <Footer></Footer>
    </>
  );
};

export default Detail;
