import { NavLink } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/products";
import ClipLoader from "react-spinners/ClipLoader";
import "./Detail.css";
import useUserStore from "../../store/users";
import { useUserContext } from "../../components/contexts/userContexts";
import useOrderStatus from "../../store/userOrderStatus";
import useReview from "../../store/useReview";

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
  const users = useUserStore((state) => state.users);

  const [favorito, setFavorito] = useState(false);
  const [favoritosUsuario, setFavoritosUsuario] = useState([]);
  const { hasBoughtProduct, checkOrder } = useOrderStatus();
  ///REVIEWS/////
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);
  const getReviews = useReview((state) => state.getReviewById);
  const reviewsProduct = useReview((state) => state.reviewsList);
  const createReview = useReview((state) => state.createReview);

  const { id } = useParams();
  let productId = detailProduct.id;
  useEffect(() => {
    if (productId) {
      getReviews(productId);
    }
  }, []);

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
          //setFavoritosUsuario(userDb.favorites);
          setFavoritosUsuario(users.favorites);
          checkOrder(user.uid, detailProduct.id);
        }
      })();
    }
  }, [user]);
  //console.log(favoritosUsuario);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userId = user.uid;
    let productId = detailProduct.id;
    const review = {
      comment: reviewText,
      rate: rating,
      productId,
      userId,
    };
    console.log(review);
    try {
      const response = await createReview(review);
      alert("Review created successfully");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const addFavoriteHandle = async (e) => {
    e.preventDefault();

    if (favorito) {
      // Si el producto ya está marcado como favorito, eliminarlo de la lista de favoritos
      const userDb = await getUserById(user.uid);
      //console.log(users);
      if (users && users.favorites) {
        const newFavoritesList = users.favorites.filter((fav) => fav !== id);
        updateUser({
          ...users,
          favorites: newFavoritesList,
        });
        setFavorito(false);
        setFavoritosUsuario(newFavoritesList);
      }

      //console.log(users.favorites);
      return;
    }

    // Si el producto no está marcado como favorito, agregarlo a la lista de favoritos
    setFavorito(true);
    const userDb = await getUserById(user.uid);
    if (!users) {
      console.log(`No se encontró ningún usuario con el id ${user.uid}`);
      return;
    }
    if (users && users.favorites) {
      updateUser({
        ...users,
        favorites: [...users.favorites, id],
      });
      setFavoritosUsuario([...users.favorites, id]);
    } else {
      console.log("Error al actualizar el usuario: objeto de usuario inválido");
    }
  };
  // const addFavoriteHandle = async (e) => {
  //   e.preventDefault();

  //   if (favorito) {
  //     // Si el producto ya está marcado como favorito, eliminarlo de la lista de favoritos
  //     const userDb = await getUserById(user.uid);
  //     console.log(userDb);
  //     if (userDb && userDb.favorites) {
  //       const newFavoritesList = userDb.favorites.filter((fav) => fav !== id);
  //       updateUser({
  //         ...userDb,
  //         favorites: newFavoritesList,
  //       });
  //       setFavorito(false);
  //       setFavoritosUsuario(newFavoritesList);
  //     }

  //     console.log(userDb.favorites);
  //     return;
  //   }

  //   // Si el producto no está marcado como favorito, agregarlo a la lista de favoritos
  //   setFavorito(true);
  //   const userDb = await getUserById(user.uid);
  //   if (!userDb) {
  //     console.log(`No se encontró ningún usuario con el id ${user.uid}`);
  //     return;
  //   }
  //   if (userDb && userDb.favorites) {
  //     updateUser({
  //       ...userDb,
  //       favorites: [...userDb.favorites, id],
  //     });
  //     setFavoritosUsuario([...userDb.favorites, id]);
  //   } else {
  //     console.log("Error al actualizar el usuario: objeto de usuario inválido");
  //   }
  // };

  //console.log(detailProduct)

  //var dataRecibe=id?products.filter((el)=>el.id===id):""

  return (
    <>
      <Navbar></Navbar>

      <div className="contenedor">
        {loadingInProgress ? (
          <div className="loader-container">
            <ClipLoader color={"#fff"} loading={loadingInProgress} size={150} />
          </div>
        ) : (
          <div className="row">
            <div className="x">
              <div className="contenedor-img">
                <img className="img-fluid" src={detailProduct.image} />
              </div>

              <div className="contenedor-detalles">
                <h3 className="nameProduct">{detailProduct.feature}</h3>
                <div className="cont-det-pro">
                  <h4 className="detalles-product">
                    Brand: {detailProduct.brand}
                  </h4>
                  <h4 className="detalles-product">
                    Model: {detailProduct.model}
                  </h4>
                </div>

                <details>
                  <summary>Details</summary>
                  <ul>
                    <li className="detail-product">{detailProduct.detail}</li>
                  </ul>
                </details>
                <div>
                  <i className="bi bi-star"></i>
                  <i className="bi bi-star"></i>
                  <i className="bi bi-star"></i>
                  <i className="bi bi-star"></i>
                </div>
                {hasBoughtProduct ? (
                  <form>
                    <div className="form-group">
                      <label for="exampleFormControlSelect1">
                        Qualification
                      </label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        name="rating"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label for="exampleFormControlSelect2"></label>
                    </div>
                    <div className="form-group">
                      <label for="exampleFormControlTextarea1">
                        What do you think about it?
                      </label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="2"
                        name="review-text"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                      ></textarea>
                    </div>
                    <button type="submit" onClick={handleSubmit}>
                      Enviar
                    </button>
                  </form>
                ) : (
                  " "
                )}
              </div>
            </div>
            <div id="parte-pago">
              <div>
                <details>
                  <summary>Reviews</summary>
                  <ul>
                    {reviewsProduct &&
                      reviewsProduct.map((review) => (
                        <li className="detail-product" key={review.id}>
                          <p>{review.comment}</p>
                        </li>
                      ))}
                  </ul>
                </details>
              </div>
              <hgroup>
                <h5>Categories</h5>
                <li>{detailProduct.categories}</li>
              </hgroup>
              <p className="price">
                Price: <strong>{formatter.format(detailProduct.price)}</strong>
              </p>
              <div className="actions">
                <div className="btn-inline">
                  <NavLink
                    to="/cart"
                    role="button"
                    className="primary"
                    data-tooltip="Add to Cart"
                  >
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
                      onClick={addFavoriteHandle}
                    >
                      <i className="bi bi-heart"></i>
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer></Footer>
    </>
  );
};

export default Detail;
