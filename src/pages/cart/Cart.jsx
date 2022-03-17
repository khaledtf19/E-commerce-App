import React, { Component } from "react";
import { CartProduct } from "../../components/CartComponents";

import { CartContext } from "../../context/cartData/CartContext";

import "./cart.css";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static contextType = CartContext;

  render() {
    const { selectedProducts } = this.context;

    return (
      <div className="cart__container">
        <div className="cart__name">
          <h1>Cart</h1>
        </div>
        <div className="cart__products__container">
          {selectedProducts.map((product) => (
            <CartProduct product={product} key={product.id} />
          ))}
        </div>
      </div>
    );
  }
}
