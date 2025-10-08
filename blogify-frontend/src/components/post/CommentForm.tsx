import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Stack,
  Typography,
  Chip,
  useTheme,
} from "@mui/material";
import { Send, Cancel } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
  currentUser: any;
  isMobile: boolean;
  replyingTo: string | null;
  onCancelReply: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  currentUser,
  isMobile,
  replyingTo,
  onCancelReply,
}) => {
  const theme = useTheme();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !currentUser) return;

    setIsSubmitting(true);
    try {
      await onSubmit(content);
      setContent("");
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
          border: `2px dashed ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
          mb: 3,
        }}
      >
        {/* Reply Indicator */}
        <AnimatePresence>
          {replyingTo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Stack 
                direction="row" 
                alignItems="center" 
                spacing={1} 
                sx={{ mb: 2 }}
              >
                <Chip
                  label="Replying to comment"
                  color="primary"
                  size="small"
                  onDelete={onCancelReply}
                  deleteIcon={<Cancel />}
                />
              </Stack>
            </motion.div>
          )}
        </AnimatePresence>

        <Stack direction="row" spacing={2} alignItems="flex-start">
          {/* User Avatar */}
          <Avatar
            sx={{
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              fontSize: { xs: '1rem', sm: '1.2rem' },
              fontWeight: 'bold',
              mt: 1,
            }}
          >
            {currentUser?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>

          {/* Comment Input */}
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={currentUser ? "Share your thoughts..." : "Please login to comment"}
              disabled={!currentUser || isSubmitting}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: theme.palette.background.paper,
                  '&:hover': {
                    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                  },
                  '&.Mui-focused': {
                    background: theme.palette.background.paper,
                    boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
                  },
                },
              }}
            />

            {/* Character Counter */}
            <Typography
              variant="caption"
              color={content.length > 500 ? 'error' : 'text.secondary'}
              sx={{ mt: 1, display: 'block' }}
            >
              {content.length}/500 characters
            </Typography>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={!content.trim() || !currentUser || isSubmitting || content.length > 500}
                startIcon={<Send />}
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                  '&:hover': {
                    boxShadow: `0 6px 20px ${theme.palette.primary.main}60`,
                    transform: 'translateY(-1px)',
                  },
                  '&:disabled': {
                    background: theme.palette.grey[400],
                  },
                }}
                size={isMobile ? "small" : "medium"}
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </motion.div>
          </Box>
        </Stack>
      </Box>
    </motion.div>
  );
};

export default CommentForm;