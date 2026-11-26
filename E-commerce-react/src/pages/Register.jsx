import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

  if (user) return <Navigate to="/" replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    if (form.password !== form.confirm) return toast.error("Passwords do not match");

    try {
      register({ name: form.name.trim(), email: form.email, password: form.password });
      toast.success("Account created! 🎉");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Container className="py-5">
      <Card className="auth-card">
        <Card.Body className="p-4 p-md-5">
          <div className="text-center mb-4">
            <div style={{ fontSize: "3rem" }}>🎁</div>
            <h2 className="fw-bold">Create account</h2>
            <p className="text-muted mb-0">Join Shopzy in less than a minute</p>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full name</Form.Label>
              <Form.Control name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Min 6 characters"
                value={form.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                name="confirm"
                placeholder="Repeat password"
                value={form.confirm}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" size="lg" className="w-100">Sign up</Button>
          </Form>

          <p className="text-center text-muted mt-4 mb-0">
            Already have an account?{" "}
            <Link to="/login" className="text-brand fw-semibold text-decoration-none">Login</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;