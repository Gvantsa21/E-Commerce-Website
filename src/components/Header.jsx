import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components.css";
import logo from "../logo.jpg";
import cart from "../cart.svg";
import { useCart } from "../hooks/useCart";

const Header = ({
  cartItemCount,
  onCartClick,
  activeCategory,
  onCategoryChange,
  currency,
  onCurrencyChange,
  onClose, // added to close ProductDetail if open
}) => {
  const navigate = useNavigate();
  const [cartItems] = useCart();

  const handleCategoryClick = (category) => {
    if (onClose) onClose();
    onCategoryChange(category);
    navigate("/");
  };

  const handleCartClick = () => {
    if (onClose) onClose();
    onCartClick();
  };

  return (
    <header className="header">
      <div className="containerr">
        <div className="header-content">
          <nav className="nav">
            {["WOMEN", "MEN", "KIDS"].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`nav-item ${
                  activeCategory === category ? "active" : ""
                }`}
              >
                {category}
              </button>
            ))}
          </nav>

          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>

          <div className="header-right">
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              style={{
                border: "none",
                background: "transparent",
                padding: "7px",
                background: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              <option value="$">$ USD</option>
              <option value="€">€ EUR</option>
              <option value="¥">¥ JPY</option>
            </select>

            <button onClick={handleCartClick} className="cart-button">
              <img src={cart} alt="Cart" className="cart-icon" />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
