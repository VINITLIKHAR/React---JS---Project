import { createContext, useContext, useEffect, useState } from "react";
import { getProductById } from "../services/storeService";

const CART_KEY = "shopzy_cart";
const CartContext = createContext(null);

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  
  const [items, setItems] = useState(loadCart); // [{ id, qty }]

  // Save the cart in the browser, so it stays after refresh
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (productId, qty = 1) =>
    setItems((prev) =>
      prev.some((i) => i.id === productId)
        ? prev.map((i) => (i.id === productId ? { ...i, qty: i.qty + qty } : i))
        : [...prev, { id: productId, qty }]
    );

  const updateQty = (productId, qty) =>
    setItems((prev) => prev.map((i) => (i.id === productId ? { ...i, qty: Math.max(1, qty) } : i)));

  const removeFromCart = (productId) => setItems((prev) => prev.filter((i) => i.id !== productId));

  const clearCart = () => setItems([]);

  // Merge ids with full product details
  const cartItems = items.map((i) => ({ ...getProductById(i.id), qty: i.qty }));
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 49;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{ cartItems, count, subtotal, shipping, total, addToCart, updateQty, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);