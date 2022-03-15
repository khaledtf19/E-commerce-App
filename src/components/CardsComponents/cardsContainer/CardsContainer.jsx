import React, { Component } from "react";

import ProductCard from "../productCard/ProductCard";

import "./cardsContainer.css";

export default class CardsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.products,
      categoryName: props.categoryName,
    };
  }

  render() {
    return (
      <div className="category__container">
        <div className="category__name__container">
          <h1 className="category__name">{this.state.categoryName}</h1>
        </div>
        <div className="cards__container">
          {this.state.products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    );
  }
}
