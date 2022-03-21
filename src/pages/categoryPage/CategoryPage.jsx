import React, { Component } from "react";
import { CardsContainer } from "../../components/CardsComponents";

import { CategoryContext } from "../../context/categoryData/CategoryContext";

export default class CategoryPage extends Component {
  static contextType = CategoryContext;

  render() {
    const { selectedCategory } = this.context;

    return <>{<CardsContainer selectedCategory={selectedCategory} />}</>;
  }
}
