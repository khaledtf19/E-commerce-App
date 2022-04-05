import React, { Component } from "react";
import { CardsContainer } from "../../components/CardsComponents";

import { CategoryContext } from "../../context/categoryData/CategoryContext";
import history from "../../history";

export default class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedCategory: "" };
  }

  static contextType = CategoryContext;

  makeCategory(location) {
    this.setState({
      selectedCategory: location.pathname.slice(1, location.pathname.length),
    });
  }

  componentDidMount() {
    this.makeCategory(window.location);
    this.unlisten = history.listen(({ location, action }) => {
      this.makeCategory(location);
      console.log(action);
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    let { selectedCategory } = this.state;

    return <> {<CardsContainer selectedCategory={selectedCategory} />}</>;
  }
}
