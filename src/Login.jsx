import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container, CircularProgress, TextField } from "@mui/material";
import { app } from "./firebase";

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Dummy authentication logic
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (email === "Admin" && password === "Z@123") {
        setAuthenticated(true);
        navigate("/app"); // Redirect to the main app page
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <Container maxWidth="sm" className="login-container">
      <Box sx={{ mt: 10, p: 4, boxShadow: 6, borderRadius: 4, textAlign: "center", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)" }}>
        <img
          src={process.env.BASE_URL ? process.env.BASE_URL + 'GRlogo.webp' : '/GRlogo.webp'}
          alt="GR Logo"
          style={{ width: 500, height: 140, objectFit: "contain", marginBottom: 2 }}
        />
        <Typography variant="subtitle1" sx={{ mb: 3, color: "#555" }}>
          Sign in to your 3D Visualizer
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleLogin} autoComplete="off">
          <TextField
            label="User Name"
            variant="outlined"
            fullWidth
            sx={{ mb: 2, borderRadius: 2, background: "#f7f8fa" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{ style: { borderRadius: 12 } }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ mb: 3, borderRadius: 2, background: "#f7f8fa" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{ style: { borderRadius: 12 } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.5,
              fontWeight: 600,
              fontSize: "1.1rem",
              borderRadius: 3,
              background: "linear-gradient(90deg, #3a7bd5 0%, #3a6073 100%)", // blue to gray gradient
              boxShadow: "0 4px 20px 0 rgba(34, 34, 87, 0.15)",
              letterSpacing: 1
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Sign In"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
