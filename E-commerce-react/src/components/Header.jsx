import { Link, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

// Small cart icon with a red count badge
const CartLink = ({ className = "" }) => {
  const { count } = useCart();
  return (
    <Nav.Link as={Link} to="/cart" className={`position-relative ${className}`} aria-label="Cart">
      <FiShoppingCart size={22} />
      {count > 0 && (
        <Badge pill bg="danger" className="cart-badge">{count}</Badge>
      )}
    </Nav.Link>
  );
};

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" sticky="top" className="shop-navbar py-2" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          Shop<span>zy</span>
        </Navbar.Brand>

        {/* Cart stays visible on mobile, outside the ☰ menu */}
        <div className="d-flex align-items-center ms-auto me-2 d-lg-none">
          <CartLink />
        </div>
        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
            <Nav.Link as={NavLink} to="/categories">Categories</Nav.Link>
          </Nav>

          <Nav className="align-items-lg-center">
            <CartLink className="d-none d-lg-block" />

            {user ? (
              <NavDropdown
                align="end"
                title={<span><FiUser className="me-1" />{user.name.split(" ")[0]}</span>}
              >
                <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/orders">My Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="d-flex gap-2 mt-2 mt-lg-0 ms-lg-2">
                <Link to="/login" className="btn btn-outline-primary btn-sm px-3">Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm px-3">Sign up</Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;