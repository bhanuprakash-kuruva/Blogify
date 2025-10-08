import React from "react";
import { Stack, Avatar, Typography, Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { Share, BookmarkBorder, Bookmark } from "@mui/icons-material";
import { motion } from "framer-motion";
import type { Post } from "../../types";

interface PostMetaProps {
  post: Post;
  isMobile: boolean;
  onBookmark: () => void;
}

const PostMeta: React.FC<PostMetaProps> = ({
  post,
  isMobile,
  onBookmark,
}) => {
  const theme = useTheme();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.content.substring(0, 100) + '...',
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // Show snackbar would be handled by parent
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  return (
    <Stack 
      direction={{ xs: "column", sm: "row" }} 
      spacing={2} 
      alignItems={{ xs: "flex-start", sm: "center" }}
      sx={{ mb: 3 }}
    >
      {/* Author Info */}
      <Stack 
        direction="row" 
        spacing={2} 
        alignItems="center"
        sx={{ width: { xs: '100%', sm: 'auto' } }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Avatar 
            sx={{ 
              width: { xs: 48, sm: 56 }, 
              height: { xs: 48, sm: 56 }, 
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              fontSize: { xs: '1.2rem', sm: '1.4rem' },
              fontWeight: 'bold',
              boxShadow: `0 4px 12px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.2)'}`
            }}
          >
            {post.author.name.charAt(0).toUpperCase()}
          </Avatar>
        </motion.div>
        
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography 
            variant={isMobile ? "subtitle1" : "h6"} 
            color="text.primary"
            noWrap
            sx={{ fontWeight: 600 }}
          >
            {post.author.name}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              opacity: 0.8
            }}
          >
            {post.author.role} • {formatDate(post.createdAt)}
          </Typography>
        </Box>
      </Stack>
      
      <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} />
      
      {/* Action Buttons */}
      <Stack 
        direction="row" 
        spacing={1}
        sx={{ 
          width: { xs: '100%', sm: 'auto' },
          justifyContent: { xs: 'space-between', sm: 'flex-end' }
        }}
      >
        <Tooltip title="Share post" arrow>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconButton 
              onClick={handleShare} 
              color="primary"
              size={isMobile ? "medium" : "large"}
              sx={{ 
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                color: 'white',
                '&:hover': { 
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                }
              }}
            >
              <Share fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </motion.div>
        </Tooltip>

        <Tooltip title="Bookmark post" arrow>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconButton 
              onClick={onBookmark}
              color="primary"
              size={isMobile ? "medium" : "large"}
              sx={{ 
                background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
                color: 'white',
                '&:hover': { 
                  background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                }
              }}
            >
              <BookmarkBorder fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </motion.div>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default PostMeta;