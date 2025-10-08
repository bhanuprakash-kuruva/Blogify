// components/CommentsSection.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Avatar,
  IconButton,
  CircularProgress,
  Alert,
  Divider,
  useTheme,
} from "@mui/material";
import {
  ThumbUp,
  ThumbDown,
  Delete,
  ThumbUpOutlined,
  ThumbDownOutlined,
} from "@mui/icons-material";

interface CommentsSectionProps {
  comments: any[];
  loading: boolean;
  error: string | null;
  onAddComment: (content: string) => Promise<void>;
  onLikeComment: (commentId: string, token: string) => Promise<void>;
  onDislikeComment: (commentId: string, token: string) => Promise<void>;
  onDeleteComment: (commentId: string, token: string) => Promise<void>;
  currentUser: any;
  clearError: () => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  comments,
  loading,
  error,
  onAddComment,
  onLikeComment,
  onDislikeComment,
  onDeleteComment,
  currentUser,
  clearError,
}) => {
  const theme = useTheme();
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    setCommentLoading(true);
    try {
      await onAddComment(newComment);
      setNewComment("");
    } catch (err) {
      // Error handled by parent
    } finally {
      setCommentLoading(false);
    }
  };

  const hasUserLiked = (likesArray: any[]): boolean => {
    if (!currentUser?._id) return false;
    return likesArray.some(like => 
      like && (like.toString?.() === currentUser._id || like === currentUser._id)
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Comments ({comments.length})
      </Typography>

      {/* Error Alert */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          onClose={clearError}
        >
          {error}
        </Alert>
      )}

      {/* Add Comment */}
      {currentUser && (
        <Paper sx={{ p: 3, mb: 4, bgcolor: 'background.default' }}>
          <Typography variant="h6" gutterBottom>
            Add a Comment
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Stack direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={handleAddComment}
              disabled={!newComment.trim() || commentLoading}
              startIcon={commentLoading ? <CircularProgress size={16} /> : null}
            >
              {commentLoading ? "Posting..." : "Post Comment"}
            </Button>
          </Stack>
        </Paper>
      )}

      {/* Comments List */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : comments.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary">
            No comments yet. Be the first to share your thoughts!
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={3}>
          {comments.map((comment, index) => {
            const isCommentAuthor = currentUser?._id === comment.user?._id;
            const isAdmin = currentUser?.role === 'admin';
            const isCommentLiked = hasUserLiked(comment.likes);
            const isCommentDisliked = hasUserLiked(comment.dislikes);

            return (
              <Box key={comment._id}>
                <Paper sx={{ p: 3, position: 'relative' }}>
                  <Stack direction="row" spacing={2}>
                    <Avatar 
                      sx={{ 
                        bgcolor: theme.palette.secondary.main,
                        width: 44,
                        height: 44
                      }}
                    >
                      {comment.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </Avatar>
                    
                    <Box sx={{ flexGrow: 1 }}>
                      {/* Comment Header */}
                      <Stack 
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="space-between" 
                        alignItems={{ xs: "flex-start", sm: "center" }}
                        sx={{ mb: 2 }}
                      >
                        <Box>
                          <Typography variant="subtitle1" fontWeight="600">
                            {comment.user?.name || 'Unknown User'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(comment.createdAt)}
                          </Typography>
                        </Box>
                        
                        {(isCommentAuthor || isAdmin) && (
                          <IconButton 
                            size="small" 
                            onClick={() => onDeleteComment(comment._id, currentUser.token)}
                            color="error"
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        )}
                      </Stack>

                      {/* Comment Content */}
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          mb: 2, 
                          whiteSpace: 'pre-line',
                          lineHeight: 1.6
                        }}
                      >
                        {comment.content}
                      </Typography>

                      {/* Comment Actions */}
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton
                          size="small"
                          color={isCommentLiked ? "primary" : "default"}
                          onClick={() => onLikeComment(comment._id, currentUser.token)}
                          disabled={!currentUser}
                        >
                          {isCommentLiked ? <ThumbUp fontSize="small" /> : <ThumbUpOutlined fontSize="small" />}
                        </IconButton>
                        <Typography variant="caption" color="text.secondary" sx={{ minWidth: 20 }}>
                          {comment.likes.length}
                        </Typography>

                        <IconButton
                          size="small"
                          color={isCommentDisliked ? "error" : "default"}
                          onClick={() => onDislikeComment(comment._id, currentUser.token)}
                          disabled={!currentUser}
                        >
                          {isCommentDisliked ? <ThumbDown fontSize="small" /> : <ThumbDownOutlined fontSize="small" />}
                        </IconButton>
                        <Typography variant="caption" color="text.secondary" sx={{ minWidth: 20 }}>
                          {comment.dislikes.length}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </Paper>
                
                {/* Divider between comments */}
                {index < comments.length - 1 && (
                  <Divider sx={{ my: 2 }} />
                )}
              </Box>
            );
          })}
        </Stack>
      )}
    </Box>
  );
};

export default CommentsSection;