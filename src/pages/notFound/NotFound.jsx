import React, { Component } from "react";
import { Navigate } from "react-router";
import { CategoryContext } from "../../context/categoryData/CategoryContext";

export default class NotFound extends Component {
  static contextType = CategoryContext;

  render() {
    const { categories } = this.context;
    return (
      <>{categories[0] ? <Navigate to={`/${categories[0]?.name}`} /> : ""}</>
    );
  }
}
