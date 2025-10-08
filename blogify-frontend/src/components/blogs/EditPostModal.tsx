import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Button,
  Grid,
  FormControlLabel,
  Switch,
  FormHelperText,
  CircularProgress,
  MenuItem,Typography
} from "@mui/material";
import { Image } from "@mui/icons-material";
import axios from "axios";
import type { Post, Category } from "./types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface EditFormErrors {
  title?: string;
  content?: string;
  category?: string;
  tags?: string;
  status?: string;
}

interface EditPostModalProps {
  open: boolean;
  post: Post;
  categories: Category[];
  token: string | undefined;
  onClose: () => void;
  onSave: (updatedPost: Post) => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  open,
  post,
  categories,
  token,
  onClose,
  onSave,
}) => {
  const [editForm, setEditForm] = useState({
    title: post.title,
    content: post.content,
    category: post.category._id,
    tags: post.tags?.join(", ") || "",
    status: post.status,
    image: null as File | null,
  });
  const [editFormErrors, setEditFormErrors] = useState<EditFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const validateEditForm = (): boolean => {
    const errors: EditFormErrors = {};
    
    if (!editForm.title.trim() || editForm.title.length < 3) {
      errors.title = "Title must be at least 3 characters";
    }
    
    if (!editForm.content.trim() || editForm.content.length < 10) {
      errors.content = "Content must be at least 10 characters";
    }
    
    if (!editForm.category) {
      errors.category = "Category is required";
    }
    
    setEditFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEditFieldChange = (field: keyof typeof editForm, value: any) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
    
    if (editFormErrors[field as keyof EditFormErrors]) {
      setEditFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSave = async () => {
    if (!token) {
      setMessage({ type: 'error', text: "You must be logged in as the author to edit posts." });
      return;
    }

    if (!validateEditForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', editForm.title);
      formData.append('content', editForm.content);
      formData.append('category', editForm.category);
      formData.append('tags', editForm.tags);
      formData.append('status', editForm.status);

      if (editForm.image) {
        formData.append('image', editForm.image);
      }

      const response = await axios.put(
        `${BASE_URL}posts/${post._id}`,
        formData,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          } 
        }
      );

      onSave(response.data);
      setMessage({ type: 'success', text: "Post updated successfully!" });
      setTimeout(onClose, 1500);
    } catch (err: any) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.message || "Failed to update post" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setEditForm({
      title: post.title,
      content: post.content,
      category: post.category._id,
      tags: post.tags?.join(", ") || "",
      status: post.status,
      image: null,
    });
    setEditFormErrors({});
    setMessage({ type: '', text: '' });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="div" fontWeight="bold">
          Edit Post
        </Typography>
      </DialogTitle>
      <DialogContent>
        {message.text && (
          <Alert 
            severity={message.type as any} 
            sx={{ mb: 2 }}
            onClose={() => setMessage({ type: '', text: '' })}
          >
            {message.text}
          </Alert>
        )}
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              fullWidth
              value={editForm.title}
              onChange={(e) => handleEditFieldChange('title', e.target.value)}
              error={!!editFormErrors.title}
              helperText={editFormErrors.title || "Minimum 3 characters required"}
              placeholder="Enter post title"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Content"
              fullWidth
              multiline
              rows={6}
              value={editForm.content}
              onChange={(e) => handleEditFieldChange('content', e.target.value)}
              error={!!editFormErrors.content}
              helperText={editFormErrors.content || "Minimum 10 characters required"}
              placeholder="Write your post content here..."
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Category"
              fullWidth
              value={editForm.category}
              onChange={(e) => handleEditFieldChange('category', e.target.value)}
              error={!!editFormErrors.category}
              helperText={editFormErrors.category}
            >
              <MenuItem value="">
                <em>Select a category</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Tags (comma separated)"
              fullWidth
              value={editForm.tags}
              onChange={(e) => handleEditFieldChange('tags', e.target.value)}
              error={!!editFormErrors.tags}
              helperText={editFormErrors.tags || "Separate tags with commas"}
              placeholder="technology, programming, web"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={editForm.status === 'published'}
                  onChange={(e) => handleEditFieldChange('status', e.target.checked ? 'published' : 'draft')}
                />
              }
              label="Published"
            />
            <FormHelperText>
              {editForm.status === 'published' ? 'Post will be visible to everyone' : 'Post will be saved as draft'}
            </FormHelperText>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<Image />}
              fullWidth
            >
              Upload New Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleEditFieldChange('image', e.target.files?.[0] || null)}
              />
            </Button>
            {editForm.image && (
              <Typography variant="body2" sx={{ mt: 1, color: 'success.main' }}>
                ✓ Selected: {editForm.image.name}
              </Typography>
            )}
            {post.imageUrl && !editForm.image && (
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                Current image will be kept
              </Typography>
            )}
            <FormHelperText>
              Optional: Upload a new featured image
            </FormHelperText>
          </Grid>

          {Object.keys(editFormErrors).length > 0 && (
            <Grid item xs={12}>
              <Alert severity="error" sx={{ mt: 1 }}>
                Please fix the errors above before saving.
              </Alert>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={handleClose}
          disabled={isSubmitting}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSave}
          disabled={isSubmitting || Object.keys(editFormErrors).length > 0}
          startIcon={isSubmitting ? <CircularProgress size={16} /> : null}
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostModal;