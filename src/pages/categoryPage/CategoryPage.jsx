import React, { Component } from "react";
import { CardsContainer } from "../../components/CardsComponents";

import { LocationContext } from "../../context/locationData/LocationData";

export default class CategoryPage extends Component {
  static contextType = LocationContext;

  render() {
    const { selectedCategory } = this.context;

    return <>{<CardsContainer selectedCategory={selectedCategory} />}</>;
  }
}
