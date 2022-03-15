import React, { Component } from "react";

import { CartContext } from "../../../context/cartData/CartContext";

import "./cartButtons.css";

export class AddToCart extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedProduct: props.selectedProduct };
  }

  static contextType = CartContext;

  render() {
    const { addProduct } = this.context;

    const handleAddProduct = () => {
      if (Object.keys(this.props.selectedProduct).length > 0) {
        addProduct(this.props.selectedProduct);
      }
    };

    return (
      <button onClick={handleAddProduct} className="cart__button">
        Add To Cart
      </button>
    );
  }
}

export class IncrementCart extends Component {
  constructor(props) {
    super(props);
    this.state = { productId: props.ProductId };
  }

  static contextType = CartContext;

  render() {
    let { productId } = this.state;

    let { incrementAmount } = this.context;

    return (
      <div
        onClick={() => incrementAmount(productId)}
        className="cart__button__small"
      >
        +
      </div>
    );
  }
}

export class DecrementCart extends Component {
  constructor(props) {
    super(props);
    this.state = { productId: props.ProductId };
  }

  static contextType = CartContext;

  render() {
    let { productId } = this.state;
    let { decrementAmount } = this.context;

    return (
      <div
        className="cart__button__small"
        onClick={() => decrementAmount(productId)}
      >
        -
      </div>
    );
  }
}

export class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = { productId: props.ProductId };
  }

  static contextType = CartContext;
  render() {
    const { checkOut } = this.context;
    return (
      <button onClick={checkOut} className="cart__button">
        Check Out
      </button>
    );
  }
}
