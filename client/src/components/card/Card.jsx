import React from "react";
import { NavLink } from "react-router-dom";
import "./card.css";

const Card = ({ id, feature, price, image, stock }) => {
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
              to="/detail"
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
        </div>
      </div>
    </>
  );
};

export default Card;
