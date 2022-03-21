import React, { Component } from "react";
import { Link } from "react-router-dom";

import { BackDrop } from "../../";
import { CartCardsContainer, CartTotalPrice } from "../";
import { CheckOut } from "../cartButtons/CartButtons";

import { CartContext } from "../../../context/cartData/CartContext";

import "./cartPopup.css";

export default class CartPopup extends Component {
  static contextType = CartContext;

  render() {
    const { openCart, setOpenCart, selectedProducts } = this.context;

    return (
      <>
        {openCart ? (
          <BackDrop
            onClick={() => {
              setOpenCart(false);
            }}
          >
            <div
              className="cartPopup__container"
              onClick={(e) => e.stopPropagation()}
            >
              <CartCardsContainer />
              <div className="cartPopup__info">
                <div className="cartPopup__totalPrice">
                  <CartTotalPrice selectedProducts={selectedProducts} />
                </div>
                <div className="cartPopup__buttons">
                  <div className="cartPopup__buttons__button__container">
                    <Link
                      className="cartPopup__buttons__button__link"
                      to={`/cart`}
                      onClick={() => setOpenCart(false)}
                    >
                      View Bag
                    </Link>
                  </div>
                  <div className="cartPopup__buttons__button__container">
                    <CheckOut />
                  </div>
                </div>
              </div>
            </div>
          </BackDrop>
        ) : (
          ""
        )}
      </>
    );
  }
}
