import React, { Component } from "react";
import { Routes, Route } from "react-router";

import { Cart, ProductPage, CategoryPage } from "./pages";
import { Navbar, Layout } from "./components";
import { CartPopup } from "./components/CartComponents";
import { CurrencyPopup } from "./components/CurrencyComponents";

import CartProvider from "./context/cartData/CartContext";
import CurrencyProvider from "./context/currencyData/CurrencyContext";
import LocationProvider from "./context/locationData/LocationData";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <LocationProvider>
          <CurrencyProvider>
            <CartProvider>
              <Navbar />
              <main>
                <CartPopup />
                <CurrencyPopup />
                <Layout>
                  <Routes>
                    <Route path="/" element={<CategoryPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                  </Routes>
                </Layout>
              </main>
            </CartProvider>
          </CurrencyProvider>
        </LocationProvider>
      </div>
    );
  }
}
