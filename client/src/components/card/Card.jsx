import React from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../store/ShoppingCart";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
import "./card.css";

const Card = ({ id, feature, price, image, stock }) => {
  const add = useStore((state) => state.addToCart);
  const items = useStore((state) => state.cartItems);

  const addHandle = () => {
    add({ id, price, image });
  };
  console.log(add);
  console.log(items);
  return (
    <>
      <div className="col">
        <div className="item-list card-container">
          <NavLink to={`/products/${id}`} role="link">
            <img
              className="img-fluid"
              src={image[0]}
              alt="img not found"
              width="200px"
              height="250px"
            />
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
              data-tooltip="Add to Cart"
            >
              <i className="bi bi-cart-plus"></i>
            </NavLink>
            <NavLink
              to="/detail"
              role="button"
              className="secondary"
              data-tooltip="Details"
            >
              <i className="bi bi-card-list"></i>
            </NavLink>
          </div>
          <button onClick={addHandle}>Add to shopping cart</button>
        </div>
      </div>
    </>
  );
};

export default Card;
