import React, { Component } from "react";

import { CartContext } from "../../../context/cartData/CartContext";

import cart from "../../../assets/cart.svg";

import "./cartNav.css";

export default class CartNav extends Component {
  static contextType = CartContext;

  render() {
    const { openCart, setOpenCart, selectedProducts } = this.context;
    return (
      <>
        <div onClick={() => setOpenCart(!openCart)} className="cartNav">
          {selectedProducts.length > 0 ? (
            <div className="cartNav__count">
              <p>{selectedProducts.length}</p>
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
