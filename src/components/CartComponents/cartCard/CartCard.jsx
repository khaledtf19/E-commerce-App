import React, { Component } from "react";
import { Link } from "react-router-dom";

import { CurrencyContext } from "../../../context/currencyData/CurrencyContext";

import { DecrementCart, IncrementCart } from "../cartButtons/CartButtons";

import "./cartCard.css";

export default class CartCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: {},
      finished: false,
    };
  }

  static contextType = CurrencyContext;

  getQuery = () => {
    const getProductData = `{product(id: "${this.props.product.id}") {
      id
      name
      gallery
      description
      inStock
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
      category
    }}`;
    return getProductData;
  };
  getData = async () => {
    fetch("http://localhost:4000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: this.getQuery(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          productData: data.data.product,
          finished: true,
        });
      });
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      this.getData();
    }
  }

  render() {
    const { productData } = this.state;
    const { productIndex, product } = this.props;
    const { selectedCurrency } = this.context;

    return (
      <>
        {this.state.finished && (
          <div className="cart__card__container">
            <div className="cart__card__info">
              <div className="cart__card__info__name">
                <p className="cart__card__info__name__brand">
                  {productData.brand}
                </p>
                <p className="cart__card__info__name__name">
                  {productData.name}
                </p>
              </div>
              <div className="cart__card__info__price">
                <p>
                  {productData.prices.map((el) =>
                    el.currency.label === selectedCurrency.label
                      ? `${el.currency.symbol}${el.amount}`
                      : ""
                  )}
                </p>
              </div>
              <div className="cart__card__info__attributes__container">
                {product.attributes.map((attribute, index) => (
                  <div
                    className="cart__card__info__attributes__attribute__container"
                    key={index}
                  >
                    <label>{productData?.attributes[index].name}:</label>
                    <div
                      className="cart__card__info__attributes__attribute"
                      style={
                        attribute.id.toLowerCase() === "color"
                          ? { background: attribute.selectedItem.value }
                          : {}
                      }
                    >
                      {attribute.id.toLowerCase() !== "color" ? (
                        <p>{attribute.selectedItem.value}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="cart__card__buttons">
              <div className="cart__card__buttons_button">
                <IncrementCart productIndex={productIndex} />
              </div>
              <div className="cart__card__buttons__amount">
                <p>{this.props.product.amount}</p>
              </div>
              <div className="cart__card__buttons_button">
                <DecrementCart productIndex={productIndex} />
              </div>
            </div>
            <div className="cart__Card__image">
              <img src={productData.gallery[0]} alt={product.id} />
            </div>
          </div>
        )}
      </>
    );
  }
}
