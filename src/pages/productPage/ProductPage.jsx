import React, { Component } from "react";

import { Product } from "../../components/productComponents";

export default class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
      product: {},
      finished: false,
      loading: false,
    };
  }

  getQuery = () => {
    let { pathname } = window.location;
    let productId = pathname.slice(9, pathname.length);
    this.setState({ productId: productId, loading: true });

    const getProductData = `{product(id: "${productId}"){
      id
      name
      gallery
      description
      inStock
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

      brand
      category
    }
    }`;
    return getProductData;
  };

  getData = async () => {
    fetch("http://localhost:4000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: this.getQuery(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          product: data.data.product,
          finished: true,
          loading: false,
        });
      });
  };

  componentDidMount() {
    this.getData();
  }

  compo;

  render() {
    return (
      <>
        {this.state.loading ? (
          <h1>Loading</h1>
        ) : (
          this.state.finished && <Product product={this.state.product} />
        )}
      </>
    );
  }
}
