import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../services/storeService";

const perks = [
  { icon: <FiTruck />, title: "Free Delivery", text: "On orders above ₹999" },
  { icon: <FiShield />, title: "Secure Payment", text: "100% protected checkout" },
  { icon: <FiRefreshCw />, title: "Easy Returns", text: "7-day return policy" },
  { icon: <FiHeadphones />, title: "24/7 Support", text: "We're always here" },
];

const Home = () => {
  const featured = products.slice(0, 8);

  return (
    <Container className="py-3 py-md-4">
      {/* Hero */}
      <section className="hero p-4 p-md-5">
        <Row className="align-items-center">
          <Col md={7}>
            <span className="badge bg-light text-dark mb-3">🔥 Festive Sale · Up to 50% off</span>
            <h1 className="display-5 fw-bold">Shop smarter.<br />Live better.</h1>
            <p className="lead opacity-75 mb-4">Discover trending gadgets, fashion, home essentials and more at prices you'll love.</p>
            <div className="d-flex gap-2 flex-wrap">
              <Button as={Link} to="/products" variant="light" size="lg">Shop Now</Button>
              <Button as={Link} to="/categories" variant="outline-light" size="lg">Browse Categories</Button>
            </div>
          </Col>
          <Col md={5} className="text-center mt-4 mt-md-0">
            <div className="hero-emoji">🛍️</div>
          </Col>
        </Row>
      </section>

      {/* Perks */}
      <Row className="g-3 mt-3">
        {perks.map((perk) => (
          <Col xs={12} sm={6} lg={3} key={perk.title}>
            <div className="d-flex align-items-center gap-3 bg-white rounded-4 p-3 shadow-sm h-100">
              <div className="perk-icon">{perk.icon}</div>
              <div>
                <div className="fw-semibold">{perk.title}</div>
                <small className="text-muted">{perk.text}</small>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Categories */}
      <div className="d-flex justify-content-between align-items-end mt-5 mb-3">
        <h2 className="section-title h3 mb-0">Shop by Category</h2>
        <Link to="/categories" className="text-brand fw-semibold text-decoration-none">View all →</Link>
      </div>
      <Row className="g-3">
        {categories.map((c) => (
          <Col xs={6} md={4} lg={2} key={c.slug}>
            <Link
              to={`/products?category=${c.slug}`}
              className="cat-card"
              style={{ background: `linear-gradient(135deg, ${c.colors[0]}, ${c.colors[1]})` }}
            >
              <div className="cat-icon">{c.icon}</div>
              <div className="fw-semibold mt-2">{c.name}</div>
            </Link>
          </Col>
        ))}
      </Row>

      {/* Featured products */}
      <div className="d-flex justify-content-between align-items-end mt-5 mb-3">
        <h2 className="section-title h3 mb-0">Trending Now</h2>
        <Link to="/products" className="text-brand fw-semibold text-decoration-none">See all →</Link>
      </div>
      <Row className="g-3 row-cols-2 row-cols-md-3 row-cols-lg-4">
        {featured.map((item) => (
          <Col key={item.id}>
            <ProductCard product={item} />
          </Col>
        ))}
      </Row>

      {/* Promo banner */}
      <section
        className="rounded-4 p-4 p-md-5 mt-5 text-center text-white"
        style={{ background: "linear-gradient(135deg,#0f172a,#312e81)" }}
      >
        <h3 className="fw-bold">Get 10% off your first order 🎁</h3>
        <p className="opacity-75">Create an account today and start saving instantly.</p>
        <Button as={Link} to="/register" variant="light" size="lg">Create Free Account</Button>
      </section>
    </Container>
  );
};

export default Home;