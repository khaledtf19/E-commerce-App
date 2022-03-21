import React, { Component } from "react";

import ProductCard from "../productCard/ProductCard";

import "./cardsContainer.css";

export default class CardsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      finished: false,
      loading: false,
    };
  }

  query = (selectedCategory) => `{
    category(input: {
      title: "${selectedCategory}"
    }){
      products {
        id
        name
        category
        gallery
        inStock
        brand
        attributes{
          id
          name
          type
          items{
            displayValue
            value
            id
          }
        }
        prices{
          currency{
            label
            symbol
          }
          amount
        }
      }
    }
  }`;

  getData = async () => {
    this.setState({ loading: true });
    fetch("http://localhost:4000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: this.query(this.props.selectedCategory),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          products: data.data.category.products,
          finished: true,
          loading: false,
        });
      });
  };

  componentDidMount() {
    this.getData();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedCategory !== this.props.selectedCategory) {
      this.getData();
    }
  }

  render() {
    const { selectedCategory } = this.props;
    return (
      <div className="category__container">
        <div className="category__name__container">
          <h1 className="category__name">{selectedCategory}</h1>
        </div>
        <div className="cards__container">
          {this.state.loading ? (
            <h1>Loading...</h1>
          ) : (
            this.state.finished &&
            this.state.products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          )}
        </div>
      </div>
    );
  }
}
