import React, { Component } from "react";

import { CurrencyContext } from "../../../context/currencyData/CurrencyContext";

import { DecrementCart, IncrementCart } from "../cartButtons/CartButtons";

import "./cartProduct.css";

export default class CartProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: {},
      finished: false,
      selectedImg: 0,
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
    const { productData, selectedImg } = this.state;
    const { product, productIndex } = this.props;
    const { selectedCurrency } = this.context;

    const handleImg = (order) => {
      let images = productData.gallery.length;

      switch (order) {
        case "left":
          if (selectedImg === 0) {
            this.setState({ selectedImg: images - 1 });
          } else {
            this.setState((state, props) => ({
              selectedImg: state.selectedImg - 1,
            }));
          }
          break;

        case "right":
          if (selectedImg === images - 1) {
            this.setState({ selectedImg: 0 });
          } else {
            this.setState((state, props) => ({
              selectedImg: state.selectedImg + 1,
            }));
          }
          break;
        default:
          break;
      }
    };

    return (
      <>
        {this.state.finished && (
          <div className="cart__product__container">
            <div className="cart__product__info">
              <div className="cart__product__info__name">
                <h2 className="cart__product__info__name__brand">
                  {productData.brand}
                </h2>
                <h2 className="cart__product__info__name__name">
                  {productData.name}
                </h2>
              </div>
              <div className="cart__product__info__price">
                <p>
                  {productData.prices.map((el) =>
                    el.currency.label === selectedCurrency.label
                      ? `${el.currency.symbol}${el.amount}`
                      : ""
                  )}
                </p>
              </div>
              <div className="cart__product__info__attributes__container">
                {product.attributes.map((attribute, index) => (
                  <div
                    className="cart__product__info__attributes__attribute__container"
                    key={index}
                  >
                    <label>{productData.attributes[index].name}:</label>
                    <div
                      className="cart__product__info__attributes__attribute"
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
            <div className="cart__product__buttons">
              <div className="cart__product__buttons_button">
                <IncrementCart productIndex={productIndex} />
              </div>
              <div className="cart__product__buttons__amount">
                <p>{this.props.product.amount}</p>
              </div>
              <div className="cart__product__buttons_button">
                <DecrementCart productIndex={productIndex} />
              </div>
            </div>
            <div className="cart__product__image">
              <img src={productData.gallery[selectedImg]} alt={product.id} />
              {productData.gallery.length > 1 ? (
                <>
                  <div
                    className="cart__product__image__selector__right"
                    onClick={() => handleImg("right")}
                  >{`>`}</div>

                  <div
                    className="cart__product__image__selector__left"
                    onClick={() => handleImg("left")}
                  >{`<`}</div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}
