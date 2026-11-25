import { Link } from "react-router-dom";
import { Card, Badge, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { formatPrice, discountPercent, thumbStyle } from "../services/storeService";
import { useCart } from "../contexts/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
const handleAdd = () => {
  addToCart(product.id);
  toast.success(`${product.name} added to cart`);
};

  return (
    <Card className="product-card">
      <Link to={`/products/${product.id}`} className="product-thumb text-decoration-none" style={thumbStyle(product)}>
        <Badge bg="danger" className="discount-pill">-{discountPercent(product)}%</Badge>
        <span>{product.emoji}</span>
      </Link>
      <Card.Body className="d-flex flex-column p-3">
        <Link to={`/products/${product.id}`} className="product-name mb-1">{product.name}</Link>
        <div className="small text-muted mb-2">
          <FaStar className="text-warning me-1" />{product.rating} ({product.reviews.toLocaleString("en-IN")})
        </div>
        <div className="mt-auto">
          <div className="mb-2">
            <span className="fw-bold fs-5">{formatPrice(product.price)}</span>{" "}
            <small className="text-muted text-decoration-line-through">{formatPrice(product.oldPrice)}</small>
          </div>
          <Button variant="primary" size="sm" className="w-100" onClick={handleAdd}>Add to Cart</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;