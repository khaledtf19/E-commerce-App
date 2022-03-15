import React, { Component } from "react";

import { CurrencyContext } from "../../../context/currencyData/CurrencyContext";

import dropdown_down from "../../../assets/dropdown_down.svg";
import dropdown_up from "../../../assets/dropdown_up.svg";

import "./currencyNav.css";

export default class CurrencyNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static contextType = CurrencyContext;

  render() {
    const { openCurrency, setOpenCurrency, selectedCurrency } = this.context;

    return (
      <>
        <div
          className="currencyNav"
          onClick={() => setOpenCurrency(!openCurrency)}
        >
          {openCurrency ? (
            <>
              {selectedCurrency.symbol}
              <img src={dropdown_up} alt="dropdown" />
            </>
          ) : (
            <>
              {selectedCurrency.symbol}{" "}
              <img src={dropdown_down} alt="dropdown" />
            </>
          )}
        </div>
      </>
    );
  }
}
