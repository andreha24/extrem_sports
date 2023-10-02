import React from "react";
import PropTypes from "prop-types";

import closeArrow from "../../../assets/arrows/right-arrow.png"

import "./index.scss";

const Basket = ({closeBasket }) => {
  return (
    <div className="basket-wrapper">
      <div className="basket-wrapper__basket">
        <img src={closeArrow} alt="close-menu-btn" onClick={closeBasket}/>
        <h1>Cart</h1>
        <div>12321321</div>
      </div>
    </div>
  );
};

Basket.propTypes = {
  closeBasket: PropTypes.func,
}

export default Basket;