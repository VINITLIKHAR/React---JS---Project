import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { getOrders } from "../services/storeService";

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone || "",
    address: user.address || "",
  });
  const orderCount = getOrders(user.email).length;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(form);
    toast.success("Profile updated ✅");
  };

  const handleLogout = () => {
    logout();
    toast("Logged out. See you soon!", { icon: "👋" });
    navigate("/");
  };

  return (
    <Container className="py-4">
      <h1 className="section-title h2 mb-4">My Profile</h1>

      <Row className="g-4">
        {/* Left: summary card */}
        <Col md={4}>
          <Card className="border-0 shadow-sm text-center">
            <Card.Body className="p-4">
              <div className="avatar mx-auto mb-3">{user.name.charAt(0).toUpperCase()}</div>
              <h5 className="fw-bold mb-0">{user.name}</h5>
              <p className="text-muted small">{user.email}</p>

              <div className="bg-light rounded-3 p-3 mb-3">
                <div className="fs-3 fw-bold text-brand">{orderCount}</div>
                <small className="text-muted">Total orders</small>
              </div>

              <div className="d-grid gap-2">
                <Button as={Link} to="/orders" variant="outline-primary">View My Orders</Button>
                <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Right: edit form */}
        <Col md={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3">Personal Information</h5>
              <Form onSubmit={handleSubmit}>
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
                      placeholder="9876543210"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={12}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={user.email} disabled />
                  </Col>
                  <Col xs={12}>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="address"
                      placeholder="Your delivery address"
                      value={form.address}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Button type="submit" variant="primary" className="mt-4 px-4">Save Changes</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;