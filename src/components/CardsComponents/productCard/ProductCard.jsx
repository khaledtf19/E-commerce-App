import React, { Component } from "react";
import { Link } from "react-router-dom";

import { CurrencyContext } from "../../../context/currencyData/CurrencyContext";

import { GreenCart } from "../../CartComponents/cartButtons/CartButtons";

import "./productCard.css";

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageCount: 0,
      cardHover: false,
      selectedAttributes: {},
    };
  }

  static contextType = CurrencyContext;

  componentDidMount() {
    const makeDefaultAttributes = () => {
      let tmp = [];
      let productId = this.props.product.id;

      let attributes = this.props.product.attributes;

      attributes.map((attribute) =>
        tmp.push({ id: attribute.id, selectedItem: attribute.items[0] })
      );

      let tmp2 = {
        id: productId,
        attributes: tmp,
        prices: this.props.product.prices,
      };
      this.setState({ selectedAttributes: tmp2 });
    };

    makeDefaultAttributes();

    this.timer = setInterval(() => this.tick(), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    if (this.state.imageCount === this.props.product.gallery.length - 1) {
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
    const { selectedAttributes } = this.state;
    const { selectedCurrency } = this.context;

    const { product } = this.props;

    return (
      <div
        className="card__container"
        onMouseEnter={() => {
          this.setState({ cardHover: true });
        }}
        onMouseLeave={() => this.setState({ cardHover: false })}
      >
        <Link to={`/product/${product.id}`}>
          <div className="card__product__image-container">
            <img
              src={product.gallery[this.state.imageCount]}
              alt={product.name}
            />

            {!product.inStock && (
              <div className="card__product__outOfStock">
                <p>Out of stock</p>
              </div>
            )}
          </div>
          <div className="card__product__info-container">
            <h3 className="card__product__name">
              {product.brand} {product.name}
            </h3>
            <p className="card__product__price">
              {product.prices.map((el) =>
                el.currency.label === selectedCurrency.label
                  ? `${el.currency.symbol}${el.amount}`
                  : ""
              )}
            </p>
          </div>
        </Link>

        {this.state.cardHover && product.inStock ? (
          <div className="card__cart">
            <GreenCart product={selectedAttributes} />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
