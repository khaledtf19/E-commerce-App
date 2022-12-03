import React, { Component, createContext } from "react";

import queryString from "query-string";
import history from "../../history";
export const FilterContext = createContext();

export default class FilterProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tmpProducts: [],
      filteredProducts: [],
      attributes: [],
      selectedFilters: [],
      change: false,
    };
  }

  setTempProducts = (value) => {
    this.getAttributes(value);
    this.setState((state) => ({
      tmpProducts: value,
      change: !state.change,
    }));
  };

  setFilteredProducts = (value) => {
    this.setState({
      filteredProducts: value,
    });
  };

  setAttributes = (value) => {
    this.setState({ attributes: value });
  };

  setSelectedFilters = (value) => {
    this.setState((state) => ({
      selectedFilters: value,
      change: !state.change,
    }));
  };

  check = (arr, curr, item) => {
    if (curr === arr.length) {
      return false;
    }

    if (item === arr[curr].value) {
      return true;
    }

    return this.check(arr, curr + 1, item);
  };

  getAttributes = (products) => {
    let arr = products.reduce((prevArr, product) => {
      product.attributes.forEach((attr) => {
        let find = prevArr.find((oldAttr) => oldAttr.id === attr.id);

        if (!find) {
          prevArr.push(attr);
        } else {
          find.items = [
            ...find.items,
            ...attr.items.filter(
              (item) => !this.check(find.items, 0, item.value)
            ),
          ];
        }
      });

      return prevArr;
    }, []);
    this.setAttributes(arr);
    this.makeSelectedFilters(arr);
  };

  makeSelectedFilters = (items) => {
    let state = items.reduce((prevArr, item) => {
      let newItem = {
        id: item.id,
        value: "all",
      };

      prevArr.push(newItem);

      return prevArr;
    }, []);

    let obj = queryString.parse(history.location.search);
    let keys = Object.keys(obj);

    this.setSelectedFilters(state);
    this.getFilters(keys, obj);
  };

  selectFilter = (value, index) => {
    let tmp = this.state.selectedFilters;
    tmp[index].value = value;

    this.setSelectedFilters(tmp);
  };

  getFilters = (keys, obj) => {
    let tmp = this.state.selectedFilters;

    keys.forEach((key) => {
      if (tmp[key]) {
        tmp[key].value = obj[key];
      }
    });

    this.setSelectedFilters(tmp);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.change !== prevState.change) {
      let products = [];
      this.state.tmpProducts.forEach((product) => {
        let num = 0;

        this.state.selectedFilters.forEach((filter) => {
          if (filter.value === "all") {
            num += 1;
          } else {
            product.attributes.forEach((attr) => {
              if (this.check(attr.items, 0, filter.value)) {
                num += 1;
              }
            });
          }
        });
        if (num >= this.state.selectedFilters.length) {
          products.push(product);
        }
      });
      this.setFilteredProducts(products);
      console.log(products);
    }
  }
  render() {
    return (
      <FilterContext.Provider
        value={{
          setTempProducts: this.setTempProducts,
          filteredProducts: this.state.filteredProducts,
          getAttributes: this.getAttributes,
          attributes: this.state.attributes,
          selectedFilters: this.state.selectedFilters,
          selectFilter: this.selectFilter,
          getFilters: this.getFilters,
        }}
      >
        {this.props.children}
      </FilterContext.Provider>
    );
  }
}
