import React, { Component, createContext } from "react";

export const CategoryContext = createContext();

const query = `{
  categories{
    name
  }
}`;

export default class CategoryProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    const getCategories = async () => {
      fetch("http://localhost:4000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            categories: data.data.categories,
          });
        });
    };
    getCategories();
  }

  render() {
    return (
      <CategoryContext.Provider
        value={{
          categories: this.state.categories,
        }}
      >
        {this.props.children}
      </CategoryContext.Provider>
    );
  }
}
