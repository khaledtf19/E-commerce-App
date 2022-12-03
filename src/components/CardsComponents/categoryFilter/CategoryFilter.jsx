import React, { Component } from "react";
import { FilterContext } from "../../../context/filterData/FilterContext";
import history from "../../../history";
import queryString from "query-string";

import "./categoryFilter.css";

export default class CategoryFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      colors: [],
    };
  }

  makeQuery = (value, i) => {
    let obj = queryString.parse(history.location.search);

    obj[i] = value;

    let string = queryString.stringify(obj);
    history.push({
      search: string,
    });
    this.context.selectFilter(value, i);
  };

  componentDidUpdate() {}

  static contextType = FilterContext;

  render() {
    const { attributes, selectedFilters } = this.context;

    return (
      <div className="filter__out">
        <div className="filter__in">
          <button
            className="filter__reset"
            onClick={() => {
              selectedFilters.forEach((filter, i) => {
                this.makeQuery("all", i);
              });
            }}
          >
            Reset
          </button>
          {attributes.map((attr, i) => (
            <div key={attr.id} className="filters">
              {attr.name}
              {attr.items[0].value !== ("Yes" || "No") ? (
                attr.type !== "swatch" ? (
                  <select
                    onChange={(e) => {
                      this.makeQuery(e.target.value, i);
                    }}
                    value={selectedFilters[i]?.value}
                  >
                    <option value="all">All</option>
                    {attr.items.map((item) => (
                      <option key={item.id} value={item.value}>
                        {item.displayValue}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="filter__colors__container">
                    {attr.items.map((item) => (
                      <div key={item.id} className="filter__colors">
                        <div
                          className={`filter__color ${
                            selectedFilters[i]?.value === item.value
                              ? "filter__color__active"
                              : ""
                          }`}
                          style={{ background: item.value }}
                          onClick={() => {
                            selectedFilters[i]?.value === item.value
                              ? this.makeQuery("all", i)
                              : this.makeQuery(item.value, i);
                          }}
                        ></div>
                        <span
                          className={`filter__color__select ${
                            selectedFilters[i]?.value === item.value
                              ? "filter__color__active"
                              : ""
                          }`}
                        ></span>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                attr.items.map((item) => (
                  <div key={item.id}>
                    <label>{item.value}: </label>
                    <input
                      type="checkbox"
                      checked={selectedFilters[i]?.value === item.value}
                      onChange={(e) => {
                        console.log(selectedFilters[i]);
                        e.target.checked
                          ? this.makeQuery(item.value, i)
                          : this.makeQuery("all", i);
                      }}
                    />
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
