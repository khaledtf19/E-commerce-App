import React, { Component, createContext } from "react";

export const CurrencyContext = createContext();

export default class CurrencyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCurrency: false,
      selectedCurrency: JSON.parse(
        localStorage.getItem("selected_currency")
      ) || {
        label: "USD",
        symbol: "$",
      },
    };
  }

  render() {
    const setOpenCurrency = (value) => {
      this.setState({ openCurrency: value });
    };

    const setSelectedCurrency = (value) => {
      this.setState({ selectedCurrency: value });
      localStorage.setItem("selected_currency", JSON.stringify(value));
    };

    return (
      <CurrencyContext.Provider
        value={{
          openCurrency: this.state.openCurrency,
          setOpenCurrency,
          selectedCurrency: this.state.selectedCurrency,
          setSelectedCurrency,
        }}
      >
        {this.props.children}
      </CurrencyContext.Provider>
    );
  }
}
