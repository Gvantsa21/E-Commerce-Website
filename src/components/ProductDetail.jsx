import React, { useState } from "react";
import "../styles/components.css";


const ProductDetail = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  currency,
  exchangeRate,
}) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const images = product.images || [product.image];

  if (!isOpen) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    onAddToCart(product, selectedSize);
    localStorage.setItem(
      "cartItems",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("cartItems") || "[]"),
        { ...product, size: selectedSize },
      ])
    );
    onClose();
  };

  return (
    <div className="product-detail-overlay">
      <div className="product-detail-content">
        <div className="product-images">
          <div className="thumbnails">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`thumbnail ${
                  selectedImageIndex === index ? "selected" : ""
                }`}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} />
              </button>
            ))}
          </div>

          <div className="main-image">
            <img src={images[selectedImageIndex]} alt={product.name} />
          </div>
        </div>

        <div className="product-info-panel">
          <div>
            <h1 className="product-title">{product.name}</h1>

            <div className="size-section">
              <p className="section-label">SIZE:</p>
              <div className="size-grid">
                {["XS", "S", "M", "L"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`size-button ${
                      selectedSize === size ? "selected" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="price-section">
              <p className="section-label">PRICE:</p>
              <p className="price-value">
                {currency}
                {(product.price * exchangeRate).toFixed(2)}
              </p>
            </div>

            <div className="add-to-cart-section">
              <button onClick={handleAddToCart} className="add-to-cart-button">
                ADD TO CART
              </button>
            </div>

            <div>
              <p className="product-description">
                {product.description ||
                  "Experience premium quality and style with this carefully crafted piece. Perfect for any occasion, this item combines comfort with modern design to create a versatile addition to your wardrobe."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
