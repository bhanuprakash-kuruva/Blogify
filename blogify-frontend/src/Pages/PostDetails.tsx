// PostDetails.tsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Avatar,
  IconButton,
  Paper,
  useTheme,
  Grid,
  Fab,
  Snackbar,
  Divider,
  useMediaQuery,
  Breadcrumbs,
  Link,
  Fade,
  Zoom,
} from "@mui/material";
import {
  ThumbUp,
  ThumbDown,
  Edit,
  Delete,
  ThumbUpOutlined,
  ThumbDownOutlined,
  Share,
  BookmarkBorder,
  Bookmark,
  ArrowBack,
  Home,
  Article,
} from "@mui/icons-material";
import { AuthContext } from "../Context/AuthContext";
import { usePost } from "../hooks/usePost";
import { useComments } from "../hooks/useComments";
import CommentsSection from "../components/CommentsSection";
import PostActions from "../components/PostActions";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useContext(AuthContext);
  const token = user?.token;
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  // Post hooks
  const { 
    post, 
    loading, 
    error, 
    fetchPost, 
    likePost, 
    dislikePost, 
    deletePost, 
    updatePost 
  } = usePost();

  // Comments hooks
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
    fetchComments,
    createComment,
    likeComment,
    dislikeComment,
    removeComment,
    clearError: clearCommentsError,
  } = useComments();

  // Local states
  const [editOpen, setEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Helper functions
  const hasUserLiked = (likesArray: any[]): boolean => {
    if (!user?._id) return false;
    return likesArray.some(like => 
      like && (like.toString?.() === user._id || like === user._id)
    );
  };

  const showSnackbar = (message: string, severity: "success" | "error" = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // Effects
  useEffect(() => {
    if (id) {
      fetchPost(id, token);
      fetchComments(id);
      checkBookmarkStatus();
    }
  }, [id, token]);

  useEffect(() => {
    if (error) {
      showSnackbar(error, "error");
    }
  }, [error]);

  // Check bookmark status
  const checkBookmarkStatus = async () => {
    if (!token || !id) return;
    
    try {
      const response = await axios.get(
        `${BASE_URL}posts/bookmarks/check/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsBookmarked(response.data.bookmarked);
    } catch (err) {
      console.error("Error checking bookmark status:", err);
    }
  };

  // Bookmark a post
  const handleBookmark = async () => {
    if (!token || !post) {
      showSnackbar("Please login to bookmark posts", "error");
      return;
    }

    setBookmarkLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}posts/bookmark/${post._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state based on response
      setIsBookmarked(response.data.bookmarked);
      showSnackbar(
        response.data.bookmarked 
          ? "Post bookmarked successfully! 📚" 
          : "Bookmark removed"
      );

    } catch (err: any) {
      console.error("Error bookmarking post:", err);
      showSnackbar(err.response?.data?.message || "Failed to bookmark post", "error");
    } finally {
      setBookmarkLoading(false);
    }
  };

  // Post handlers
  const handleLike = async () => {
    if (!token || !post) return;
    try {
      await likePost(post._id, token);
    } catch (err) {
      showSnackbar("Failed to like post", "error");
    }
  };

  const handleDislike = async () => {
    if (!token || !post) return;
    try {
      await dislikePost(post._id, token);
    } catch (err) {
      showSnackbar("Failed to dislike post", "error");
    }
  };

  const handleDelete = async () => {
    if (!token || !post) return;
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    
    try {
      await deletePost(post._id, token);
      showSnackbar("Post deleted successfully");
      navigate("/blogs");
    } catch (err) {
      showSnackbar("Failed to delete post", "error");
    }
  };

  const handleEditOpen = () => {
    if (!post) return;
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditOpen(true);
  };

  const handleEditSave = async () => {
    if (!token || !post) return;
    setEditLoading(true);
    try {
      await updatePost(post._id, { title: editTitle, content: editContent }, token);
      setEditOpen(false);
      showSnackbar("Post updated successfully");
    } catch (err) {
      showSnackbar("Failed to update post", "error");
    } finally {
      setEditLoading(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: post?.title,
      text: post?.content.substring(0, 100) + '...',
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showSnackbar("📋 Link copied to clipboard!");
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Loading and error states
  if (loading) {
    return (
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "80vh",
        px: 2 
      }}>
        <Stack alignItems="center" spacing={3}>
          <CircularProgress size={isMobile ? 40 : 60} />
          <Typography 
            variant={isMobile ? "body1" : "h6"} 
            color="text.secondary"
            textAlign="center"
          >
            Loading post...
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (!post || error) {
    return (
      <Container sx={{ 
        mt: 8, 
        textAlign: "center",
        px: { xs: 2, sm: 3 } 
      }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          color="error" 
          gutterBottom
        >
          {error || "Post not found"}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate("/blogs")}
          startIcon={<ArrowBack />}
          sx={{ mt: 2 }}
          size={isMobile ? "medium" : "large"}
        >
          Back to Blogs
        </Button>
      </Container>
    );
  }

  const isAuthor = user?._id === post.author._id;
  const isUserLiked = hasUserLiked(post.likes);
  const isUserDisliked = hasUserLiked(post.dislikes);

  return (
    <>
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3, md: 4 } 
        }}
      >
        {/* Breadcrumb Navigation */}
        <Breadcrumbs 
          aria-label="breadcrumb" 
          sx={{ mb: { xs: 2, sm: 3 } }}
        >
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate("/")}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <Home sx={{ mr: 0.5 }} fontSize="small" />
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate("/blogs")}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <Article sx={{ mr: 0.5 }} fontSize="small" />
            Blogs
          </Link>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile ? 'Post' : post.title}
          </Typography>
        </Breadcrumbs>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            <Fade in={!loading} timeout={800}>
              <Box>
                {/* Post Header */}
                <Card sx={{ 
                  mb: { xs: 3, sm: 4 }, 
                  borderRadius: { xs: 2, sm: 3 },
                  overflow: 'hidden',
                  boxShadow: theme.shadows[2],
                  '&:hover': {
                    boxShadow: theme.shadows[6],
                    transition: 'box-shadow 0.3s ease-in-out'
                  }
                }}>
                  {post.imageUrl && (
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        height={isMobile ? 200 : isTablet ? 300 : 400}
                        image={post.imageUrl}
                        alt={post.title}
                        sx={{ 
                          objectFit: "cover",
                          transition: 'transform 0.3s ease-in-out',
                          filter: imageLoaded ? 'none' : 'blur(10px)',
                          '&:hover': {
                            transform: 'scale(1.02)'
                          }
                        }}
                        onLoad={handleImageLoad}
                      />
                      {!imageLoaded && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'grey.100'
                          }}
                        >
                          <CircularProgress size={40} />
                        </Box>
                      )}
                    </Box>
                  )}
                  
                  <CardContent sx={{ 
                    p: { xs: 2, sm: 3, md: 4 } 
                  }}>
                    {/* Category and Status */}
                    <Stack 
                      direction="row" 
                      spacing={1} 
                      alignItems="center" 
                      sx={{ mb: 2 }}
                      flexWrap="wrap"
                      gap={1}
                    >
                      {post.category && (
                        <Chip 
                          label={post.category.name} 
                          color="primary" 
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                        />
                      )}
                      {post.status === 'draft' && (
                        <Chip 
                          label="Draft" 
                          color="warning" 
                          size={isMobile ? "small" : "medium"}
                        />
                      )}
                    </Stack>

                    {/* Title */}
                    <Typography 
                      variant={isMobile ? "h4" : "h3"} 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 700,
                        fontSize: { 
                          xs: '1.75rem', 
                          sm: '2.125rem', 
                          md: '2.5rem' 
                        },
                        lineHeight: 1.2,
                        wordBreak: 'break-word'
                      }}
                    >
                      {post.title}
                    </Typography>

                    {/* Author Info */}
                    <Stack 
                      direction={{ xs: "column", sm: "row" }} 
                      spacing={2} 
                      alignItems={{ xs: "flex-start", sm: "center" }}
                      sx={{ mb: 3 }}
                    >
                      <Stack 
                        direction="row" 
                        spacing={2} 
                        alignItems="center"
                        sx={{ width: { xs: '100%', sm: 'auto' } }}
                      >
                        <Avatar 
                          sx={{ 
                            width: { xs: 40, sm: 48 }, 
                            height: { xs: 40, sm: 48 }, 
                            bgcolor: theme.palette.primary.main,
                            fontSize: { xs: '1rem', sm: '1.2rem' }
                          }}
                        >
                          {post.author.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography 
                            variant={isMobile ? "subtitle1" : "h6"} 
                            color="text.primary"
                            noWrap
                          >
                            {post.author.name}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ 
                              fontSize: { xs: '0.75rem', sm: '0.875rem' }
                            }}
                          >
                            {post.author.role} • {formatDate(post.createdAt)}
                          </Typography>
                        </Box>
                      </Stack>
                      
                      <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} />
                      
                      <Stack 
                        direction="row" 
                        spacing={1}
                        sx={{ 
                          width: { xs: '100%', sm: 'auto' },
                          justifyContent: { xs: 'space-between', sm: 'flex-end' }
                        }}
                      >
                        <IconButton 
                          onClick={handleShare} 
                          color="primary"
                          size={isMobile ? "medium" : "large"}
                          sx={{ 
                            bgcolor: 'action.hover',
                            '&:hover': { bgcolor: 'primary.light', color: 'white' }
                          }}
                        >
                          <Share fontSize={isMobile ? "small" : "medium"} />
                        </IconButton>
                        <IconButton 
                          onClick={handleBookmark}
                          disabled={bookmarkLoading}
                          color={isBookmarked ? "primary" : "default"}
                          size={isMobile ? "medium" : "large"}
                          sx={{ 
                            bgcolor: 'action.hover',
                            '&:hover': { bgcolor: 'primary.light', color: 'white' }
                          }}
                          title={isBookmarked ? "Remove bookmark" : "Add to bookmarks"}
                        >
                          {bookmarkLoading ? (
                            <CircularProgress size={20} />
                          ) : isBookmarked ? (
                            <Bookmark fontSize={isMobile ? "small" : "medium"} />
                          ) : (
                            <BookmarkBorder fontSize={isMobile ? "small" : "medium"} />
                          )}
                        </IconButton>
                      </Stack>
                    </Stack>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <Box sx={{ mb: 4 }}>
                        <Typography 
                          variant="subtitle2" 
                          color="text.secondary" 
                          gutterBottom
                          sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                        >
                          Tags:
                        </Typography>
                        <Stack 
                          direction="row" 
                          flexWrap="wrap" 
                          gap={1}
                          sx={{ maxHeight: { xs: 60, sm: 'none' }, overflow: 'hidden' }}
                        >
                          {post.tags.map((tag, index) => (
                            <Chip 
                              key={index}
                              label={tag} 
                              size={isMobile ? "small" : "medium"}
                              variant="outlined"
                              sx={{ 
                                fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                                maxWidth: { xs: 120, sm: 'none' }
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>
                    )}

                    <Divider sx={{ my: 3 }} />

                    {/* Content */}
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        whiteSpace: "pre-line",
                        lineHeight: 1.8,
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                        color: 'text.primary',
                        '& p': { mb: 2 },
                        textAlign: 'justify'
                      }}
                    >
                      {post.content}
                    </Typography>
                  </CardContent>
                </Card>

                {/* Post Actions */}
                <PostActions
                  post={post}
                  isAuthor={isAuthor}
                  isUserLiked={isUserLiked}
                  isUserDisliked={isUserDisliked}
                  onLike={handleLike}
                  onDislike={handleDislike}
                  onEdit={handleEditOpen}
                  onDelete={handleDelete}
                  onBookmark={handleBookmark}
                  isBookmarked={isBookmarked}
                  bookmarkLoading={bookmarkLoading}
                  isMobile={isMobile}
                />

                {/* Comments Section */}
                <CommentsSection
                  comments={comments}
                  loading={commentsLoading}
                  error={commentsError}
                  onAddComment={(content) => createComment(post._id, content, token!, user)}
                  onLikeComment={likeComment}
                  onDislikeComment={dislikeComment}
                  onDeleteComment={removeComment}
                  currentUser={user}
                  clearError={clearCommentsError}
                  isMobile={isMobile}
                />
              </Box>
            </Fade>
          </Grid>

          {/* Sidebar - Hidden on mobile, shown on tablet and desktop */}
          {!isMobile && (
            <Grid item xs={12} lg={4}>
              <Fade in={!loading} timeout={1000}>
                <Stack spacing={3}>
                  {/* Author Card */}
                  <Card sx={{ 
                    p: { xs: 2, sm: 3 }, 
                    borderRadius: { xs: 2, sm: 3 },
                    position: 'sticky',
                    top: 100
                  }}>
                    <Stack alignItems="center" spacing={2}>
                      <Avatar 
                        sx={{ 
                          width: { xs: 60, md: 80 }, 
                          height: { xs: 60, md: 80 }, 
                          bgcolor: theme.palette.primary.main,
                          fontSize: { xs: '1.5rem', md: '2rem' }
                        }}
                      >
                        {post.author.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box textAlign="center">
                        <Typography 
                          variant={isTablet ? "h6" : "h5"} 
                          gutterBottom
                          sx={{ fontWeight: 600 }}
                        >
                          {post.author.name}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          gutterBottom
                          sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                        >
                          {post.author.role}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            fontSize: { xs: '0.7rem', md: '0.8rem' },
                            wordBreak: 'break-word'
                          }}
                        >
                          {post.author.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>

                  {/* Stats Card */}
                  <Card sx={{ 
                    p: { xs: 2, sm: 3 }, 
                    borderRadius: { xs: 2, sm: 3 },
                    position: 'sticky',
                    top: 300
                  }}>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                      sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
                    >
                      Post Stats
                    </Typography>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                        >
                          Likes
                        </Typography>
                        <Typography 
                          variant="body2" 
                          fontWeight="bold"
                          sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                        >
                          {post.likes.length}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                        >
                          Dislikes
                        </Typography>
                        <Typography 
                          variant="body2" 
                          fontWeight="bold"
                          sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                        >
                          {post.dislikes.length}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                        >
                          Comments
                        </Typography>
                        <Typography 
                          variant="body2" 
                          fontWeight="bold"
                          sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                        >
                          {comments.length}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                        >
                          Bookmarked
                        </Typography>
                        <Typography 
                          variant="body2" 
                          fontWeight="bold"
                          sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                        >
                          {isBookmarked ? 'Yes' : 'No'}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                        >
                          Published
                        </Typography>
                        <Typography 
                          variant="body2" 
                          fontWeight="bold"
                          sx={{ 
                            fontSize: { xs: '0.7rem', md: '0.8rem' },
                            textAlign: 'right'
                          }}
                        >
                          {formatDate(post.createdAt)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Card>
                </Stack>
              </Fade>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Floating Action Button - Only show on scroll */}
      <Zoom in={!isMobile}>
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: { xs: 16, sm: 24 },
            right: { xs: 16, sm: 24 },
            zIndex: 1000,
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          size={isMobile ? "small" : "medium"}
        >
          ↑
        </Fab>
      </Zoom>

      {/* Edit Post Modal */}
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        fullWidth
        maxWidth="md"
        fullScreen={isMobile}
      >
        <DialogTitle>
          <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold">
            Edit Post
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Title"
              fullWidth
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              variant="outlined"
              helperText="Minimum 3 characters required"
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              label="Content"
              fullWidth
              multiline
              rows={isMobile ? 6 : 8}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              variant="outlined"
              helperText="Minimum 10 characters required"
              size={isMobile ? "small" : "medium"}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: isMobile ? 2 : 3 }}>
          <Button 
            onClick={() => setEditOpen(false)}
            disabled={editLoading}
            size={isMobile ? "small" : "medium"}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleEditSave}
            disabled={editLoading || !editTitle.trim() || !editContent.trim()}
            startIcon={editLoading ? <CircularProgress size={16} /> : null}
            size={isMobile ? "small" : "medium"}
          >
            {editLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ 
          vertical: isMobile ? 'bottom' : 'bottom', 
          horizontal: isMobile ? 'center' : 'left' 
        }}
        sx={{ 
          bottom: { xs: 70, sm: 24 } // Avoid FAB on mobile
        }}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          variant="filled"
          sx={{ 
            width: '100%',
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PostDetails;

