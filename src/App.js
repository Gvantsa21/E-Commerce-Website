import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Cart from "./pages/Cart";
import CheckoutDetails from "./pages/CheckoutDetails";
import CheckoutShipping from "./pages/CheckoutShipping";
import CheckoutPayment from "./pages/CheckoutPayment";
import CheckoutConfirmation from "./pages/CheckoutConfirmation";
import ShoppingCart from "./components/ShoppingCart";
import {
  getCartItems,
  saveCartItems,
  getCurrency,
  saveCurrency,
} from "./utils/storage";
import "./styles/globals.css";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currency, setCurrency] = useState("$");

  const exchangeRates = {
    $: 1,
    "€": 0.85,
    "¥": 110,
  };

  useEffect(() => {
    setCartItems(getCartItems());
    setCurrency(getCurrency());
  }, []);

  useEffect(() => {
    saveCartItems(cartItems);
  }, [cartItems]);

  useEffect(() => {
    saveCurrency(currency);
  }, [currency]);

  const handleUpdateQuantity = (id, size, quantity) => {
    if (quantity === 0) {
      setCartItems((prev) =>
        prev.filter((item) => !(item.id === id && item.size === size))
      );
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id && item.size === size ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleUpdateSize = (id, oldSize, newSize) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === oldSize
          ? { ...item, size: newSize }
          : item
      )
    );
  };

  const handleRemoveItem = (id, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Index
              cartItems={cartItems}
              setCartItems={setCartItems}
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
              currency={currency}
              setCurrency={setCurrency}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              currency={currency}
              onUpdateQuantity={handleUpdateQuantity}
              onUpdateSize={handleUpdateSize}
              onRemoveItem={handleRemoveItem}
              onCartClick={() => setIsCartOpen(true)}
            />
          }
        />
        <Route path="/checkout/details" element={<CheckoutDetails />} />
        <Route path="/checkout/shipping" element={<CheckoutShipping />} />
        <Route path="/checkout/payment" element={<CheckoutPayment />} />
        <Route
          path="/checkout/confirmation"
          element={<CheckoutConfirmation />}
        />
      </Routes>

      {/* Cart overlay always available */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onUpdateSize={handleUpdateSize}
        currency={currency}
        exchangeRate={exchangeRates[currency]}
      />
    </BrowserRouter>
  );
};

export default App;
