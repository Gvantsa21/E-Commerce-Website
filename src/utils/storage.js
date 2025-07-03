export const getCartItems = () => {
  const saved = localStorage.getItem("cartItems");
  return saved ? JSON.parse(saved) : [];
};

export const saveCartItems = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

export const getFormData = () => {
  const saved = localStorage.getItem("checkoutFormData");
  return saved ? JSON.parse(saved) : {};
};

export const saveFormData = (data) => {
  localStorage.setItem("checkoutFormData", JSON.stringify(data));
};

export const getCurrency = () => {
  return localStorage.getItem("currency") || "$";
};

export const saveCurrency = (currency) => {
  localStorage.setItem("currency", currency);
};

export const getActiveCategory = () => {
  return localStorage.getItem("activeCategory") || "WOMEN";
};

export const saveActiveCategory = (category) => {
  localStorage.setItem("activeCategory", category);
};
