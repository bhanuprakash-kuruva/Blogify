import React from "react";
import { Card, Stack, Box, useTheme,Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ActionButtons from "./ActionButtons";
import type { Post } from "../../types";
import type { User } from "../blogs/types";
interface PostActionsProps {
  post: Post;
  isAuthor: boolean;
  onLike: () => void;
  onDislike: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onBookmark: () => void;
  isBookmarked: boolean;
  bookmarkLoading: boolean;
  isMobile: boolean;
  user: User | null;
}

const PostActions: React.FC<PostActionsProps> = ({
  post,
  isAuthor,
  onLike,
  onDislike,
  onEdit,
  onDelete,
  onBookmark,
  isBookmarked,
  bookmarkLoading,
  isMobile,
  user,
}) => {
  const theme = useTheme();

  const hasUserLiked = (likesArray: any[]): boolean => {
    if (!user?._id) return false;
    return likesArray.some(like => 
      like && (like.toString?.() === user._id || like === user._id)
    );
  };

  const isUserLiked = hasUserLiked(post.likes);
  const isUserDisliked = hasUserLiked(post.dislikes);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card
          sx={{
            mb: { xs: 3, sm: 4 },
            p: { xs: 2, sm: 3 },
            borderRadius: { xs: 2, sm: 3 },
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
            boxShadow: `0 4px 20px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}`,
            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`,
          }}
        >
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={2} 
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Like/Dislike Stats */}
            <Stack direction="row" spacing={3} alignItems="center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      color: 'white',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      minWidth: 80,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {post.likes.length}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      Likes
                    </Typography>
                  </Box>
                </Stack>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
                      color: 'white',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      minWidth: 80,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {post?.dislikes.length}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      Dislikes
                    </Typography>
                  </Box>
                </Stack>
              </motion.div>
            </Stack>

            {/* Action Buttons */}
            <ActionButtons
              post={post}
              isAuthor={isAuthor}
              isUserLiked={isUserLiked}
              isUserDisliked={isUserDisliked}
              isBookmarked={isBookmarked}
              bookmarkLoading={bookmarkLoading}
              onLike={onLike}
              onDislike={onDislike}
              onEdit={onEdit}
              onDelete={onDelete}
              onBookmark={onBookmark}
              isMobile={isMobile}
              user={user}
            />
          </Stack>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default PostActions;