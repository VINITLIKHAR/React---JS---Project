import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Categories from "../pages/Categories";
import Cart from "../pages/Cart";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout = Header + page + Footer */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="categories" element={<Categories />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
