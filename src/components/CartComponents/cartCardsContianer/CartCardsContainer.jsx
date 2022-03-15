import React, { Component } from "react";

import CartCard from "../cartCard/CartCard";

import { CartContext } from "../../../context/cartData/CartContext";

import "./cartCardsContainer.css";

export default class CartCardsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { productIds: [] };
  }

  static contextType = CartContext;

  componentDidMount() {}

  render() {
    const { selectedProducts } = this.context;

    return (
      <div className="cartPopup__cards__container">
        <p>My Bag, {selectedProducts.length} items</p>
        {selectedProducts.map((product) => (
          <CartCard product={product} key={product.id} />
        ))}
      </div>
    );
  }
}
