import React from "react";
import { Card, CardContent, Box, Typography, Stack, Chip, useTheme } from "@mui/material";
import { Share, BookmarkBorder, Bookmark } from "@mui/icons-material";
import { motion } from "framer-motion";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import type { Post } from "../../types";

interface PostHeaderProps {
  post: Post;
  isMobile: boolean;
  isTablet: boolean;
  onBookmark: () => void;
}

const MotionCard = motion(Card);

const PostHeader: React.FC<PostHeaderProps> = ({
  post,
  isMobile,
  isTablet,
  onBookmark,
}) => {
  const theme = useTheme();

  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{ 
        mb: { xs: 3, sm: 4 }, 
        borderRadius: { xs: 2, sm: 3 },
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
        boxShadow: `0 8px 32px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
        '&:hover': {
          boxShadow: `0 12px 48px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.15)'}`,
          transition: 'all 0.3s ease-in-out'
        }
      }}
    >
      {/* Post Image */}
      {post.imageUrl && (
        <PostImage 
          imageUrl={post.imageUrl}
          title={post.title}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      )}
      
      <CardContent sx={{ 
        p: { xs: 2, sm: 3, md: 4 } 
      }}>
        {/* Category and Status */}
        <Stack 
          direction="row" 
          spacing={1} 
          alignItems="center" 
          sx={{ mb: 2 }}
          flexWrap="wrap"
          gap={1}
        >
          {post.category && (
            <Chip 
              label={post.category.name} 
              color="primary" 
              variant="filled"
              size={isMobile ? "small" : "medium"}
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: 'white',
                fontWeight: 600,
              }}
            />
          )}
          {post.status === 'draft' && (
            <Chip 
              label="Draft" 
              color="warning" 
              size={isMobile ? "small" : "medium"}
              sx={{ fontWeight: 600 }}
            />
          )}
        </Stack>

        {/* Title */}
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          gutterBottom 
          sx={{ 
            fontWeight: 800,
            fontSize: { 
              xs: '1.75rem', 
              sm: '2.125rem', 
              md: '2.5rem',
              lg: '2.75rem'
            },
            lineHeight: 1.1,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            mb: 3
          }}
        >
          {post.title}
        </Typography>

        {/* Author Meta */}
        <PostMeta 
          post={post}
          isMobile={isMobile}
          onBookmark={onBookmark}
        />
      </CardContent>
    </MotionCard>
  );
};

export default PostHeader;