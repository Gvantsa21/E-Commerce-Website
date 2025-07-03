import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

import {
  getCartItems,
  getFormData,
  saveFormData,
  getCurrency,
} from "../utils/storage";
import "../styles/pages.css";


const CheckoutDetails = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [currency, setCurrency] = useState("$");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    note: "",
    city: "",
    postalCode: "",
    province: "",
    country: "Italy",
    saveInfo: false,
  });

  const [errors, setErrors] = useState({});

  const exchangeRates = {
    $: 1,
    "€": 0.85,
    "¥": 110,
  };

  useEffect(() => {
    setCartItems(getCartItems());
    setCurrency(getCurrency());
    const savedFormData = getFormData();
    setFormData((prev) => ({ ...prev, ...savedFormData }));
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email or phone number is required";
    } else {
      const emailRegex = /\S+@\S+\.\S+/;
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
      if (
        !emailRegex.test(formData.email) &&
        !phoneRegex.test(formData.email)
      ) {
        newErrors.email = "Please enter a valid email or phone number";
      }
    }

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";

    if (!formData.postalCode) {
      newErrors.postalCode = "Postal code is required";
    } else if (!/^\d{4}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Postal code must be exactly 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      saveFormData(formData);
      navigate("/checkout/shipping");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const exchangeRate = exchangeRates[currency];
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity * exchangeRate,
    0
  );

  return (
    <div className="page">
      <div className="breadcrumb">
        <div className="breadcrumb-nav">
          <span className="breadcrumb-item">Cart</span>
          <span>{">"}</span>
          <span className="breadcrumb-item-cur">Details</span>
          <span>{">"}</span>
          <span className="breadcrumb-item inactive">Shipping</span>
          <span>{">"}</span>
          <span className="breadcrumb-item inactive">Payment</span>
        </div>
      </div>

      <div className="page-content">
        <div className="two-column">
          <div className="left-column">
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h2 className="form-title">Contact</h2>
                <input
                  className={`input ${errors.email ? "error" : ""}`}
                  placeholder="Email or mobile phone number"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div className="form-section">
                <h2 className="form-title">Shipping Address</h2>
                <div className="form-grid">
                  <div>
                    <input
                      className={`input ${errors.firstName ? "error" : ""}`}
                      placeholder="Name"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                    />
                    {errors.firstName && (
                      <p className="error-text">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <input
                      className={`input ${errors.lastName ? "error" : ""}`}
                      placeholder="Second Name"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                    />
                    {errors.lastName && (
                      <p className="error-text">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <input
                    className={`input ${errors.address ? "error" : ""}`}
                    placeholder="Address and number"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />
                  {errors.address && (
                    <p className="error-text">{errors.address}</p>
                  )}
                </div>

                <div className="form-group">
                  <input
                    className="input"
                    placeholder="Shipping note (optional)"
                    value={formData.note}
                    onChange={(e) => handleInputChange("note", e.target.value)}
                  />
                </div>

                <div
                  className="form-grid"
                  style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
                >
                  <div>
                    <input
                      className={`input ${errors.city ? "error" : ""}`}
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                    />
                    {errors.city && <p className="error-text">{errors.city}</p>}
                  </div>
                  <div>
                    <input
                      className={`input ${errors.postalCode ? "error" : ""}`}
                      placeholder="Postal Code"
                      value={formData.postalCode}
                      onChange={(e) =>
                        handleInputChange("postalCode", e.target.value)
                      }
                      maxLength={4}
                    />
                    {errors.postalCode && (
                      <p className="error-text">{errors.postalCode}</p>
                    )}
                  </div>
                  <select
                    className="input"
                    value={formData.province}
                    onChange={(e) =>
                      handleInputChange("province", e.target.value)
                    }
                  >
                    <option value="">Province</option>
                    <option value="AG">Agrigento</option>
                    <option value="AL">Alessandria</option>
                    <option value="AN">Ancona</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="input"
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                  >
                    <option value="Italy">Italy</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                  </select>
                </div>

                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    checked={formData.saveInfo}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        saveInfo: e.target.checked,
                      }))
                    }
                  />
                  <label>
                    Save this informations for a future fast checkout
                  </label>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "90px",
                }}
              >
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/cart")}
                >
                  Back to cart
                </button>
                <button type="submit" className="btn btn-primaryy">
                  Go to shipping
                </button>
              </div>
            </form>
          </div>

          <div className="order-summary">
            {cartItems.map((item, index) => (
              <div key={index} className="order-item">
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
                  {currency} {total.toFixed(2)}
                </span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span style={{ color: "#6b7280" }}>
                  Calculated at the next step
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

export default CheckoutDetails;
