import React, { Component } from "react";

import { CartContext } from "../../../context/cartData/CartContext";

import cart_green from "../../../assets/cart_green.svg";

import "./cartButtons.css";

export class AddToCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inStock: props.inStock,
    };
  }

  static contextType = CartContext;

  render() {
    const { addProduct } = this.context;

    const handleSelectProduct = () => {
      let productId = this.props.product.id;
      let sProduct = {};
      sProduct.attributes = this.props.selectedAttributes;
      sProduct.id = productId;
      sProduct.prices = this.props.product.prices;
      addProduct(sProduct);
    };

    return (
      <>
        {this.state.inStock ? (
          <button onClick={handleSelectProduct} className="cart__button">
            Add To Cart
          </button>
        ) : (
          <button className="cart__button cart__button__outOfStock">
            Out Of Stock
          </button>
        )}
      </>
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

export class GreenCart extends Component {
  constructor(props) {
    super(props);
    this.state = { product: props.product };
  }

  static contextType = CartContext;
  render() {
    const { addProduct } = this.context;

    const handleClick = () => {
      addProduct(this.state.product);
    };

    return (
      <div onClick={handleClick} className="GreenCart">
        <img src={cart_green} alt="green cart icon" />
      </div>
    );
  }
}
