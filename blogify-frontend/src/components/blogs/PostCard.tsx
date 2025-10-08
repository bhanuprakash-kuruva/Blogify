import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardMedia,
  Box,
  Chip,
  IconButton,
  Stack,
  Avatar,
  useTheme,
  alpha,
} from "@mui/material";
import {
  ThumbUp,
  ThumbDown,
  Edit,
  Visibility,
  CalendarToday,
  Category as CategoryIcon,
  ThumbUpOutlined,
  ThumbDownOutlined,
  Bookmark,
  BookmarkBorder,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import type { Post, User } from "./types";

interface PostCardProps {
  post: Post;
  index: number;
  isBookmarked: boolean;
  user: User | null;
  onEdit: (post: Post) => void;
  onLike: (postId: string) => void;
  onDislike: (postId: string) => void;
  onBookmark: (postId: string) => void;
}

const MotionCard = motion(Card);

const PostCard: React.FC<PostCardProps> = ({
  post,
  index,
  isBookmarked,
  user,
  onEdit,
  onLike,
  onDislike,
  onBookmark,
}) => {
  const theme = useTheme();

  const hasUserLiked = (likesArray: any[]): boolean => {
    if (!user?._id) return false;
    return likesArray.some(like => 
      like && (like.toString?.() === user._id || like === user._id)
    );
  };

  const hasUserDisliked = (dislikesArray: any[]): boolean => {
    if (!user?._id) return false;
    return dislikesArray.some(dislike => 
      dislike && (dislike.toString?.() === user._id || dislike === user._id)
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Truncate content to consistent length
  const truncateContent = (content: string, maxLength: number = 120) => {
    const cleanContent = content.replace(/[#*`]/g, '').trim();
    if (cleanContent.length <= maxLength) return cleanContent;
    return cleanContent.substring(0, maxLength) + '...';
  };

  // Truncate title
  const truncateTitle = (title: string, maxLength: number = 60) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };

  const isLiked = hasUserLiked(post.likes);
  const isDisliked = hasUserDisliked(post.dislikes);

  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      sx={{
        width: '100%',
        height: '100%',
        display: "flex",
        flexDirection: "column",
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
        },
        bgcolor: 'background.paper',
        borderRadius: 2,
        overflow: 'hidden',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      {/* Fixed Image Height */}
      {post.imageUrl && (
        <Box sx={{ 
          height: 160, // Reduced height
          overflow: 'hidden',
          flexShrink: 0
        }}>
          <CardMedia
            component="img"
            image={post.imageUrl}
            alt={post.title}
            sx={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
      )}
      
      {/* Card Content */}
      <CardContent sx={{ 
        flex: 1,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}>
        {/* Category */}
        <Box sx={{ minHeight: 32 }}>
          <Chip
            label={post.category?.name}
            size="small"
            variant="filled"
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              fontWeight: 600,
              fontSize: '0.7rem',
              height: 24,
            }}
          />
        </Box>

        {/* Title - Strict 2 lines */}
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: 600,
            lineHeight: 1.3,
            height: '2.6em', // Fixed height for exactly 2 lines
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            fontSize: '0.95rem',
          }}
        >
          {truncateTitle(post.title)}
        </Typography>

        {/* Content - Strict 3 lines */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            flex: 1,
            lineHeight: 1.4,
            height: '4.2em', // Fixed height for exactly 3 lines
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            fontSize: '0.8rem',
          }}
        >
          {truncateContent(post.content)}
        </Typography>

        {/* Tags - Limited to 2 lines */}
        {post.tags && post.tags.length > 0 && (
          <Box sx={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: 0.5,
            minHeight: 24,
            maxHeight: 48,
            overflow: 'hidden'
          }}>
            {post.tags.slice(0, 4).map((tag, index) => (
              <Chip 
                key={index} 
                label={tag} 
                size="small" 
                variant="outlined"
                sx={{ 
                  fontSize: '0.65rem',
                  height: 20,
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>

      {/* Footer - Fixed Height */}
      <Box sx={{ 
        p: 2, 
        pt: 1,
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        flexShrink: 0
      }}>
        {/* Author Info */}
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
          <Avatar 
            sx={{ 
              width: 28, 
              height: 28, 
              bgcolor: theme.palette.primary.main,
              fontSize: '0.75rem',
            }}
          >
            {post.author?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="caption" fontWeight={600} noWrap>
              {post.author?.name}
            </Typography>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <CalendarToday sx={{ fontSize: 10 }} color="action" />
              <Typography variant="caption" color="text.secondary">
                {formatDate(post.createdAt)}
              </Typography>
            </Stack>
          </Box>
        </Stack>

        {/* Actions */}
        <CardActions sx={{ px: 0, pb: 0, gap: 1 }}>
          <Button 
            size="small" 
            href={`/post/${post._id}`}
            variant="contained"
            sx={{
              borderRadius: 1.5,
              px: 1.5,
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'none',
              minWidth: 'auto',
              flex: 1,
            }}
          >
            Read More
          </Button>
          
          <Stack direction="row" spacing={0.5} alignItems="center">
            {/* Like */}
            <IconButton 
              size="small" 
              onClick={() => onLike(post._id)} 
              color={isLiked ? "primary" : "default"}
              disabled={!user}
              sx={{ padding: 0.5 }}
            >
              {isLiked ? <ThumbUp sx={{ fontSize: 16 }} /> : <ThumbUpOutlined sx={{ fontSize: 16 }} />}
            </IconButton>
            <Typography variant="caption" sx={{ minWidth: 16, textAlign: 'center' }}>
              {post.likes.length}
            </Typography>
            
            {/* Dislike */}
            <IconButton 
              size="small" 
              onClick={() => onDislike(post._id)} 
              color={isDisliked ? "error" : "default"}
              disabled={!user}
              sx={{ padding: 0.5 }}
            >
              {isDisliked ? <ThumbDown sx={{ fontSize: 16 }} /> : <ThumbDownOutlined sx={{ fontSize: 16 }} />}
            </IconButton>
            <Typography variant="caption" sx={{ minWidth: 16, textAlign: 'center' }}>
              {post.dislikes.length}
            </Typography>
          </Stack>

          {/* Bookmark */}
          {user && (
            <IconButton 
              size="small" 
              onClick={() => onBookmark(post._id)}
              color={isBookmarked ? "primary" : "default"}
              sx={{ padding: 0.5 }}
            >
              {isBookmarked ? <Bookmark sx={{ fontSize: 16 }} /> : <BookmarkBorder sx={{ fontSize: 16 }} />}
            </IconButton>
          )}
        </CardActions>
      </Box>
    </MotionCard>
  );
};

export default PostCard;