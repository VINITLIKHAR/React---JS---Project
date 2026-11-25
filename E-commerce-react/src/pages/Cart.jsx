import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { useCart } from "../contexts/CartContext";
import { formatPrice, thumbStyle } from "../services/storeService";

const Cart = () => {
  const { cartItems, subtotal, shipping, total, updateQty, removeFromCart } = useCart();

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <Container className="py-5 text-center">
        <div style={{ fontSize: "5rem" }}>🛒</div>
        <h3>Your cart is empty</h3>
        <p className="text-muted">Looks like you haven't added anything yet.</p>
        <Button as={Link} to="/products" variant="primary" size="lg">Start Shopping</Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="section-title h2 mb-4">Shopping Cart</h1>

      <Row className="g-4">
        {/* Left: items */}
        <Col lg={8}>
          <div className="d-flex flex-column gap-3">
            {cartItems.map((item) => (
              <Card key={item.id} className="border-0 shadow-sm">
                <Card.Body className="d-flex gap-3 align-items-center flex-wrap">
                  <div className="cart-thumb" style={thumbStyle(item)}>{item.emoji}</div>

                  <div className="flex-grow-1" style={{ minWidth: 150 }}>
                    <Link to={`/products/${item.id}`} className="product-name">{item.name}</Link>
                    <div className="text-muted small">{formatPrice(item.price)} each</div>
                  </div>

                  <div className="btn-group btn-group-sm">
                    <Button variant="outline-secondary" onClick={() => updateQty(item.id, item.qty - 1)}>−</Button>
                    <Button variant="light" disabled className="px-3 text-dark">{item.qty}</Button>
                    <Button variant="outline-secondary" onClick={() => updateQty(item.id, item.qty + 1)}>+</Button>
                  </div>

                  <div className="fw-bold text-end" style={{ minWidth: 80 }}>
                    {formatPrice(item.price * item.qty)}
                  </div>

                  <Button
                    variant="link"
                    className="text-danger p-0"
                    aria-label="Remove item"
                    onClick={() => {
                      removeFromCart(item.id);
                      toast("Item removed", { icon: "🗑️" });
                    }}
                  >
                    <FiTrash2 size={20} />
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>

        {/* Right: summary */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm summary-sticky">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Shipping</span>
                <span className={shipping === 0 ? "text-success" : ""}>
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <small className="text-muted">Add {formatPrice(999 - subtotal)} more for free delivery</small>
              )}
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Button as={Link} to="/checkout" variant="primary" size="lg" className="w-100">
                Proceed to Checkout
              </Button>
              <Button as={Link} to="/products" variant="link" className="w-100 mt-2 text-decoration-none">
                Continue shopping
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;