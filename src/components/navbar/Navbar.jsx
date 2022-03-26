import React, { Component } from "react";
import { Link } from "react-router-dom";

import { CategoryContext } from "../../context/categoryData/CategoryContext";
import history from "../../history";

import { CartNav } from "../CartComponents";
import { CurrencyNav } from "../CurrencyComponents";

import logo from "../../assets/logo.svg";

import "./navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedCategory: "" };
  }

  static contextType = CategoryContext;

  makeCategory(location) {
    this.setState({
      selectedCategory: location.pathname.slice(1, location.pathname.length),
    });
  }

  componentDidMount() {
    this.makeCategory(window.location);
    this.unlisten = history.listen(({ location, action }) => {
      if (action === "PUSH") {
        this.makeCategory(location);
      }
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    let { selectedCategory } = this.state;
    let { categories } = this.context;

    return (
      <div className="nav__container">
        <div className="nav__first__container">
          <ul className="nav__list">
            {categories.map((category, index) => (
              <li className="nav__list-item" key={index}>
                <Link
                  to={`/${category.name}`}
                  className={`nav__list__item-link ${
                    category.name === selectedCategory && "selected"
                  }`}
                >
                  {category.name}
                </Link>
                {selectedCategory === category.name && (
                  <div className="nav__list-item_greenBar" />
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="nav__logo__container">
          <img src={logo} alt="logo" />
        </div>
        <div className="nav__second__container">
          <div className="nav__second__currency">
            <CurrencyNav />
          </div>
          <div className="nav__second__cart">
            <CartNav />
          </div>
        </div>
      </div>
    );
  }
}
