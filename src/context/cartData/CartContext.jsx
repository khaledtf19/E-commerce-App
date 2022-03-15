import React, { Component, createContext } from "react";

export const CartContext = createContext();

export default class CartProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCart: false,
      selectedProducts:
        JSON.parse(localStorage.getItem("selected_Products")) || [],
    };
  }

  render() {
    const setOpenCart = (value) => {
      this.setState({ openCart: value });
    };

    const updateLocal = (update) => {
      localStorage.setItem("selected_Products", JSON.stringify(update));
    };

    const setSelectedProducts = (value) => {
      this.setState({ selectedProducts: value });
      updateLocal(value);
    };

    const addProduct = (newProduct) => {
      let newProductId = newProduct.id;
      let oldProductIndex = null;

      this.state.selectedProducts.map((product, index) =>
        newProductId.toLowerCase() === product.id.toLowerCase()
          ? (oldProductIndex = index)
          : ""
      );

      if (Number.isInteger(oldProductIndex)) {
        let tmp = this.state.selectedProducts;
        tmp[oldProductIndex].attributes = newProduct.attributes;

        tmp[oldProductIndex].amount += 1;
        setSelectedProducts(tmp);
      } else {
        newProduct.amount = 1;
        let tmp = this.state.selectedProducts;
        tmp.push(newProduct);
        setSelectedProducts(tmp);
      }
    };

    const removeProduct = (productId) => {
      let tmp = this.state.selectedProducts;
      let productIndex = null;

      this.state.selectedProducts.map((product, index) =>
        productId.toLowerCase() === product.id.toLowerCase()
          ? (productIndex = index)
          : ""
      );

      if (Number.isInteger(productIndex)) {
        tmp.splice(productIndex, 1);
        setSelectedProducts(tmp);
      } else {
        return;
      }
    };

    const incrementAmount = (productId) => {
      console.log(productId);

      let tmp = this.state.selectedProducts;
      let productIndex = null;

      this.state.selectedProducts.map((product, index) =>
        productId.toLowerCase() === product.id.toLowerCase()
          ? (productIndex = index)
          : ""
      );

      if (Number.isInteger(productIndex)) {
        tmp[productIndex].amount += 1;

        setSelectedProducts(tmp);
      } else {
        return;
      }
    };

    const decrementAmount = (productId) => {
      let tmp = this.state.selectedProducts;
      let productIndex = null;

      this.state.selectedProducts.map((product, index) =>
        productId.toLowerCase() === product.id.toLowerCase()
          ? (productIndex = index)
          : ""
      );

      if (Number.isInteger(productIndex)) {
        if (tmp[productIndex].amount - 1 === 0) {
          tmp.splice(productIndex, 1);

          setSelectedProducts(tmp);
        } else {
          tmp[productIndex].amount -= 1;

          setSelectedProducts(tmp);
        }
      } else {
        return;
      }
    };

    const checkOut = () => {
      setSelectedProducts([]);
    };

    return (
      <CartContext.Provider
        value={{
          openCart: this.state.openCart,
          setOpenCart,
          selectedProducts: this.state.selectedProducts,
          setSelectedProducts,
          addProduct,
          removeProduct,
          incrementAmount,
          decrementAmount,
          checkOut,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
