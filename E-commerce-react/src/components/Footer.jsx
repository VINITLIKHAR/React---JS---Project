import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer mt-5 pt-5 pb-4">
      <Container>
        <Row className="g-4">
          <Col xs={12} md={6}>
            <h4 className="text-white fw-bold">Shop<span style={{ color: "#818cf8" }}>zy</span></h4>
            <p className="small">Everything you love, delivered to your door. A demo store built to learn React structure and routing.</p>
          </Col>
          <Col xs={6} md={3}>
            <h6 className="text-white">Shop</h6>
            <ul className="list-unstyled small">
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </Col>
          <Col xs={6} md={3}>
            <h6 className="text-white">Account</h6>
            <ul className="list-unstyled small">
              <li><Link to="/profile">My Profile</Link></li>
              <li><Link to="/orders">My Orders</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </Col>
        </Row>
        <hr className="border-secondary mt-4" />
        <p className="small text-center mb-0">© {new Date().getFullYear()} Shopzy. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;