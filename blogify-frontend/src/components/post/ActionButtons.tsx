import React from "react";
import { Stack, IconButton, Button, Tooltip, useTheme } from "@mui/material";
import {
  ThumbUp,
  ThumbDown,
  Edit,
  Delete,
  ThumbUpOutlined,
  ThumbDownOutlined,
  BookmarkBorder,
  Bookmark,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import type { Post } from "../../types";
import type { User } from "../blogs/types";
interface ActionButtonsProps {
  post: Post;
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
  isMobile: boolean;
  user: User | null;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
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
  isMobile,
  user,
}) => {
  const theme = useTheme();

  const buttonVariants = {
    hover: { scale: 1.1, y: -2 },
    tap: { scale: 0.95 },
    initial: { scale: 1, y: 0 }
  };

  return (
    <Stack 
      direction="row" 
      spacing={1} 
      alignItems="center"
      sx={{ flexWrap: 'wrap', gap: 1 }}
    >
      {/* Like Button */}
      <Tooltip title={user ? "Like post" : "Login to like"} arrow>
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          initial="initial"
        >
          <IconButton
            onClick={onLike}
            disabled={!user}
            sx={{
              background: isUserLiked 
                ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
                : `linear-gradient(135deg, ${theme.palette.grey[100]} 0%, ${theme.palette.grey[200]} 100%)`,
              color: isUserLiked ? 'white' : theme.palette.text.secondary,
              '&:hover': {
                background: isUserLiked 
                  ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
                  : `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, ${theme.palette.primary.main}20 100%)`,
                color: isUserLiked ? 'white' : theme.palette.primary.main,
              },
              transition: 'all 0.3s ease',
              boxShadow: `0 4px 12px ${isUserLiked ? theme.palette.primary.main + '40' : 'rgba(0,0,0,0.1)'}`,
            }}
            size={isMobile ? "medium" : "large"}
          >
            {isUserLiked ? <ThumbUp /> : <ThumbUpOutlined />}
          </IconButton>
        </motion.div>
      </Tooltip>

      {/* Dislike Button */}
      <Tooltip title={user ? "Dislike post" : "Login to dislike"} arrow>
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          initial="initial"
        >
          <IconButton
            onClick={onDislike}
            disabled={!user}
            sx={{
              background: isUserDisliked 
                ? `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`
                : `linear-gradient(135deg, ${theme.palette.grey[100]} 0%, ${theme.palette.grey[200]} 100%)`,
              color: isUserDisliked ? 'white' : theme.palette.text.secondary,
              '&:hover': {
                background: isUserDisliked 
                  ? `linear-gradient(135deg, ${theme.palette.error.dark} 0%, ${theme.palette.error.main} 100%)`
                  : `linear-gradient(135deg, ${theme.palette.error.light}20 0%, ${theme.palette.error.main}20 100%)`,
                color: isUserDisliked ? 'white' : theme.palette.error.main,
              },
              transition: 'all 0.3s ease',
              boxShadow: `0 4px 12px ${isUserDisliked ? theme.palette.error.main + '40' : 'rgba(0,0,0,0.1)'}`,
            }}
            size={isMobile ? "medium" : "large"}
          >
            {isUserDisliked ? <ThumbDown /> : <ThumbDownOutlined />}
          </IconButton>
        </motion.div>
      </Tooltip>

      {/* Bookmark Button */}
      <Tooltip title={user ? (isBookmarked ? "Remove bookmark" : "Add to bookmarks") : "Login to bookmark"} arrow>
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          initial="initial"
        >
          <IconButton
            onClick={onBookmark}
            disabled={!user || bookmarkLoading}
            sx={{
              background: isBookmarked 
                ? `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`
                : `linear-gradient(135deg, ${theme.palette.grey[100]} 0%, ${theme.palette.grey[200]} 100%)`,
              color: isBookmarked ? 'white' : theme.palette.text.secondary,
              '&:hover': {
                background: isBookmarked 
                  ? `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`
                  : `linear-gradient(135deg, ${theme.palette.secondary.light}20 0%, ${theme.palette.secondary.main}20 100%)`,
                color: isBookmarked ? 'white' : theme.palette.secondary.main,
              },
              transition: 'all 0.3s ease',
              boxShadow: `0 4px 12px ${isBookmarked ? theme.palette.secondary.main + '40' : 'rgba(0,0,0,0.1)'}`,
            }}
            size={isMobile ? "medium" : "large"}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isBookmarked ? 'bookmarked' : 'not-bookmarked'}
                initial={{ scale: 0.8, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.8, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
              </motion.div>
            </AnimatePresence>
          </IconButton>
        </motion.div>
      </Tooltip>

      {/* Author Actions */}
      <AnimatePresence>
        {isAuthor && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Stack direction="row" spacing={1}>
              {/* Edit Button */}
              <Tooltip title="Edit post" arrow>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial="initial"
                >
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={onEdit}
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      borderWidth: 2,
                      borderColor: theme.palette.info.main,
                      color: theme.palette.info.main,
                      '&:hover': {
                        borderWidth: 2,
                        background: theme.palette.info.main,
                        color: 'white',
                        boxShadow: `0 4px 12px ${theme.palette.info.main}40`,
                      }
                    }}
                  >
                    Edit
                  </Button>
                </motion.div>
              </Tooltip>

              {/* Delete Button */}
              <Tooltip title="Delete post" arrow>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial="initial"
                >
                  <Button
                    variant="outlined"
                    startIcon={<Delete />}
                    onClick={onDelete}
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      borderWidth: 2,
                      borderColor: theme.palette.error.main,
                      color: theme.palette.error.main,
                      '&:hover': {
                        borderWidth: 2,
                        background: theme.palette.error.main,
                        color: 'white',
                        boxShadow: `0 4px 12px ${theme.palette.error.main}40`,
                      }
                    }}
                  >
                    Delete
                  </Button>
                </motion.div>
              </Tooltip>
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
    </Stack>
  );
};

export default ActionButtons;