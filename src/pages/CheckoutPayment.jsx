import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Lock } from "lucide-react";
import { getCartItems, getCurrency, getFormData } from "../utils/storage";
import "../styles/CheckoutPayment.css";
import { useCart } from "../hooks/useCart";

const CheckoutPayment = () => {
  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    holderName: "",
    expiration: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [currency, setCurrency] = useState("$");
  const [formData, setFormData] = useState({});
  const [showCardNumber, setShowCardNumber] = useState(false);

  const exchangeRates = {
    $: 1,
    "€": 0.85,
    "¥": 110,
  };

  useEffect(() => {
    setCartItems(getCartItems());
    setCurrency(getCurrency());
    setFormData(getFormData());
  }, []);

  const exchangeRate = exchangeRates[currency] || 1;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity * exchangeRate,
    0
  );

  const shippingCost = 0;
  const total = subtotal + shippingCost;

  const validateForm = () => {
    const newErrors = {};

    if (!paymentData.cardNumber)
      newErrors.cardNumber = "Card number is required";
    else if (
      paymentData.cardNumber.length !== 16 ||
      /\D/.test(paymentData.cardNumber)
    )
      newErrors.cardNumber = "Card number must be 16 digits";

    if (!paymentData.holderName)
      newErrors.holderName = "Holder name is required";
    else if (/[^a-zA-Z\s]/.test(paymentData.holderName))
      newErrors.holderName = "Holder name must contain only letters";

    if (!paymentData.expiration)
      newErrors.expiration = "Expiration date is required";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentData.expiration))
      newErrors.expiration = "Expiration must be in MM/YY format";

    if (!paymentData.cvv) newErrors.cvv = "CVC is required";
    else if (!/^\d{3}$/.test(paymentData.cvv))
      newErrors.cvv = "CVC must be 3 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    if (field === "cardNumber") {
      let val = value.replace(/\D/g, "").slice(0, 16);
      setPaymentData((prev) => ({ ...prev, cardNumber: val }));
      if (errors.cardNumber) setErrors((prev) => ({ ...prev, cardNumber: "" }));
    } else if (field === "holderName") {
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setPaymentData((prev) => ({ ...prev, holderName: value }));
        if (errors.holderName)
          setErrors((prev) => ({ ...prev, holderName: "" }));
      }
    } else if (field === "expiration") {
      let val = value.replace(/[^\d]/g, "").slice(0, 4);
      if (val.length >= 3) {
        val = val.slice(0, 2) + "/" + val.slice(2);
      }
      setPaymentData((prev) => ({ ...prev, expiration: val }));
      if (errors.expiration) setErrors((prev) => ({ ...prev, expiration: "" }));
    } else if (field === "cvv") {
      let val = value.replace(/\D/g, "").slice(0, 3);
      setPaymentData((prev) => ({ ...prev, cvv: val }));
      if (errors.cvv) setErrors((prev) => ({ ...prev, cvv: "" }));
    } else {
      setPaymentData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/checkout/confirmation");
    }
  };

  return (
    <div className="checkout-payment">
      <div className="breadcrumb">
        <div className="breadcrumb-nav">
          <span className="breadcrumb-item">Cart</span>
          <span>&gt;</span>
          <span className="breadcrumb-item">Details</span>
          <span>&gt;</span>
          <span className="breadcrumb-item">Shipping</span>
          <span>&gt;</span>
          <span className="breadcrumb-item-cur">Payment</span>
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
              <div className="line"></div>
              <br></br>
              <div>
                <span>Method</span> Standard Shipping - FREE
              </div>
            </div>
            <div>
              <h3 className="form-title">Payment method</h3>

              {/* Updated container structure */}
              <div className="payment-form-container">
                <div className="payment-form-header">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <span className="payment-method-text">Credit Card</span>
                </div>

                <div className="payment-form-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group input-with-icon">
                      <input
                        type={showCardNumber ? "text" : "password"}
                        className={`form-input ${
                          errors.cardNumber ? "error" : ""
                        }`}
                        placeholder="Card Number"
                        value={paymentData.cardNumber}
                        onChange={(e) =>
                          handleInputChange("cardNumber", e.target.value)
                        }
                        maxLength={16}
                        style={{ paddingRight: "40px" }}
                      />

                      <div
                        className="input-icon"
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          zIndex: 10,
                        }}
                        onClick={() => setShowCardNumber(!showCardNumber)}
                        aria-label={
                          showCardNumber
                            ? "Hide card number"
                            : "Show card number"
                        }
                      >
                        <Lock size={18} />{" "}
                      </div>
                    </div>
                    {errors.cardNumber && (
                      <div className="error-message">{errors.cardNumber}</div>
                    )}

                    <div className="form-group">
                      <input
                        type="text"
                        className={`form-input ${
                          errors.holderName ? "error" : ""
                        }`}
                        placeholder="Holder Name"
                        value={paymentData.holderName}
                        onChange={(e) =>
                          handleInputChange("holderName", e.target.value)
                        }
                      /> 
                      {errors.holderName && (
                        <div className="error-message">{errors.holderName}</div>
                      )}
                    </div>

                    <div className="form-grid">
                      <div className="form-group">
                        <input
                          type="text"
                          className={`form-input ${
                            errors.expiration ? "error" : ""
                          }`}
                          placeholder="Expiration (MM/YY)"
                          value={paymentData.expiration}
                          onChange={(e) =>
                            handleInputChange("expiration", e.target.value)
                          }
                          maxLength={5}
                        />
                        {errors.expiration && (
                          <div className="error-message">
                            {errors.expiration}
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <div className="input-with-icon">
                          <input
                            type="text"
                            className={`form-input ${
                              errors.cvv ? "error" : ""
                            }`}
                            placeholder="CVC"
                            value={paymentData.cvv}
                            onChange={(e) =>
                              handleInputChange("cvv", e.target.value)
                            }
                            maxLength={3}
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#555555"
                            viewBox="0 0 16 16"
                            height="16"
                            width="16"
                            className="info-icon"
                          >
                            <path d="M0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2H2a2 2 0 0 1 -2 -2zm8.93 4.588 -2.29 0.287 -0.082 0.38 0.45 0.083c0.294 0.07 0.352 0.176 0.288 0.469l-0.738 3.468c-0.194 0.897 0.105 1.319 0.808 1.319 0.545 0 1.178 -0.252 1.465 -0.598l0.088 -0.416c-0.2 0.176 -0.492 0.246 -0.686 0.246 -0.275 0 -0.375 -0.193 -0.304 -0.533zM8 5.5a1 1 0 1 0 0 -2 1 1 0 0 0 0 2" />
                          </svg>
                        </div>
                        {errors.cvv && (
                          <div className="error-message">{errors.cvv}</div>
                        )}
                      </div>
                    </div>

                    <div
                      className="form-actions"
                      style={{
                        position: "absolute",
                        gap: "200px",
                        bottom: "5%",
                      }}
                    >
                      <button
                        type="button"
                        className="back-btn"
                        onClick={() => navigate("/checkout/shipping")}
                      >
                        Back to shipping
                      </button>
                      <button type="submit" className="pay-now-btn">
                        Pay now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="order-summary">
            {cartItems.map((item, index) => (
              <div
                key={`${item.id}-${item.size}-${index}`}
                className="order-item"
              >
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
                    {currency} {(item.price * exchangeRate).toFixed(2)}
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
                <span>Free Shipping</span>
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

export default CheckoutPayment;
