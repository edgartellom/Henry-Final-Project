import React from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../store/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/ShoppingCartRedux";

const Card = ({ id, feature, price, image, stock }) => {
const dispatch = useDispatch()
const select = useSelector(state => state.cart.cartItems)


const addHandle = () => {
  console.log(select)
  dispatch(addToCart({id, price, image}))
}


  return (
    <>
      <div className="col">
        <div className="item-list">
          <NavLink to={`/products/${id}`} role="link">
            <img
              className="img-fluid"
              src={image[0]}
              alt="img not found"
              width="200px"
              height="250px"
            />
            <sup>
              <small>{feature}</small>
            </sup>
            <p className="center">
              <small>
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
              data-tooltip="Add to Cart">
              <i className="bi bi-cart-plus"></i>
            </NavLink>
            <NavLink
              to="/detail"
              role="button"
              className="secondary"
              data-tooltip="Details">
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
