import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { FiTruck, FiRefreshCw, FiShield } from "react-icons/fi";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import {
  getProductById,
  getCategory,
  products,
  formatPrice,
  discountPercent,
  thumbStyle,
} from "../services/storeService";

const ProductDetails = () => {
  const { id } = useParams(); // from the route: /products/:id
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const product = getProductById(id);

  // If someone opens /products/999 (no such product)
  if (!product) {
    return (
      <Container className="py-5 text-center">
        <div style={{ fontSize: "4rem" }}>😕</div>
        <h3>Product not found</h3>
        <Button as={Link} to="/products" variant="primary" className="mt-2">
          Back to Products
        </Button>
      </Container>
    );
  }

  const category = getCategory(product.category);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    // Cart will be connected in Step 7. For now we only show a message.
    toast.success(`${qty} × ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    handleAdd();
    navigate("/checkout"); // this page is built in Step 9
  };

  return (
    <Container className="py-4">
      {/* Breadcrumb */}
      <nav className="small text-muted mb-3">
        <Link to="/" className="text-muted">Home</Link> /{" "}
        <Link to="/products" className="text-muted">Products</Link> /{" "}
        <span className="text-dark">{product.name}</span>
      </nav>

      <Row className="g-4">
        {/* Left: image */}
        <Col md={6}>
          <div className="product-thumb lg" style={thumbStyle(product)}>
            <span>{product.emoji}</span>
          </div>
        </Col>

        {/* Right: details */}
        <Col md={6}>
          <Badge
            bg="light"
            text="dark"
            as={Link}
            to={`/products?category=${product.category}`}
            className="text-decoration-none mb-2"
          >
            {category?.icon} {category?.name}
          </Badge>

          <h1 className="section-title h2">{product.name}</h1>

          <div className="mb-3">
            <FaStar className="text-warning me-1" />
            <strong>{product.rating}</strong>{" "}
            <span className="text-muted">({product.reviews.toLocaleString("en-IN")} reviews)</span>
          </div>

          <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
            <span className="display-6 fw-bold">{formatPrice(product.price)}</span>
            <span className="text-muted text-decoration-line-through">{formatPrice(product.oldPrice)}</span>
            <Badge bg="success">{discountPercent(product)}% OFF</Badge>
          </div>

          <p className="text-muted">{product.description}</p>

          {/* Quantity */}
          <div className="d-flex align-items-center gap-3 my-4">
            <span className="fw-semibold">Quantity</span>
            <div className="btn-group">
              <Button variant="outline-secondary" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</Button>
              <Button variant="light" disabled className="px-4 text-dark">{qty}</Button>
              <Button variant="outline-secondary" onClick={() => setQty((q) => q + 1)}>+</Button>
            </div>
          </div>

          <div className="d-grid d-sm-flex gap-2">
            <Button variant="primary" size="lg" className="flex-fill" onClick={handleAdd}>Add to Cart</Button>
            <Button variant="outline-primary" size="lg" className="flex-fill" onClick={handleBuyNow}>Buy Now</Button>
          </div>

          <div className="d-flex flex-wrap gap-3 mt-4 small text-muted">
            <span><FiTruck className="me-1" /> Free delivery over ₹999</span>
            <span><FiRefreshCw className="me-1" /> 7-day returns</span>
            <span><FiShield className="me-1" /> 1-year warranty</span>
          </div>
        </Col>
      </Row>

      {/* Related products */}
      {related.length > 0 && (
        <>
          <h3 className="section-title h4 mt-5 mb-3">You may also like</h3>
          <Row className="g-3 row-cols-2 row-cols-md-4">
            {related.map((item) => (
              <Col key={item.id}>
                <ProductCard product={item} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProductDetails;