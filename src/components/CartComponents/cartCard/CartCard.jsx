import React, { Component } from "react";
import { Link } from "react-router-dom";

import { CurrencyContext } from "../../../context/currencyData/CurrencyContext";

import { DecrementCart, IncrementCart } from "../cartButtons/CartButtons";
import CartCardLoading from "./CartCardLoading";

import "./cartCard.css";

export default class CartCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: {},
      product: props.product,
      finished: false,
      loading: false,
    };
  }

  static contextType = CurrencyContext;

  componentDidMount() {
    const getProductData = `{product(id: "${this.state.product.id}") {
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

    const getData = async () => {
      this.setState({ loading: true });
      fetch("http://localhost:4000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: getProductData,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            productData: data.data.product,
            finished: true,
            loading: false,
          });
        });
    };
    getData();
  }

  render() {
    const { productData, product, loading } = this.state;
    const { selectedCurrency } = this.context;

    return (
      <>
        {loading ? (
          <CartCardLoading />
        ) : (
          this.state.finished && (
            <div className="cart__card__container">
              <div className="cart__card__info">
                <Link
                  to={`/product/${productData.id}`}
                  className="cart__card__info__name"
                >
                  <p className="cart__card__info__name__brand">
                    {productData.brand}
                  </p>
                  <p className="cart__card__info__name__name">
                    {productData.name}
                  </p>
                </Link>
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
                  {product.attributes.map((attribute) => (
                    <div
                      key={attribute.selectedItem.id}
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
                  ))}
                </div>
              </div>
              <div className="cart__card__buttons">
                <div className="cart__card__buttons_button">
                  <IncrementCart ProductId={productData.id} />
                </div>
                <div className="cart__card__buttons__amount">
                  <p>{this.props.product.amount}</p>
                </div>
                <div className="cart__card__buttons_button">
                  <DecrementCart ProductId={productData.id} />
                </div>
              </div>
              <div className="cart__Card__image">
                <img src={productData.gallery[0]} alt={product.id} />
              </div>
            </div>
          )
        )}
      </>
    );
  }
}
