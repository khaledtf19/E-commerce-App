import React, { Component } from "react";
import DOMPurify from "dompurify";

import { CurrencyContext } from "../../../context/currencyData/CurrencyContext";

import { ProductAttribute } from "../";
import { AddToCart } from "../../CartComponents/cartButtons/CartButtons";

import "./product.css";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: 0,
      selectedAttributes: [],
    };
  }

  static contextType = CurrencyContext;

  render() {
    const { selectedImage } = this.state;
    let { product } = this.props;
    const { selectedCurrency } = this.context;

    const setSelectedAttributes = (value) => {
      this.setState({ selectedAttributes: value });
    };

    return (
      <div className="product__container">
        <div className="product__images__container">
          <div className="product__images">
            {product.gallery.map((image, index) => (
              <img
                src={image}
                alt={product.id}
                key={index}
                onClick={() => this.setState({ selectedImage: index })}
              />
            ))}
          </div>

          <div className="product__images__selected">
            <img
              src={product.gallery[selectedImage]}
              alt={product.id}
              key={selectedImage}
            />
          </div>
        </div>
        <div className="product__info__container">
          <div className="product__info__name">
            <h1 className="product__info__name__brand">{product.brand}</h1>
            <h1 className="product__info__name__name">{product.name}</h1>
          </div>
          <div className="product__info__attributes__container">
            {product.attributes.map((attribute) => (
              <ProductAttribute
                key={attribute.id}
                attribute={attribute}
                selectedAttributes={this.state.selectedAttributes}
                setSelectedAttributes={setSelectedAttributes}
              />
            ))}
          </div>
          <div className="product__info__price">
            <h3>price:</h3>
            <h3>
              {product.prices.map((el) =>
                el.currency.label === selectedCurrency.label
                  ? `${el.currency.symbol}${el.amount}`
                  : ""
              )}
            </h3>
          </div>
          <div className="product__info__cartButton">
            <AddToCart
              inStock={product.inStock}
              selectedAttributes={this.state.selectedAttributes}
              product={product}
            />
          </div>
          <div
            className="product__info__description"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description),
            }}
          />
        </div>
      </div>
    );
  }
}
