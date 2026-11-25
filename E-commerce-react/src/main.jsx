import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./contexts/CartContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <App />
      <Toaster position="top-center" />
    </CartProvider>
  </BrowserRouter>,
);