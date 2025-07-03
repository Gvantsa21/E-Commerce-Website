import React, { useState } from "react";
import "../styles/components.css";
import cart2 from "../cart2.png";


const ProductCard = ({
  product,
  onAddToCart,
  onProductClick,
  currency,
  exchangeRate,
}) => {
  const [isHovered, setIsHovered] = useState(false);


  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product, "M");
  };

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onProductClick(product)}
    >
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />

        {isHovered && (
          <button onClick={handleAddToCart} className="add-to-cart-hover">
            <img className="add-to-cart-hoever-img" src={cart2} alt="cart" />
          </button>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">
          {currency}
          {(product.price * exchangeRate).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
