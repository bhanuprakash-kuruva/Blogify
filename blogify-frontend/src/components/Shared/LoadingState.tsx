import React from "react";
import { Box, Stack, CircularProgress, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

interface LoadingStateProps {
  isMobile: boolean;
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  isMobile, 
  message = "Loading post..." 
}) => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "80vh",
        px: 2,
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
      }}
    >
      <Stack alignItems="center" spacing={3}>
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <CircularProgress 
            size={isMobile ? 60 : 80}
            thickness={4}
            sx={{
              color: theme.palette.primary.main,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            }}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            color="text.primary"
            textAlign="center"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: 600,
            }}
          >
            {message}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
            textAlign="center"
            sx={{ maxWidth: 300 }}
          >
            Preparing an amazing reading experience for you...
          </Typography>
        </motion.div>
      </Stack>
    </Box>
  );
};

export default LoadingState;