// src/Pages/Contact.tsx
import React, { useState, useContext } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  Rating,
  Stack,
  Paper,
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Contact: React.FC = () => {
  const { user } = useContext(AuthContext);
  const token = user?.token;

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [rating, setRating] = useState<number | null>(0);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!name || !email || !message || !rating) {
      setError("Please fill in all fields and select a rating.");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}reviews`,
        { name, email, message, rating },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );
      setSuccess("Thank you! Your review has been submitted.");
      setName(user?.name || "");
      setEmail(user?.email || "");
      setMessage("");
      setRating(0);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to submit review.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Contact / Leave a Review
      </Typography>
      <Typography variant="body1">
        We’d love to hear your feedback! Please leave a message and rate our website.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Email"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />

        <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
          <Typography component="legend" sx={{ mr: 2 }}>
            Rating:
          </Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
          />
        </Box>

        <TextField
          label="Message"
          fullWidth
          multiline
          minRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
        >
          Submit Review
        </Button>
      </Box>

      {/* Preview */}
      {message && (
        <Paper elevation={2} sx={{ mt: 4, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Preview:
          </Typography>
          <Stack spacing={1}>
            <Typography><strong>Name:</strong> {name}</Typography>
            <Typography><strong>Email:</strong> {email}</Typography>
            <Typography>
              <strong>Rating:</strong>{" "}
              <Rating value={rating} readOnly />
            </Typography>
            <Typography><strong>Message:</strong> {message}</Typography>
          </Stack>
        </Paper>
      )}
    </Container>
  );
};

export default Contact;
