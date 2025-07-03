import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import ProductDetail from "../components/ProductDetail";
import ShoppingCart from "../components/ShoppingCart";
import WomenJacket from "../items/womenjacket1.jpg";
import WomenJacket2 from "../items/womenjacket2.jpg";
import WomenNecklace from "../items/womennecklace1.jpg";
import WomenHeels from "../items/womenheels1.jpg";
import WomenHeels2 from "../items/womenheels2.jpg";
import WomenRing from "../items/womenring1.jpg";
import WomenEarring from "../items/womenearring1.jpg";
import WomenShirt from "../items/womenshirt1.jpg";
import MenGloves from "../items/mengloves1.jpg";
import MenGloves2 from "../items/mengloves2.jpg";
import MenNecklace from "../items/mennecklace1.jpg";
import MenNecklace2 from "../items/mennecklace2.jpg";
import MenWatch from "../items/menwatch1.jpeg";
import MenWatch2 from "../items/menwatch2.jpeg";
import MenWatch3 from "../items/menwatch3.jpeg";
import MenWallet from "../items/menwallet.jpg";
import MenWallet2 from "../items/menwallet2.jpg";
import MenRing from "../items/menring1.jpg";
import MenRing2 from "../items/menring2.jpg";
import MenRing3 from "../items/menring3.jpg";
import MenPants from "../items/menpants1.jpg";
import MenPants2 from "../items/menpants2.jpg";
import KidBag from "../items/kidbag1.jpg";
import KidBag2 from "../items/kidbag2.jpg";
import KidEarring from "../items/kidearring1.jpg";
import KidEarring2 from "../items/kidearring2.jpg";
import KidBraclet from "../items/kidsbraclet1.jpg";
import KidBraclet2 from "../items/kidsbraclet2.jpg";
import KidPins from "../items/kidspins1.jpg";
import KidPins2 from "../items/kidspins2.jpg";
import KidBackpack from "../items/kidbackpack1.jpg";
import KidBackpack2 from "../items/kidbackpack2.jpg";
import KidKeyRing from "../items/kidskeyring1.jpg";
import WomenEarring2 from "../items/womenearring2.jpg";
import WomenShirt2 from "../items/womenshirt3.jpg";
import WomenRing2 from "../items/womenring2.jpg";
import WomenRing3 from "../items/womenring3.jpg";
import WomenNecklace2 from "../items/womennecklace2.jpg";
import KidBraclet3 from "../items/kidsbraclet3.jpg";
import WomenHeels3 from "../items/womenheels3.jpg";
import {
  getCartItems,
  saveCartItems,
  getCurrency,
  saveCurrency,
  getActiveCategory,
  saveActiveCategory,
} from "../utils/storage";
import "../styles/pages.css";

