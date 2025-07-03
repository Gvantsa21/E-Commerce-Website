import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCartItems, getFormData, getCurrency } from "../utils/storage";
import "../styles/CheckoutShipping.css";
import { useCart } from "../hooks/useCart";

const CheckoutShipping = () => {
  const navigate = useNavigate();
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({});
  const [currency, setCurrency] = useState("$");

  useEffect(() => {
    setCartItems(getCartItems());
    setFormData(getFormData());
    setCurrency(getCurrency());
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = selectedShipping === "standard" ? 0 : 4.99;
  const total = subtotal + shippingCost;

  return (
    <div className="checkout-shipping">
      <div className="breadcrumb">
        <div className="breadcrumb-nav">
          <span className="breadcrumb-item">Cart</span>
          <span>&gt;</span>
          <span className="breadcrumb-item">Details</span>
          <span>&gt;</span>
          <span className="breadcrumb-item-cur">Shipping</span>
          <span>&gt;</span>
          <span className="breadcrumb-item inactive">Payment</span>
        </div>
      </div>

      <div className="page-content">
        <div className="two-column">
          <div className="left-column">
            <div className="contact-info">
              <div>
                <span>Contact</span> {formData.email}
              </div>
              <div className="line"></div>
              <br></br>
              <div>
                <span>Ship to</span> {formData.address}, {formData.postalCode},{" "}
                {formData.city} {formData.province}, {formData.country}
              </div>
            </div>

            <div className="shipping-method">
              <div className="shipping-method-title">Shipping method</div>
              <label
                className={`shipping-option ${
                  selectedShipping === "standard" ? "selected" : ""
                }`}
              >
                <div className="shipping-option-left">
                  <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    checked={selectedShipping === "standard"}
                    onChange={(e) => setSelectedShipping(e.target.value)}
                    className="shipping-option-radio"
                  />
                  <span>Standard Shipping</span>
                </div>
                <div className="shipping-option-price">Free</div>
              </label>

              <label
                className={`shipping-option ${
                  selectedShipping === "express" ? "selected" : ""
                }`}
              >
                <div className="shipping-option-left">
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    checked={selectedShipping === "express"}
                    onChange={(e) => setSelectedShipping(e.target.value)}
                    className="shipping-option-radio"
                  />
                  <span>Express Shipping</span>
                </div>
                <div className="shipping-option-price">$ 4.99</div>
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="back-btn"
                onClick={() => navigate("/checkout/details")}
              >
                Back to details
              </button>
              <button
                type="button"
                className="continue-btn"
                onClick={() => navigate("/checkout/payment")}
              >
                Go to payment
              </button>
            </div>
          </div>

          <div className="order-summary">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className="order-item">
                <div className="order-item-image-container">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="order-item-image"
                  />
                  <div className="order-item-badge">{item.quantity}</div>
                </div>
                <div className="order-item-info">
                  <div className="order-item-name">{item.name}</div>
                  <div className="order-item-price">
                    {currency} {item.price.toFixed(2)}
                  </div>
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
                <span>
                  {selectedShipping === "standard" ? "Free Shipping" : "$ 4.99"}
                </span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>
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

export default CheckoutShipping;
