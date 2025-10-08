import React from "react";
import { Card, Stack, Avatar, Typography, Box, Button, useTheme } from "@mui/material";
import { Email, CalendarToday } from "@mui/icons-material";
import { motion } from "framer-motion";

interface AuthorCardProps {
  author: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  createdAt: string;
  isTablet: boolean;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author, createdAt, isTablet }) => {
  const theme = useTheme();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
      <Card 
        sx={{ 
          p: { xs: 2, sm: 3 }, 
          borderRadius: { xs: 2, sm: 3 },
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
          boxShadow: `0 8px 32px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`,
          position: 'sticky',
          top: 100
        }}
      >
        <Stack alignItems="center" spacing={3}>
          {/* Avatar */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Avatar 
              sx={{ 
                width: { xs: 80, md: 100 }, 
                height: { xs: 80, md: 100 }, 
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 'bold',
                boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
              }}
            >
              {author.name.charAt(0).toUpperCase()}
            </Avatar>
          </motion.div>

          {/* Author Info */}
          <Box textAlign="center" sx={{ width: '100%' }}>
            <Typography 
              variant={isTablet ? "h6" : "h5"} 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {author.name}
            </Typography>
            
            <Typography 
              variant="body2" 
              color="text.secondary" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                fontWeight: 600,
                mb: 2
              }}
            >
              {author.role}
            </Typography>

            {/* Email */}
            <Stack direction="row" alignItems="center" spacing={1} justifyContent="center" sx={{ mb: 1 }}>
              <Email sx={{ fontSize: 16, color: theme.palette.primary.main }} />
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ 
                  fontSize: { xs: '0.7rem', md: '0.8rem' },
                  wordBreak: 'break-word'
                }}
              >
                {author.email}
              </Typography>
            </Stack>

            {/* Join Date */}
            <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
              <CalendarToday sx={{ fontSize: 14, color: theme.palette.secondary.main }} />
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}
              >
                Joined {formatDate(createdAt)}
              </Typography>
            </Stack>
          </Box>

          {/* Follow Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  color: 'white',
                }
              }}
            >
              Follow Author
            </Button>
          </motion.div>
        </Stack>
      </Card>
    </motion.div>
  );
};

export default AuthorCard;