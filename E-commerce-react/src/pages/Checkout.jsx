import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { formatPrice, saveOrder } from "../services/storeService";

const paymentOptions = [
  { value: "COD", label: "💵 Cash on Delivery" },
  { value: "UPI", label: "📱 UPI" },
  { value: "Card", label: "💳 Credit / Debit Card" },
];

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, subtotal, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false); // stops the "empty cart" redirect after a successful order

  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone || "",
    address: user.address || "",
    city: "",
    pincode: "",
    payment: "COD",
  });

  // Nothing to buy? Go back to the cart.
  if (cartItems.length === 0 && !placed) return <Navigate to="/cart" replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    saveOrder({
      email: user.email,
      items: cartItems.map(({ id, name, emoji, price, qty }) => ({ id, name, emoji, price, qty })),
      total,
      payment: form.payment,
      shipTo: `${form.name}, ${form.address}, ${form.city} - ${form.pincode}`,
    });

    setPlaced(true);
    clearCart();
    toast.success("Order placed successfully! 🎉");
    navigate("/orders"); // this page is built in Step 10
  };

  return (
    <Container className="py-4">
      <h1 className="section-title h2 mb-4">Checkout</h1>

      <Form onSubmit={handleSubmit}>
        <Row className="g-4">
          {/* Left: delivery + payment */}
          <Col lg={7}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3">Delivery Details</h5>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Label>Full name</Form.Label>
                    <Form.Control name="name" value={form.name} onChange={handleChange} required />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      name="phone"
                      type="tel"
                      pattern="[0-9]{10}"
                      title="10 digit phone number"
                      placeholder="9876543210"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                  <Col xs={12}>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="address"
                      placeholder="House no, street, area"
                      value={form.address}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                  <Col xs={7}>
                    <Form.Label>City</Form.Label>
                    <Form.Control name="city" value={form.city} onChange={handleChange} required />
                  </Col>
                  <Col xs={5}>
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                      name="pincode"
                      pattern="[0-9]{6}"
                      title="6 digit pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3">Payment Method</h5>
                {paymentOptions.map((opt) => (
                  <Form.Check
                    key={opt.value}
                    type="radio"
                    id={`pay-${opt.value}`}
                    name="payment"
                    value={opt.value}
                    label={opt.label}
                    checked={form.payment === opt.value}
                    onChange={handleChange}
                    className="border rounded-3 p-3 ps-5 mb-2"
                  />
                ))}
              </Card.Body>
            </Card>
          </Col>

          {/* Right: order summary */}
          <Col lg={5}>
            <Card className="border-0 shadow-sm summary-sticky">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3">Your Order</h5>
                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between small mb-2">
                    <span>{item.emoji} {item.name} × {item.qty}</span>
                    <span>{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Shipping</span>
                  <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-100">Place Order</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Checkout;