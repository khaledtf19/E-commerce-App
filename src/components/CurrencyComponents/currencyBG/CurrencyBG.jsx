import React, { Component } from "react";

import "./currencyBG.css";

export default class CurrencyBG extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="currencyBG" onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}
