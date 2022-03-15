import React, { Component } from "react";
import { Routes, Route } from "react-router";

import Navbar from "./components/navbar/Navbar";
import Layout from "./components/layout/Layout";
import All from "./pages/all/All";
import Tech from "./pages/tech/Tech";
import Clothes from "./pages/clothes/Clothes";
import Cart from "./pages/cart/Cart";
import ProductPage from "./pages/productPage/ProductPage";

import CartPopup from "./components/CartComponents/cartPopup/CartPopup";
import CurrencyPopup from "./components/CurrencyComponents/currncyPopup/CurrencyPopup";

import CartProvider from "./context/cartData/CartContext";
import CurrencyProvider from "./context/currencyData/CurrencyContext";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <CartProvider>
          <CurrencyProvider>
            <Navbar />
            <main>
              <CartPopup />
              <CurrencyPopup />
              <Layout>
                <Routes>
                  <Route path="/" element={<All />} />
                  <Route path="/tech" element={<Tech />} />
                  <Route path="/clothes" element={<Clothes />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                </Routes>
              </Layout>
            </main>
          </CurrencyProvider>
        </CartProvider>
      </div>
    );
  }
}
