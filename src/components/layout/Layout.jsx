import React, { Component } from "react";

import "./layout.css";

export default class Layout extends Component {
  render() {
    return <div className="Page__container">{this.props.children}</div>;
  }
}
