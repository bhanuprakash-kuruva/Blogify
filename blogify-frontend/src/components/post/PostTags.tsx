import React from "react";
import { Box, Chip, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { LocalOffer } from "@mui/icons-material";

interface PostTagsProps {
  tags: string[];
  isMobile: boolean;
}

const PostTags: React.FC<PostTagsProps> = ({ tags, isMobile }) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography 
        variant="h6" 
        gutterBottom
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontSize: { xs: '1rem', sm: '1.1rem' },
          fontWeight: 600,
          color: 'text.primary',
          mb: 2
        }}
      >
        <LocalOffer sx={{ fontSize: 20 }} />
        Tags
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {tags.map((tag, index) => (
          <motion.div
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Chip
              label={tag}
              size={isMobile ? "small" : "medium"}
              variant="outlined"
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                height: { xs: 24, sm: 32 },
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                background: `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, ${theme.palette.secondary.light}20 100%)`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  color: 'white',
                  borderColor: 'transparent',
                  boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                },
                transition: 'all 0.3s ease',
              }}
            />
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default PostTags;