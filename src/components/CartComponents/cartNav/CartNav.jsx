import React, { Component } from "react";

import { CartContext } from "../../../context/cartData/CartContext";

import cart from "../../../assets/cart.svg";

import "./cartNav.css";

export default class CartNav extends Component {
  static contextType = CartContext;

  render() {
    const { openCart, setOpenCart, totalAmount } = this.context;
    return (
      <>
        <div onClick={() => setOpenCart(!openCart)} className="cartNav">
          {totalAmount > 0 ? (
            <div className="cartNav__count">
              <p>{totalAmount}</p>
            </div>
          ) : (
            ""
          )}
          <img src={cart} alt="cart icon" />
        </div>
      </>
    );
  }
}
