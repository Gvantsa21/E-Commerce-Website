// Cart.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCartItems, saveCartItems, getCurrency } from "../utils/storage";
import Header from "../components/Header";
import ShoppingCart from "../components/ShoppingCart";
import "../styles/pages.css";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [currency, setCurrency] = useState("$");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const exchangeRates = {
    $: 1,
    "€": 0.85,
    "¥": 110,
  };

  useEffect(() => {
    setCartItems(getCartItems());
    setCurrency(getCurrency());
  }, []);

  const updateCartItems = (newItems) => {
    setCartItems(newItems);
    saveCartItems(newItems);
  };

  const handleUpdateQuantity = (id, size, quantity) => {
    if (quantity === 0) {
      updateCartItems(
        cartItems.filter((item) => !(item.id === id && item.size === size))
      );
    } else {
      updateCartItems(
        cartItems.map((item) =>
          item.id === id && item.size === size ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleUpdateSize = (id, oldSize, newSize) => {
    updateCartItems(
      cartItems.map((item) =>
        item.id === id && item.size === oldSize
          ? { ...item, size: newSize }
          : item
      )
    );
  };

  const exchangeRate = exchangeRates[currency];
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity * exchangeRate,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="page">
      <Header
        cartItemCount={totalItems}
        onCartClick={() => setIsCartOpen(true)}
        activeCategory={"WOMEN"}
        onCategoryChange={() => {}}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      <div className="cart-page-header">
        <h1 className="cart-space">CART</h1>
        <div></div>
      </div>

      <div className="cart-page-content">
        {cartItems.length === 0 ? (
          <p
            style={{
              color: "#6b7280",
              textAlign: "center",
              padding: "32px 0",
              fontFamily: "Raleway, sans-serif",
            }}
          >
            Your cart is empty
          </p>
        ) : (
          <>
            <div style={{ marginBottom: "32px" }}>
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="cart-page-item">
                  <div className="cart-page-item-info">
                    <div className="cartcompo">
                      <h3 className="cart-page-item-name">{item.name}</h3>
                      <p className="cart-page-item-price">
                        {currency}
                        {(item.price * exchangeRate).toFixed(2)}
                      </p>

                      <div className="cart-page-size-section">
                        <p className="section-label">SIZE:</p>
                        <div className="size-grid">
                          {["XS", "S", "M", "L"].map((size) => (
                            <button
                              key={size}
                              onClick={() =>
                                handleUpdateSize(item.id, item.size, size)
                              }
                              className={`size-button ${
                                item.size === size ? "selected" : ""
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="cart-page-quantity-controls">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.id,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        className="quantity-control-btn"
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.id,
                            item.size,
                            Math.max(0, item.quantity - 1)
                          )
                        }
                        className="quantity-control-btn"
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-page-item-image"
                  />
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Quantity: {totalItems}</span>
              </div>
              <div className="cart-total-row">
                <span>Total: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>
                  {currency}
                  {total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => navigate("/checkout/details")}
                className="btn btn-primary"
                style={{ width: "25%", padding: "12px" }}
              >
                CONTINUE
              </button>
            </div>
          </>
        )}
      </div>

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateSize={handleUpdateSize}
        currency={currency}
        exchangeRate={exchangeRate}
      />
    </div>
  );
};

export default Cart;
