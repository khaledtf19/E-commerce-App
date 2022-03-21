import React, { Component } from "react";
import { Link } from "react-router-dom";

import { LocationContext } from "../../context/locationData/LocationData";

import { CartNav } from "../CartComponents";
import { CurrencyNav } from "../CurrencyComponents";

import logo from "../../assets/logo.svg";

import "./navbar.css";

const query = `{
  categories{
    name
  }
}`;

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], finished: false };
  }

  static contextType = LocationContext;

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
            finished: true,
          });
          console.log(data.data.categories);
        });
    };
    getCategories();
  }

  render() {
    let { location } = this.context;

    return (
      <div className="nav__container">
        <div className="nav__first__container">
          <ul className="nav__list">
            {this.state.finished &&
              this.state.categories.map((category) => (
                <li className="nav__list-item">
                  <Link
                    className={`nav__list__item-link ${
                      location === `/${category.name}` && "selected"
                    }`}
                    to={"/"}
                  >
                    {category.name}
                  </Link>
                  {location === `/${category.name}` && (
                    <div className="nav__list-item_greenBar" />
                  )}
                </li>
              ))}

            {/* <li className="nav__list-item">
              <Link
                className={`nav__list__item-link ${
                  location === "/" && "selected"
                }`}
                to={"/"}
              >
                All
              </Link>
              {location === "/" && <div className="nav__list-item_greenBar" />}
            </li>
            <li className="nav__list-item">
              <Link
                className={`nav__list__item-link ${
                  location === "/tech" && "selected"
                }`}
                to={"/tech"}
              >
                Tech
              </Link>
              {location === "/tech" && (
                <div className="nav__list-item_greenBar" />
              )}
            </li>
            <li className="nav__list-item">
              <Link
                className={`nav__list__item-link ${
                  location === "/clothes" && "selected"
                }`}
                to={"/clothes"}
              >
                clothes
              </Link>
              {location === "/clothes" && (
                <div className="nav__list-item_greenBar" />
              )}
            </li> */}
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
