import React, { Component } from "react";
import { Link } from "react-router-dom";

import CartNav from "../CartComponents/cartNav/CartNav";

import logo from "../../assets/logo.svg";

import "./navbar.css";
import CurrencyNav from "../CurrencyComponents/currencyNav/CurrencyNav";

export default class Navbar extends Component {
  render() {
    return (
      <div className="nav__container">
        <div className="nav__first__container">
          <ul className="nav__list">
            <li className="nav__list-item">
              <Link className="nav__list__item-link" to={"/"}>
                All
              </Link>
            </li>
            <li className="nav__list-item">
              <Link className="nav__list__item-link" to={"/tech"}>
                Tech
              </Link>
            </li>
            <li className="nav__list-item">
              <Link className="nav__list__item-link" to={"/clothes"}>
                clothes
              </Link>
            </li>
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
