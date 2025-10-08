import React from "react";
import {
  Card,
  CardContent,
  Stack,
  Avatar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Chip,
  useTheme,
  CircularProgress,
} from "@mui/material";
import {
  ThumbUp,
  ThumbDown,
  Reply,
  Delete,
  ThumbUpOutlined,
  ThumbDownOutlined,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import type { Comment as CommentType, User } from "../blogs/types/index";

interface CommentCardProps {
  comment: CommentType;
  onLike: () => void;
  onDislike: () => void;
  onDelete: () => void;
  onReply: () => void;
  currentUser: User | null;
  isMobile: boolean;
  isAuthor: boolean;
  hasUserLiked: boolean;
  hasUserDisliked: boolean;
  isLoading?: boolean;
  authorName: string;
}

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  onLike,
  onDislike,
  onDelete,
  onReply,
  currentUser,
  isMobile,
  isAuthor,
  hasUserLiked,
  hasUserDisliked,
  isLoading = false,
  authorName,
}) => {
  const theme = useTheme();

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
    initial: { scale: 1 }
  };

  const getInitials = (name: string): string => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        sx={{
          mb: 2,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
          '&:hover': {
            boxShadow: `0 4px 16px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            {/* User Avatar */}
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Avatar
                sx={{
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  fontSize: { xs: '1rem', sm: '1.2rem' },
                  fontWeight: 'bold',
                }}
              >
                {getInitials(authorName)}
              </Avatar>
            </motion.div>

            {/* Comment Content */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {/* Header */}
              <Stack 
                direction={{ xs: "column", sm: "row" }} 
                spacing={1} 
                alignItems={{ xs: "flex-start", sm: "center" }}
                sx={{ mb: 1 }}
              >
                <Typography variant="subtitle1" fontWeight="600" noWrap>
                  {authorName}
                </Typography>
                
                {isAuthor && (
                  <Chip
                    label="Author"
                    size="small"
                    color="primary"
                    sx={{ 
                      height: 20, 
                      fontSize: '0.6rem',
                      fontWeight: 'bold' 
                    }}
                  />
                )}
                
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: '0.75rem',
                    opacity: 0.7
                  }}
                >
                  {formatDate(comment.createdAt)}
                </Typography>
              </Stack>

              {/* Comment Text */}
              <Typography
                variant="body2"
                sx={{
                  lineHeight: 1.6,
                  mb: 2,
                  whiteSpace: 'pre-line',
                  wordBreak: 'break-word',
                }}
              >
                {comment.content}
              </Typography>

              {/* Actions */}
              <Stack direction="row" spacing={1} alignItems="center">
                {/* Like Button */}
                <Tooltip title={currentUser ? "Like comment" : "Login to like"} arrow>
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    initial="initial"
                  >
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <IconButton
                        size="small"
                        onClick={onLike}
                        disabled={!currentUser || isLoading}
                        sx={{
                          color: hasUserLiked ? theme.palette.primary.main : 'inherit',
                          '&:hover': {
                            color: theme.palette.primary.main,
                            background: `${theme.palette.primary.main}15`,
                          },
                        }}
                      >
                        {isLoading ? (
                          <CircularProgress size={16} />
                        ) : hasUserLiked ? (
                          <ThumbUp />
                        ) : (
                          <ThumbUpOutlined />
                        )}
                      </IconButton>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          minWidth: 20, 
                          textAlign: 'center',
                          fontWeight: hasUserLiked ? 600 : 400
                        }}
                      >
                        {comment.likes?.length || 0}
                      </Typography>
                    </Stack>
                  </motion.div>
                </Tooltip>

                {/* Dislike Button */}
                <Tooltip title={currentUser ? "Dislike comment" : "Login to dislike"} arrow>
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    initial="initial"
                  >
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <IconButton
                        size="small"
                        onClick={onDislike}
                        disabled={!currentUser || isLoading}
                        sx={{
                          color: hasUserDisliked ? theme.palette.error.main : 'inherit',
                          '&:hover': {
                            color: theme.palette.error.main,
                            background: `${theme.palette.error.main}15`,
                          },
                        }}
                      >
                        {isLoading ? (
                          <CircularProgress size={16} />
                        ) : hasUserDisliked ? (
                          <ThumbDown />
                        ) : (
                          <ThumbDownOutlined />
                        )}
                      </IconButton>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          minWidth: 20, 
                          textAlign: 'center',
                          fontWeight: hasUserDisliked ? 600 : 400
                        }}
                      >
                        {comment.dislikes?.length || 0}
                      </Typography>
                    </Stack>
                  </motion.div>
                </Tooltip>

                {/* Reply Button */}
                <Tooltip title="Reply to comment" arrow>
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    initial="initial"
                  >
                    <IconButton
                      size="small"
                      onClick={onReply}
                      disabled={!currentUser || isLoading}
                      sx={{
                        color: theme.palette.info.main,
                        '&:hover': {
                          background: `${theme.palette.info.main}15`,
                        },
                      }}
                    >
                      <Reply />
                    </IconButton>
                  </motion.div>
                </Tooltip>

                {/* Delete Button (Author only) */}
                {isAuthor && (
                  <Tooltip title="Delete comment" arrow>
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      initial="initial"
                    >
                      <IconButton
                        size="small"
                        onClick={onDelete}
                        disabled={isLoading}
                        sx={{
                          color: theme.palette.error.main,
                          '&:hover': {
                            background: `${theme.palette.error.main}15`,
                          },
                        }}
                      >
                        {isLoading ? <CircularProgress size={16} /> : <Delete />}
                      </IconButton>
                    </motion.div>
                  </Tooltip>
                )}
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CommentCard;