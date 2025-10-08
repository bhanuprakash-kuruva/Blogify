import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import { Edit, Close } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import type { Post } from "../../types";

interface EditPostModalProps {
  open: boolean;
  post: Post | null;
  onClose: () => void;
  onSave: (title: string, content: string) => Promise<void>;
  isMobile: boolean;
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  open,
  post,
  onClose,
  onSave,
  isMobile,
}) => {
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ title: "", content: "" });

  useEffect(() => {
    if (post && open) {
      setTitle(post.title);
      setContent(post.content);
      setErrors({ title: "", content: "" });
    }
  }, [post, open]);

  const validateForm = () => {
    const newErrors = { title: "", content: "" };
    
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }
    
    if (!content.trim()) {
      newErrors.content = "Content is required";
    } else if (content.trim().length < 10) {
      newErrors.content = "Content must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return !newErrors.title && !newErrors.content;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await onSave(title, content);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  const characterCount = content.length;
  const isOverLimit = characterCount > 5000;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
          boxShadow: `0 20px 60px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)'}`,
          overflow: 'hidden',
          height: isMobile ? '100vh' : 'auto',
          maxHeight: isMobile ? '100vh' : '90vh',
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Header - Fixed */}
        <DialogTitle
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: 'white',
            py: 3,
            flexShrink: 0,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Edit sx={{ fontSize: 28 }} />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Edit Post
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Update your post content and title
              </Typography>
            </Box>
          </Stack>
        </DialogTitle>

        {/* Content - Scrollable */}
        <DialogContent 
          sx={{ 
            p: 0,
            flex: 1,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack 
            spacing={3} 
            sx={{ 
              p: 4,
              flex: 1,
              minHeight: 0,
            }}
          >
            {/* Title Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{ flexShrink: 0 }}
            >
              <TextField
                label="Post Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!errors.title}
                helperText={errors.title || "Give your post a compelling title"}
                variant="outlined"
                size={isMobile ? "small" : "medium"}
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
            </motion.div>

            {/* Content Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              style={{ 
                flex: 1,
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <TextField
                label="Post Content"
                fullWidth
                multiline
                rows={isMobile ? 12 : 16}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                error={!!errors.content || isOverLimit}
                helperText={
                  errors.content || 
                  (isOverLimit 
                    ? "Content is too long (max 5000 characters)" 
                    : `${characterCount}/5000 characters`)
                }
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    background: theme.palette.background.paper,
                    height: '100%',
                    alignItems: 'flex-start',
                    '&:hover': {
                      background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                    },
                    '&.Mui-focused': {
                      background: theme.palette.background.paper,
                      boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
                    },
                    '& textarea': {
                      overflow: 'auto !important',
                    }
                  },
                }}
              />
            </motion.div>

            {/* Preview Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              style={{ flexShrink: 0 }}
            >
              <Stack 
                direction="row" 
                spacing={3} 
                sx={{ 
                  p: 2, 
                  borderRadius: 2,
                  background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                }}
              >
                <Box textAlign="center">
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    {title.split(/\s+/).length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Words
                  </Typography>
                </Box>
                <Box textAlign="center">
                  <Typography 
                    variant="h6" 
                    fontWeight="bold"
                    color={isOverLimit ? 'error' : 'primary'}
                  >
                    {characterCount}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Characters
                  </Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    {Math.ceil(content.split(/\s+/).length / 200)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Min Read
                  </Typography>
                </Box>
              </Stack>
            </motion.div>
          </Stack>
        </DialogContent>

        {/* Actions - Fixed at bottom */}
        <DialogActions 
          sx={{ 
            p: 3, 
            gap: 2,
            flexShrink: 0,
            borderTop: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
          }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={handleClose}
              disabled={isSubmitting}
              startIcon={<Close />}
              variant="outlined"
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
              }}
              size={isMobile ? "small" : "medium"}
            >
              Cancel
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="contained" 
              onClick={handleSave}
              disabled={isSubmitting || !title.trim() || !content.trim() || isOverLimit}
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <Edit />
                )
              }
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 4,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                '&:hover': {
                  boxShadow: `0 6px 20px ${theme.palette.primary.main}60`,
                },
                '&:disabled': {
                  background: theme.palette.grey[400],
                  boxShadow: 'none',
                }
              }}
              size={isMobile ? "small" : "medium"}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </motion.div>
        </DialogActions>
      </motion.div>
    </Dialog>
  );
};

export default EditPostModal;