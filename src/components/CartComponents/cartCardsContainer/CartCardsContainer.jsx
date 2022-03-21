import React, { Component } from "react";

import { CartCard } from "../";

import { CartContext } from "../../../context/cartData/CartContext";

import "./cartCardsContainer.css";

export default class CartCardsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { productIds: [], loading: false };
  }

  static contextType = CartContext;

  render() {
    const { selectedProducts, totalAmount } = this.context;

    const setLoading = (value) => {
      this.setState({ loading: value });
    };

    return (
      <div className="cartPopup__cards__container">
        <p>My Bag, {totalAmount} items</p>
        {this.state.loading && <p>Loading..</p>}
        {selectedProducts.map((product, index) => (
          <CartCard
            product={product}
            key={index}
            setLoading={setLoading}
            productIndex={index}
          />
        ))}
      </div>
    );
  }
}
