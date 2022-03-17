import React, { Component } from "react";

import { CurrencyBG } from "../";

import { CurrencyContext } from "../../../context/currencyData/CurrencyContext";

import "./currencyPopup.css";

const getCurrencyData = `{
  currencies{
    label
    symbol
  }
}`;

export default class CurrencyPopup extends Component {
  constructor(props) {
    super(props);
    this.state = { currencies: [], finished: false };
  }

  static contextType = CurrencyContext;

  componentDidMount() {
    const getData = async () => {
      fetch("http://localhost:4000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: getCurrencyData,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({ currencies: data.data.currencies });
          this.setState({ finished: true });
        });
    };
    getData();
  }

  render() {
    const {
      openCurrency,
      setOpenCurrency,
      selectedCurrency,
      setSelectedCurrency,
    } = this.context;

    return (
      <>
        {openCurrency ? (
          <CurrencyBG onClick={() => setOpenCurrency(false)}>
            <div className="currencyPopup" onClick={(e) => e.stopPropagation()}>
              {this.state.finished
                ? this.state.currencies.map((currency) => (
                    <div
                      key={currency.label}
                      className={`currencies__container ${
                        selectedCurrency.label === currency.label
                          ? "selectedCurrency"
                          : ""
                      }`}
                      onClick={() => setSelectedCurrency(currency)}
                    >
                      {console.log(currency)}

                      <p>{currency.symbol}</p>
                      <p>{currency.label}</p>
                    </div>
                  ))
                : ""}
            </div>
          </CurrencyBG>
        ) : (
          ""
        )}
      </>
    );
  }
}