const Index = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("WOMEN");
  const [currency, setCurrency] = useState("$");

  const exchangeRates = {
    $: 1,
    "€": 0.85,
    "¥": 110,
  };

  useEffect(() => {
    setCartItems(getCartItems());
    setActiveCategory(getActiveCategory());
    setCurrency(getCurrency());
  }, []);

  useEffect(() => {
    saveCartItems(cartItems);
  }, [cartItems]);

  useEffect(() => {
    saveActiveCategory(activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    saveCurrency(currency);
  }, [currency]);

  const products = [
    {
      id: 1,
      name: "Plaid Yellow Jacket",
      price: 850.0,
      image: WomenJacket,
      images: [WomenJacket, WomenJacket2],
      category: "WOMEN",
    },
    {
      id: 11,
      name: "Bow Earring",
      price: 555.0,
      image: WomenEarring,
      images: [WomenEarring, WomenEarring2],
      category: "WOMEN",
      isNew: true,
    },
    {
      id: 3,
      name: "Red Heels",
      price: 980.0,
      image: WomenHeels,
      images: [WomenHeels, WomenHeels2, WomenHeels3],
      category: "WOMEN",
      isNew: true,
    },
    {
      id: 2,
      name: "Pearl Saturn Necklace",
      price: 550.0,
      image: WomenNecklace,
      images: [WomenNecklace, WomenNecklace2],
      category: "WOMEN",
    },
    {
      id: 10,
      name: "Armour Ring",
      price: 500.0,
      image: WomenRing,
      images: [WomenRing, WomenRing2, WomenRing3],
      category: "WOMEN",
      isNew: true,
    },
    {
      id: 12,
      name: "Shirt",
      price: 650.0,
      image: WomenShirt,
      images: [WomenShirt, WomenShirt2],
      category: "WOMEN",
      isNew: true,
    },
    {
      id: 4,
      name: "Gloves",
      price: 190.0,
      image: MenGloves,
      images: [MenGloves, MenGloves2],
      category: "MEN",
    },
    {
      id: 5,
      name: "Saturn Orb Necklace",
      price: 120.0,
      image: MenNecklace,
      images: [MenNecklace, MenNecklace2],
      category: "MEN",
      isNew: true,
    },
    {
      id: 6,
      name: "Ring",
      price: 200.0,
      image: MenRing,
      images: [MenRing, MenRing2, MenRing3],
      category: "MEN",
    },
    {
      id: 14,
      name: "Wallet",
      price: 150.0,
      image: MenWallet,
      images: [MenWallet, MenWallet2],
      category: "MEN",
    },
    {
      id: 15,
      name: "Watch",
      price: 450.0,
      image: MenWatch,
      images: [MenWatch, MenWatch2, MenWatch3],
      category: "MEN",
      isNew: true,
    },
    {
      id: 16,
      name: "Plaid Pants",
      price: 670.0,
      image: MenPants,
      images: [MenPants, MenPants2],
      category: "MEN",
    },
    {
      id: 7,
      name: "Pink Handbag",
      price: 250.0,
      image: KidBag,
      images: [KidBag, KidBag2],
      category: "KIDS",
    },
    {
      id: 8,
      name: "Bee Earrings",
      price: 300.0,
      image: KidEarring,
      images: [KidEarring, KidEarring2],
      category: "KIDS",
      isNew: true,
    },
    {
      id: 9,
      name: "Bow Braclet",
      price: 270.0,
      image: KidBraclet,
      images: [KidBraclet, KidBraclet2, KidBraclet3],
      category: "KIDS",
    },
    {
      id: 17,
      name: "Hair Pins",
      price: 120.0,
      image: KidPins,
      images: [KidPins, KidPins2],
      category: "KIDS",
    },
    {
      id: 18,
      name: "Leather Backpack",
      price: 450.0,
      image: KidBackpack,
      images: [KidBackpack, KidBackpack2],
      category: "KIDS",
      isNew: true,
    },
    {
      id: 19,
      name: "KeyChain",
      price: 100.0,
      image: KidKeyRing,
      images: [KidKeyRing],
      category: "KIDS",
    },
  ];

  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  const handleAddToCart = (product, size) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.size === size
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1, size: size || "M" }];
      }
    });
  };

  const handleUpdateQuantity = (id, size, quantity) => {
    if (quantity === 0) {
      setCartItems((prevItems) =>
        prevItems.filter((item) => !(item.id === id && item.size === size))
      );
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id && item.size === size ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id, size) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const handleUpdateSize = (id, oldSize, newSize) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === oldSize
          ? { ...item, size: newSize }
          : item
      )
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="page">
      <Header
        cartItemCount={totalItems}
        onCartClick={() => setIsCartOpen(true)}
        activeCategory={activeCategory}
        onCategoryChange={(cat) => {
          setSelectedProduct(null);
          setActiveCategory(cat);
        }}
        currency={currency}
        onCurrencyChange={setCurrency}
        onClose={() => setSelectedProduct(null)}
      />

      <main
        className="container"
        style={{ paddingTop: "32px", paddingBottom: "32px" }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "32px",
            textTransform: "capitalize",
            color: "#111827",
          }}
        >
          {activeCategory}
        </h1>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onProductClick={(p) => {
                setIsCartOpen(false);
                setSelectedProduct(p);
              }}
              currency={currency}
              exchangeRate={exchangeRates[currency]}
            />
          ))}
        </div>
      </main>

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

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          isOpen={true}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          currency={currency}
          exchangeRate={exchangeRates[currency]}
        />
      )}
    </div>
  );
};

export default Index;
