import React, { Component } from "react";
import { DecrementCart, IncrementCart } from "../cartButtons/CartButtons";

export default class CartCardLoading extends Component {
  render() {
    return (
      <div className="cart__card__container">
        <div className="cart__card__info">
          <div className="cart__card__info__name">
            <p className="cart__card__info__name__brand">Loading...</p>
            <p className="cart__card__info__name__name">Loading...</p>
          </div>
          <div className="cart__card__info__price">
            <p>0</p>
          </div>
          <div className="cart__card__info__attributes__container">
            <div className="cart__card__info__attributes__attribute">
              <p>loading...</p>
            </div>
          </div>
        </div>
        <div className="cart__card__buttons">
          <div className="cart__card__buttons_button">
            <IncrementCart />
          </div>
          <div className="cart__card__buttons__amount">
            <p>0</p>
          </div>
          <div className="cart__card__buttons_button">
            <DecrementCart />
          </div>
        </div>
        <div className="cart__Card__image">
          <img src={""} alt="loading" />
        </div>
      </div>
    );
  }
}
