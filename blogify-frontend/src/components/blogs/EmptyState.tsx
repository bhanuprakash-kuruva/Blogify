import React from "react";
import { Box, Typography, Button } from "@mui/material";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface EmptyStateProps {
  hasFilters: boolean;
  user: User | null;
}

const EmptyState: React.FC<EmptyStateProps> = ({ hasFilters, user }) => {
  return (
    <Box sx={{ textAlign: "center", py: 10 }}>
      <Typography variant="h5" gutterBottom color="text.secondary">
        📭 No posts found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {hasFilters 
          ? "Try adjusting your search criteria" 
          : "Be the first to create a post!"}
      </Typography>
      {user && (
        <Button variant="contained" href="/dashboard">
          Create Your First Post
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;