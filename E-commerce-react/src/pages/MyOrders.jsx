import { Link } from "react-router-dom";
import { Container, Card, Badge, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { getOrders, formatPrice } from "../services/storeService";

const statusColor = { Processing: "warning", Shipped: "info", Delivered: "success" };

const MyOrders = () => {
  const { user } = useAuth();
  const orders = getOrders(user.email);

  // No orders yet
  if (orders.length === 0) {
    return (
      <Container className="py-5 text-center">
        <div style={{ fontSize: "5rem" }}>📦</div>
        <h3>No orders yet</h3>
        <p className="text-muted">When you place an order, it will show up here.</p>
        <Button as={Link} to="/products" variant="primary" size="lg">Browse Products</Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="section-title h2 mb-4">My Orders</h1>

      <div className="d-flex flex-column gap-3">
        {orders.map((order) => (
          <Card key={order.id} className="border-0 shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center flex-wrap gap-2 py-3">
              <div>
                <div className="fw-bold">{order.id}</div>
                <small className="text-muted">
                  {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  {" · "}
                  {order.payment}
                </small>
              </div>
              <Badge bg={statusColor[order.status] || "secondary"} className="px-3 py-2">{order.status}</Badge>
            </Card.Header>

            <Card.Body>
              {order.items.map((item) => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span>{item.emoji} {item.name} <span className="text-muted">× {item.qty}</span></span>
                  <span>{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                <small className="text-muted">📍 {order.shipTo}</small>
                <div className="fw-bold fs-5">Total: {formatPrice(order.total)}</div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default MyOrders;