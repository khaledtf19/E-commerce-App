import React, { Component, createContext } from "react";

export const CategoryContext = createContext();

export default class CategoryProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: "",
    };
  }

  render() {
    const setSelectedCategory = (value) => {
      this.setState({ selectedCategory: value });
    };

    return (
      <CategoryContext.Provider
        value={{
          selectedCategory: this.state.selectedCategory,
          setSelectedCategory,
        }}
      >
        {this.props.children}
      </CategoryContext.Provider>
    );
  }
}
