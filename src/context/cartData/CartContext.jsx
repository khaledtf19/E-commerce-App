import React, { Component, createContext } from "react";

export const CartContext = createContext();

export default class CartProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCart: false,
      selectedProducts:
        JSON.parse(localStorage.getItem("selected_Products")) || [],
      totalPrice: [],
      totalAmount: 0,
    };
  }

  countTotalAmount = (products) => {
    let totalAmount = 0;
    products.forEach((product) => {
      totalAmount += product.amount;
    });
    this.setState({ totalAmount: totalAmount });
  };

  componentDidMount() {
    this.countTotalAmount(this.state.selectedProducts);
  }

  render() {
    const setOpenCart = (value) => {
      this.setState({ openCart: value });
    };

    const countTotal = (products) => {
      let tmp = products;

      tmp = tmp.map((product) => {
        let productAmount = product.amount;
        let newPrices = product.prices.map((price) => {
          let totalAmount = price.amount * productAmount;
          return { ...price, totalAmount: totalAmount };
        });
        return { ...product, prices: newPrices };
      });

      this.setState({ selectedProducts: tmp });
      return tmp;
    };

    const updateLocal = (update) => {
      localStorage.setItem("selected_Products", JSON.stringify(update));
    };

    const setSelectedProducts = (value) => {
      this.countTotalAmount(value);

      updateLocal(countTotal(value));
    };

    const addProduct = (newProduct) => {
      if (!newProduct) {
        return;
      }

      let newProductId = newProduct.id;
      let oldProductIndex = null;

      this.state.selectedProducts.forEach((product, index) => {
        if (newProductId.toLowerCase() === product.id.toLowerCase()) {
          let count = 0;
          product.attributes.forEach((attribute, index) => {
            if (
              attribute.selectedItem.id.toLowerCase() ===
              newProduct.attributes[index].selectedItem.id.toLowerCase()
            ) {
              count++;
            }
          });

          if (count === newProduct.attributes.length) {
            product.index = index;
            oldProductIndex = index;
          }
        }
      });

      if (Number.isInteger(oldProductIndex)) {
        let tmp = this.state.selectedProducts;

        tmp[oldProductIndex].amount += 1;
        return setSelectedProducts(tmp);
      } else {
        newProduct.amount = 1;
        let tmp = this.state.selectedProducts;
        tmp.push(newProduct);
        return setSelectedProducts(tmp);
      }
    };

    const removeProduct = (productIndex) => {
      let tmp = this.state.selectedProducts;

      tmp.splice(productIndex, 1);
      setSelectedProducts(tmp);
    };

    const incrementAmount = (productIndex) => {
      let tmp = this.state.selectedProducts;
      tmp[productIndex].amount += 1;
      return setSelectedProducts(tmp);
    };

    const decrementAmount = (productIndex) => {
      let tmp = this.state.selectedProducts;

      if (tmp[productIndex].amount - 1 === 0) {
        tmp.splice(productIndex, 1);

        setSelectedProducts(tmp);
      } else {
        tmp[productIndex].amount -= 1;

        setSelectedProducts(tmp);
      }
    };

    const checkOut = () => {
      setSelectedProducts([]);
    };

    return (
      <CartContext.Provider
        value={{
          totalAmount: this.state.totalAmount,
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
