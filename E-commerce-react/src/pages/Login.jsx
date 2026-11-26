import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/"; // page the user wanted before login (used in Step 9)
  const [form, setForm] = useState({ email: "", password: "" });

  // Already logged in? Go home.
  if (user) return <Navigate to="/" replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(form);
      toast.success("Welcome back! 👋");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Container className="py-5">
      <Card className="auth-card">
        <Card.Body className="p-4 p-md-5">
          <div className="text-center mb-4">
            <div style={{ fontSize: "3rem" }}>🔐</div>
            <h2 className="fw-bold">Welcome back</h2>
            <p className="text-muted mb-0">Login to continue shopping</p>
          </div>

          <Form onSubmit={handleSubmit}>
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
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" size="lg" className="w-100">Login</Button>
          </Form>

          <p className="text-center text-muted mt-4 mb-0">
            New here?{" "}
            <Link to="/register" className="text-brand fw-semibold text-decoration-none">Create an account</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;