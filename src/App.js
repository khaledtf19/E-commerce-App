import React, { Component } from "react";
import { Routes, Route } from "react-router";

import { Cart, ProductPage, CategoryPage } from "./pages";
import { Navbar, Layout } from "./components";
import { CartPopup } from "./components/CartComponents";
import { CurrencyPopup } from "./components/CurrencyComponents";

import CartProvider from "./context/cartData/CartContext";
import CurrencyProvider from "./context/currencyData/CurrencyContext";
import CategoryProvider from "./context/categoryData/CategoryContext";

import "./App.css";
import NotFound from "./pages/notFound/NotFound";
import FilterProvider from "./context/filterData/FilterContext";

export default class App extends Component {
  render() {
    return (
      <div>
        <CategoryProvider>
          <CurrencyProvider>
            <CartProvider>
              <FilterProvider>
                <Navbar />
                <main>
                  <CartPopup />
                  <CurrencyPopup />
                  <Layout>
                    <Routes>
                      <Route path="*" element={<NotFound />} />
                      <Route path="/:category" element={<CategoryPage />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/product/:id" element={<ProductPage />} />
                    </Routes>
                  </Layout>
                </main>
              </FilterProvider>
            </CartProvider>
          </CurrencyProvider>
        </CategoryProvider>
      </div>
    );
  }
}
