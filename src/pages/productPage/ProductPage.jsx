import React, { Component } from "react";

import Product from "../../components/productComponents/product/Product";

export default class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
      product: {},
      finished: false,
    };
  }

  componentDidMount() {
    let { pathname } = window.location;
    let productId = pathname.slice(9, pathname.length);
    this.setState({ productId: productId });

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

    const getData = async () => {
      fetch("http://localhost:4000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: getProductData,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({ product: data.data.product });
          this.setState({ finished: true });
        });
    };
    getData();
  }

  render() {
    return (
      <>{this.state.finished && <Product product={this.state.product} />}</>
    );
  }
}
