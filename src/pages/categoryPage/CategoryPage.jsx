import React, { Component } from "react";
import {
  CardsContainer,
  CategoryFilter,
} from "../../components/CardsComponents";

import { CategoryContext } from "../../context/categoryData/CategoryContext";
import history from "../../history";

import "./categoryPage.css";

export default class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedCategory: "", search: "" };
  }
  // search = this.props.location.search;

  static contextType = CategoryContext;

  makeCategory(location) {
    this.setState({
      selectedCategory: location.pathname.slice(1, location.pathname.length),
      search: location.search,
    });
  }

  componentDidMount() {
    this.makeCategory(window.location);
    this.unlisten = history.listen(({ location, action }) => {
      this.makeCategory(location);
      console.log(location);
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    let { selectedCategory, search } = this.state;

    return (
      <div className="category__page">
        <CategoryFilter />
        {<CardsContainer selectedCategory={selectedCategory} search={search} />}
      </div>
    );
  }
}
