import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components.css";

const ShoppingCart = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onUpdateSize,
  currency,
  exchangeRate,
}) => {
  const navigate = useNavigate();
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity * exchangeRate,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleViewBag = () => {
    onClose();
    navigate("/cart");
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-backdrop" onClick={onClose} />
      <div className="cart-panel">
        <div className="cart-header">
          <h2 className="cart-title">My Bag. {totalItems} items</h2>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "#6b7280",
                padding: "32px 0",
              }}
            >
              Your bag is empty
            </p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="cart-item">
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">
                      {currency}
                      {(item.price * exchangeRate).toFixed(2)}
                    </p>

                    <div className="size-selector">
                      <p className="size-label">Size:</p>
                      <div className="size-options">
                        {["XS", "S", "M", "L"].map((size) => (
                          <button
                            key={size}
                            onClick={() =>
                              onUpdateSize(item.id, item.size, size)
                            }
                            className={`size-option ${
                              item.size === size ? "selected" : ""
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.size, item.quantity + 1)
                      }
                      className="quantity-btn"
                    >
                      <svg
                        width="12"
                        height="12"
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
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(
                          item.id,
                          item.size,
                          Math.max(0, item.quantity - 1)
                        )
                      }
                      className="quantity-btn"
                    >
                      <svg
                        width="12"
                        height="12"
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

                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>
                {currency}
                {total.toFixed(2)}
              </span>
            </div>

            <div className="cart-actions">
              <button className="view-but" onClick={handleViewBag}>
                VIEW BAG
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  onClose();
                  navigate("/checkout/details");
                }}
              >
                CHECK OUT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
