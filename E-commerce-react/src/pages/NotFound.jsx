import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container className="py-5 text-center">
      <div style={{ fontSize: "5rem" }}>🧭</div>
      <h1 className="display-1 fw-bold text-brand">404</h1>
      <h3>Oops! Page not found</h3>
      <p className="text-muted mb-4">The page you are looking for doesn't exist or has been moved.</p>
      <div className="d-flex gap-2 justify-content-center flex-wrap">
        <Button as={Link} to="/" variant="primary" size="lg">Go Home</Button>
        <Button as={Link} to="/products" variant="outline-primary" size="lg">Browse Products</Button>
      </div>
    </Container>
  );
};

export default NotFound;