import React, { Component } from "react";
import { Link } from "react-router-dom";

import { CurrencyContext } from "../../../context/currencyData/CurrencyContext";

import cart_green from "../../../assets/cart_green.svg";
import "./productCard.css";

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = { product: props.product, imageCount: 0, cardHover: false };
  }

  static contextType = CurrencyContext;

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    if (this.state.imageCount + 1 === this.state.product.gallery.length) {
      this.setState((state, props) => ({
        imageCount: 0,
      }));
    } else {
      this.setState((state, props) => ({
        imageCount: state.imageCount + 1,
      }));
    }
  }

  render() {
    const { product } = this.state;
    const { selectedCurrency } = this.context;
    return (
      <div
        className="card__container"
        onMouseEnter={() => this.setState({ cardHover: true })}
        onMouseLeave={() => this.setState({ cardHover: false })}
      >
        <Link
          className="card__product__image-container"
          to={`/product/${product.id}`}
        >
          <img
            src={product.gallery[this.state.imageCount]}
            alt={product.name}
          />

          {!product.inStock && (
            <div className="card__product__outOfStock">
              <p>Out of stock</p>
            </div>
          )}
        </Link>
        <Link
          to={`/product/${product.id}`}
          className="card__product__info-container"
        >
          <h3 className="card__product__name">{product.name}</h3>
          <p className="card__product__price">
            {product.prices.map((el) =>
              el.currency.label === selectedCurrency.label
                ? `${el.currency.symbol}${el.amount}`
                : ""
            )}
          </p>
        </Link>
        {this.state.cardHover && product.inStock ? (
          <div className="card__cart">
            <img src={cart_green} alt="green cart icon" />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
