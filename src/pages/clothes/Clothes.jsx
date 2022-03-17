import React, { Component } from "react";
import { LocationContext } from "../../context/locationData/LocationData";

import { CardsContainer } from "../../components/CardsComponents";

const getClothesData = `{
  category(input: {
    title: "clothes"
  }){
    products {
      id
      name
      category
      gallery
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
    }
  }
}`;

export default class Clothes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      finished: false,
      pageLocation: window.location.pathname,
    };
  }

  static contextType = LocationContext;

  componentDidMount() {
    const getData = async () => {
      fetch("http://localhost:4000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: getClothesData,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            products: data.data.category.products,
            finished: true,
          });
        });
    };
    getData();

    this.context.setLocation(this.state.pageLocation);
  }

  render() {
    return (
      <>
        {this.state.finished ? (
          <CardsContainer
            products={this.state.products}
            categoryName={"CLOTHES"}
          />
        ) : (
          ""
        )}
      </>
    );
  }
}
