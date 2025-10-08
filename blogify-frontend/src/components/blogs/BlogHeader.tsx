import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const BlogHeader: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: "center", mb: 6 }}>
      <Typography 
        variant="h3" 
        gutterBottom 
        sx={{ 
          fontWeight: 700,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Explore Blogs
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Discover amazing stories and insights from our community
      </Typography>
    </Box>
  );
};

export default BlogHeader;