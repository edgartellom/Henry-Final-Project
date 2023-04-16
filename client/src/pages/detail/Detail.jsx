import { NavLink } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/products";
import ClipLoader from "react-spinners/ClipLoader";
import "./Detail.css";

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

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    filterId(id);
  }, []);

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
                 <h4 className="detalles-product">Brand: {detailProduct.brand}</h4>
                 <h4 className="detalles-product">Model: {detailProduct.model}</h4>
              </div>
              <div>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
              </div>
              
              <details>
                <summary>Details</summary>
                <ul>
                  <li className="detail-product">{detailProduct.detail}</li>
                </ul>
              </details>
            
              </div>
              </div>
              <div id="parte-pago">
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
                    to="/detail"
                    role="button"
                    className="secondary"
                    data-tooltip="Add to favorites"
                  >
                    <i className="bi bi-heart"></i>
                  </NavLink>
                  <NavLink
                    to="/cart"
                    role="button"
                    className="primary"
                    data-tooltip="Add to Cart"
                  >
                    <i className="bi bi-cart-plus"></i>
                  </NavLink>
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
