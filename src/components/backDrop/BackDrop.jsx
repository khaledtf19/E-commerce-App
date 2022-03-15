import React, { Component } from "react";

import "./backDrop.css";

export default class BackDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="backDrop__container" onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}
