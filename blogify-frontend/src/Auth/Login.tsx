import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  useTheme,
} from "@mui/material";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const theme = useTheme(); // Access theme
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post(`${BASE_URL}auth/login`, form);
      login(res.data); // save user in context
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 4,
          bgcolor:
            theme.palette.mode === "light"
              ? "background.paper"
              : "background.default",
          borderRadius: 2,
          boxShadow: 2,
          transition: "background-color 0.3s ease",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            variant="outlined"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, py: 1.5, fontWeight: 600 }}
          >
            Login
          </Button>
        </form>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: theme.palette.text.secondary }}
        >
          Don’t have an account? <a href="/signup">Sign Up</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
