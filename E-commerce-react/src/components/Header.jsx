import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar expand="lg" sticky="top" className="shop-navbar py-2" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          Shop<span>zy</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
            <Nav.Link as={NavLink} to="/categories">Categories</Nav.Link>
          </Nav>

          <div className="d-flex gap-2 mt-2 mt-lg-0">
            <Link to="/login" className="btn btn-outline-primary btn-sm px-3">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm px-3">Sign up</Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;