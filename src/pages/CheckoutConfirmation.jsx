import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { getCurrency } from "../utils/storage";
import "../styles/CheckoutConfirmation.css";

const CheckoutConfirmation = () => {
  const navigate = useNavigate();
  const [cartItems] = useCart();
  const [currency, setCurrency] = useState("$");
  const [orderNumber, setOrderNumber] = useState(null);
  const incremented = useRef(false);

  const exchangeRates = {
    $: 1,
    "€": 0.85,
    "¥": 110,
  };

  useEffect(() => {
    setCurrency(getCurrency());

    if (!incremented.current) {
      let currentOrderCount = parseInt(localStorage.getItem("orderCount")) || 0;
      const newOrderCount = currentOrderCount + 1;
      localStorage.setItem("orderCount", newOrderCount);
      setOrderNumber(newOrderCount);
      incremented.current = true;
    }
  }, []);

  const exchangeRate = exchangeRates[currency] || 1;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity * exchangeRate,
    0
  );

  const shippingCost = 0;
  const total = subtotal + shippingCost;

  return (
    <div className="checkout-confirmation">
      <div className="breadcrumb">
        <div className="breadcrumb-nav">
          <span className="breadcrumb-item">Cart</span>
          <span>&gt;</span>
          <span className="breadcrumb-item">Details</span>
          <span>&gt;</span>
          <span className="breadcrumb-item">Shipping</span>
          <span>&gt;</span>
          <span className="breadcrumb-item">Payment</span>
        </div>
      </div>

      <div className="page-content">
        <div className="confirmation-content">
          <div className="confirmation-left">
            <div className="success-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="confirmation-title">Payment Confirmed</h2>
            <p className="order-number">
              ORDER #{orderNumber !== null ? orderNumber : "Loading..."}
            </p>
            <button
              onClick={() => navigate("/")}
              className="back-to-shopping-btn"
            >
              Back to shopping
            </button>
          </div>

          <div className="order-summary">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${item.size}-${index}`} className="order-item">
                <div className="order-item-image-container">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="order-item-image"
                  />
                  <div className="order-item-badge">{item.quantity}</div>
                </div>
                <div className="order-item-info">
                  <h3 className="order-item-name">{item.name}</h3>
                  <p className="order-item-price">
                    {currency} {(item.price * exchangeRate).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <div className="order-summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>
                  {currency} {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free Shipping</span>
              </div>
              <div className="summary-total">
                <span>Paid</span>
                <span className="total-amount">
                  {currency} {total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutConfirmation;
