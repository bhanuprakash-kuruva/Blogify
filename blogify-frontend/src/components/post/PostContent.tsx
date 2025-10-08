import React from "react";
import { Card, CardContent, Typography, Box, Divider, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import PostTags from "./PostTags";
import type { Post } from "../../types";

interface PostContentProps {
  post: Post;
  isMobile: boolean;
}

const MotionCard = motion(Card);

const PostContent: React.FC<PostContentProps> = ({ post, isMobile }) => {
  const theme = useTheme();

  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      sx={{
        mb: { xs: 3, sm: 4 },
        borderRadius: { xs: 2, sm: 3 },
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
        boxShadow: `0 4px 20px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}`,
        border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`,
      }}
    >
      <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
        {/* Tags Section */}
        {post.tags && post.tags.length > 0 && (
          <>
            <PostTags tags={post.tags} isMobile={isMobile} />
            <Divider sx={{ my: 4 }} />
          </>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-line",
              lineHeight: 1.8,
              fontSize: { 
                xs: '0.95rem', 
                sm: '1.05rem', 
                md: '1.1rem' 
              },
              color: 'text.primary',
              '& p': { 
                mb: 3,
                textAlign: 'justify'
              },
              '& h1, & h2, & h3, & h4, & h5, & h6': {
                mt: 4,
                mb: 2,
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              },
              '& h1': { fontSize: '2rem' },
              '& h2': { fontSize: '1.75rem' },
              '& h3': { fontSize: '1.5rem' },
              '& blockquote': {
                borderLeft: `4px solid ${theme.palette.primary.main}`,
                pl: 3,
                py: 1,
                my: 3,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                fontStyle: 'italic',
                borderRadius: '0 8px 8px 0',
              },
              '& code': {
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
                px: 1,
                py: 0.5,
                borderRadius: 1,
                fontSize: '0.9em',
                fontFamily: 'monospace',
              },
              '& pre': {
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.04)',
                p: 2,
                borderRadius: 2,
                overflow: 'auto',
                my: 3,
              },
              '& ul, & ol': {
                pl: 3,
                mb: 2,
              },
              '& li': {
                mb: 1,
              }
            }}
          >
            {post.content}
          </Typography>
        </motion.div>

        {/* Reading Stats */}
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontSize: '0.8rem',
              opacity: 0.7,
            }}
          >
            {Math.ceil(post.content.split(/\s+/).length / 200)} min read • 
            {post.content.split(/\s+/).length} words
          </Typography>
        </Box>
      </CardContent>
    </MotionCard>
  );
};

export default PostContent;