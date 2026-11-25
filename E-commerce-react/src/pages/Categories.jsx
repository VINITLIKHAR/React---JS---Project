import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { categories, products } from "../services/storeService";

const Categories = () => {
  return (
    <Container className="py-4">
      <h1 className="section-title h2 mb-1">Categories</h1>
      <p className="text-muted mb-4">Pick a category to start exploring.</p>

      <Row className="g-3">
        {categories.map((c) => {
          // Count how many products belong to this category
          const count = products.filter((p) => p.category === c.slug).length;

          return (
            <Col xs={6} md={4} key={c.slug}>
              <Link
                to={`/products?category=${c.slug}`}
                className="cat-card py-5"
                style={{ background: `linear-gradient(135deg, ${c.colors[0]}, ${c.colors[1]})` }}
              >
                <div className="cat-icon" style={{ fontSize: "3.5rem" }}>{c.icon}</div>
                <h5 className="fw-bold mt-2 mb-0">{c.name}</h5>
                <small className="opacity-75">{count} products</small>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Categories;