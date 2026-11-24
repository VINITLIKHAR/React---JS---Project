import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../services/storeService";

const sorters = {
  popular: (a, b) => b.reviews - a.reviews,
  low: (a, b) => a.price - b.price,
  high: (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
};

const Products = () => {
  // Filters live in the URL: /products?category=fashion&q=shoes&sort=low
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const category = params.get("category") || "all";
  const sort = params.get("sort") || "popular";

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const list = useMemo(() => { 
    const filtered = products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        p.name.toLowerCase().includes(q.toLowerCase())
    );
    return [...filtered].sort(sorters[sort] || sorters.popular);
  }, [q, category, sort]);

  return (
    <Container className="py-4">
      <h1 className="section-title h2 mb-1">All Products</h1>
      <p className="text-muted">{list.length} product{list.length !== 1 && "s"} found</p>

      <Row className="g-2 mb-3">
        <Col xs={12} md={7}>
          <div className="position-relative">
            <FiSearch className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
            <Form.Control
              className="ps-5"
              placeholder="Search products..."
              value={q}
              onChange={(e) => setParam("q", e.target.value)}
            />
          </div>
        </Col>
        <Col xs={12} md={5}>
          <Form.Select value={sort} onChange={(e) => setParam("sort", e.target.value)}>
            <option value="popular">Sort: Most Popular</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </Form.Select>
        </Col>
      </Row>

      <div className="pill-scroll mb-3">
        <Button size="sm" variant={category === "all" ? "primary" : "outline-primary"} onClick={() => setParam("category", "all")}>
          All
        </Button>
        {categories.map((c) => (
          <Button
            key={c.slug}
            size="sm"
            variant={category === c.slug ? "primary" : "outline-primary"}
            onClick={() => setParam("category", c.slug)}
          >
            {c.icon} {c.name}
          </Button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: "4rem" }}>🔍</div>
          <h4>No products found</h4>
          <p className="text-muted">Try a different search or category.</p>
          <Button as={Link} to="/products" variant="primary">Clear filters</Button>
        </div>
      ) : (
        <Row className="g-3 row-cols-2 row-cols-md-3 row-cols-lg-4">
          {list.map((item) => (
            <Col key={item.id}>
              <ProductCard product={item} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Products;