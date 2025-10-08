// components/PostActions.tsx
import React from 'react';
import {
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  ThumbUp,
  ThumbDown,
  Edit,
  Delete,
  ThumbUpOutlined,
  ThumbDownOutlined,
  Bookmark,
  BookmarkBorder,
} from "@mui/icons-material";

interface PostActionsProps {
  post: any;
  isAuthor: boolean;
  isUserLiked: boolean;
  isUserDisliked: boolean;
  isBookmarked: boolean;
  bookmarkLoading: boolean;
  onLike: () => void;
  onDislike: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onBookmark: () => void;
  isMobile?: boolean;
}

const PostActions: React.FC<PostActionsProps> = ({
  post,
  isAuthor,
  isUserLiked,
  isUserDisliked,
  isBookmarked,
  bookmarkLoading,
  onLike,
  onDislike,
  onEdit,
  onDelete,
  onBookmark,
  isMobile = false,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 4 }}>
      <Stack 
        direction={{ xs: "column", sm: "row" }} 
        spacing={2} 
        alignItems={{ xs: "stretch", sm: "center" }}
        sx={{ 
          p: 3, 
          bgcolor: 'background.default', 
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`
        }}
      >
        {/* Like/Dislike Buttons */}
        <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
          <Button
            variant={isUserLiked ? "contained" : "outlined"}
            color="primary"
            startIcon={isUserLiked ? <ThumbUp /> : <ThumbUpOutlined />}
            onClick={onLike}
            size="large"
            sx={{ flex: 1 }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <ThumbUp fontSize="small" />
              <Typography variant="body2">
                {post.likes.length}
              </Typography>
            </Stack>
          </Button>
          
          <Button
            variant={isUserDisliked ? "contained" : "outlined"}
            color="error"
            startIcon={isUserDisliked ? <ThumbDown /> : <ThumbDownOutlined />}
            onClick={onDislike}
            size="large"
            sx={{ flex: 1 }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <ThumbDown fontSize="small" />
              <Typography variant="body2">
                {post.dislikes.length}
              </Typography>
            </Stack>
          </Button>

          {/* Bookmark Button */}
          <Button
            variant={isBookmarked ? "contained" : "outlined"}
            color="secondary"
            startIcon={
              bookmarkLoading ? (
                <CircularProgress size={16} />
              ) : isBookmarked ? (
                <Bookmark />
              ) : (
                <BookmarkBorder />
              )
            }
            onClick={onBookmark}
            size="large"
            sx={{ flex: 1 }}
            disabled={bookmarkLoading}
          >
            {bookmarkLoading ? '...' : isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </Button>
        </Stack>

        {/* Author Actions */}
        {isAuthor && (
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Edit />}
              onClick={onEdit}
              size="large"
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<Delete />}
              onClick={onDelete}
              size="large"
            >
              Delete
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default PostActions;