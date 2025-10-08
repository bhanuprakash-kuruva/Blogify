import React from "react";
import { Card, Typography, Stack, Box, LinearProgress, useTheme } from "@mui/material";
import { 
  ThumbUp, 
  ThumbDown, 
  Comment, 
  Bookmark, 
  Visibility,
  TrendingUp 
} from "@mui/icons-material";
import { motion } from "framer-motion";
import type { Post, Comment as CommentType } from "../blogs/types/index";

interface StatsCardProps {
  post: Post;
  comments: CommentType[];
  isBookmarked: boolean;
  isTablet: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ post, comments, isBookmarked, isTablet }) => {
  const theme = useTheme();

  const stats = [
    {
      icon: <ThumbUp sx={{ fontSize: 20 }} />,
      label: "Likes",
      value: post.likes.length,
      color: theme.palette.primary.main,
      progress: Math.min((post.likes.length / (post.likes.length + post.dislikes.length || 1)) * 100, 100)
    },
    {
      icon: <ThumbDown sx={{ fontSize: 20 }} />,
      label: "Dislikes",
      value: post.dislikes.length,
      color: theme.palette.error.main,
      progress: Math.min((post.dislikes.length / (post.likes.length + post.dislikes.length || 1)) * 100, 100)
    },
    {
      icon: <Comment sx={{ fontSize: 20 }} />,
      label: "Comments",
      value: comments.length,
      color: theme.palette.info.main,
      progress: Math.min((comments.length / 50) * 100, 100) // Assuming 50 comments is max engagement
    },
    {
      icon: <Bookmark sx={{ fontSize: 20 }} />,
      label: "Bookmarked",
      value: isBookmarked ? "Yes" : "No",
      color: theme.palette.secondary.main,
      progress: isBookmarked ? 100 : 0
    },
    {
      icon: <Visibility sx={{ fontSize: 20 }} />,
      label: "Engagement",
      value: `${Math.round((post.likes.length + post.dislikes.length + comments.length) / 10)}%`,
      color: theme.palette.warning.main,
      progress: Math.min(((post.likes.length + post.dislikes.length + comments.length) / 100) * 100, 100)
    }
  ];

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
          top: 400
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
          <TrendingUp sx={{ color: theme.palette.primary.main }} />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}
          >
            Post Analytics
          </Typography>
        </Stack>

        <Stack spacing={2.5}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box sx={{ color: stat.color }}>
                      {stat.icon}
                    </Box>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: { xs: '0.75rem', md: '0.85rem' },
                        fontWeight: 600
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Stack>
                  <Typography 
                    variant="body2" 
                    fontWeight="bold"
                    sx={{ 
                      fontSize: { xs: '0.8rem', md: '0.9rem' },
                      color: stat.color
                    }}
                  >
                    {stat.value}
                  </Typography>
                </Stack>
                
                <LinearProgress 
                  variant="determinate" 
                  value={stat.progress}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 3,
                      backgroundColor: stat.color,
                      background: `linear-gradient(90deg, ${stat.color} 0%, ${stat.color}80 100%)`,
                    }
                  }}
                />
              </Box>
            </motion.div>
          ))}
        </Stack>

        {/* Engagement Score */}
        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
          }}
        >
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ fontSize: '0.75rem', opacity: 0.7 }}
          >
            Last updated: {new Date().toLocaleTimeString()}
          </Typography>
        </Box>
      </Card>
    </motion.div>
  );
};

export default StatsCard;