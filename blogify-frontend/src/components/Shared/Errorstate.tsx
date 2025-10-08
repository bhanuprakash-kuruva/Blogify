import React from "react";
import { Container, Typography, Button, Box, Stack, useTheme } from "@mui/material";
import { ArrowBack, ErrorOutline, Refresh } from "@mui/icons-material";
import { motion } from "framer-motion";

interface ErrorStateProps {
  error: string | null;
  isMobile: boolean;
  onNavigate: () => void;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  error, 
  isMobile, 
  onNavigate,
  onRetry 
}) => {
  const theme = useTheme();

  return (
    <Container 
      sx={{ 
        mt: 8, 
        textAlign: "center",
        px: { xs: 2, sm: 3 },
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Stack alignItems="center" spacing={3}>
          {/* Error Icon */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ErrorOutline 
              sx={{ 
                fontSize: isMobile ? 80 : 120,
                color: theme.palette.error.main,
                opacity: 0.8,
              }} 
            />
          </motion.div>

          {/* Error Message */}
          <Box>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              color="error" 
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Oops! Something went wrong
            </Typography>
            
            <Typography 
              variant={isMobile ? "body1" : "h6"} 
              color="text.secondary"
              sx={{
                maxWidth: 400,
                lineHeight: 1.6,
                mb: 1,
              }}
            >
              {error || "The post you're looking for doesn't exist or may have been removed."}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={2}
            sx={{ mt: 2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="contained" 
                onClick={onNavigate}
                startIcon={<ArrowBack />}
                sx={{
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                  '&:hover': {
                    boxShadow: `0 6px 20px ${theme.palette.primary.main}60`,
                    transform: 'translateY(-1px)',
                  },
                }}
                size={isMobile ? "medium" : "large"}
              >
                Back to Blogs
              </Button>
            </motion.div>

            {onRetry && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outlined" 
                  onClick={onRetry}
                  startIcon={<Refresh />}
                  sx={{
                    borderRadius: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      transform: 'translateY(-1px)',
                    },
                  }}
                  size={isMobile ? "medium" : "large"}
                >
                  Try Again
                </Button>
              </motion.div>
            )}
          </Stack>

          {/* Additional Help */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ 
                mt: 3,
                display: 'block',
                opacity: 0.7,
              }}
            >
              If the problem persists, please contact support
            </Typography>
          </motion.div>
        </Stack>
      </motion.div>
    </Container>
  );
};

export default ErrorState;