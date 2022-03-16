import React, { Component } from "react";
import { CurrencyContext } from "../../../context/currencyData/CurrencyContext";

import "./cartTotalPrice.css";

export default class CartTotalPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProducts: props.selectedProducts,
      totalPrice: 0,
    };
  }

  static contextType = CurrencyContext;
  makeTotalPrice = () => {
    let totalPriceTmb = 0;
    this.state.selectedProducts.forEach((product) => {
      product.prices.map((price) =>
        price.currency.symbol === this.context.selectedCurrency.symbol
          ? (totalPriceTmb += price.totalAmount)
          : ""
      );
    });
    this.setState({ totalPrice: totalPriceTmb });
  };

  componentDidMount() {
    this.makeTotalPrice();
  }

  componentDidUpdate() {
    // this.makeTotalPrice();
  }

  render() {
    let { selectedCurrency } = this.context;
    let { totalPrice } = this.state;

    return (
      <div className="totalPrice">
        <p>Total</p>
        <p>
          {selectedCurrency.symbol}
          {totalPrice.toFixed(2)}
        </p>
      </div>
    );
  }
}
