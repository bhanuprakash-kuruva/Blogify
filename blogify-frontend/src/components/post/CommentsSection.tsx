// import React, { useContext, useState } from "react";
// import { Card, CardContent, Typography, Box, Stack, useTheme, Alert, CircularProgress } from "@mui/material";
// import { Comment, AddComment, ErrorOutline } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import CommentForm from "./CommentForm";
// import CommentCard from "./CommentCard";
// import type { Comment as CommentType, User } from "../blogs/types/index";
// import { AuthContext } from "../../Context/AuthContext";
// interface CommentsSectionProps {
//   postId: string;
//   comments: CommentType[];
//   loading: boolean;
//   error: string | null;
//   onAddComment: (content: string) => Promise<void>;
//   onLikeComment: (commentId: string) => Promise<void>;
//   onDislikeComment: (commentId: string) => Promise<void>;
//   onDeleteComment: (commentId: string) => Promise<void>;
//   currentUser: User | null;
//   clearError: () => void;
//   isMobile: boolean;
// }

// const CommentsSection: React.FC<CommentsSectionProps> = ({
//   postId,
//   comments,
//   loading,
//   error,
//   onAddComment,
//   onLikeComment,
//   onDislikeComment,
//   onDeleteComment,
//   currentUser,
//   clearError,
//   isMobile,
// }) => {
//   const theme = useTheme();
//   const [replyingTo, setReplyingTo] = useState<string | null>(null);
//   const [actionLoading, setActionLoading] = useState<string | null>(null);
//     const { user } = useContext(AuthContext);
  
//   const handleAddComment = async (content: string) => {
//     try {
//       await onAddComment(content);
//       setReplyingTo(null);
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   };

//   const handleLikeComment = async (commentId: string) => {
//     if (!currentUser) return;
    
//     setActionLoading(commentId);
//     try {
//       await onLikeComment(commentId);
//     } catch (error) {
//       console.error('Error liking comment:', error);
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handleDislikeComment = async (commentId: string) => {
//     if (!currentUser) return;
    
//     setActionLoading(commentId);
//     try {
//       await onDislikeComment(commentId);
//     } catch (error) {
//       console.error('Error disliking comment:', error);
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handleDeleteComment = async (commentId: string) => {
//     if (!currentUser) return;
    
//     if (window.confirm('Are you sure you want to delete this comment?')) {
//       setActionLoading(commentId);
//       try {
//         await onDeleteComment(commentId);
//       } catch (error) {
//         console.error('Error deleting comment:', error);
//       } finally {
//         setActionLoading(null);
//       }
//     }
//   };

//   // Safe comment author name getter - FIXED: using 'user' instead of 'author'
//   const getAuthorName = (comment: CommentType): string => {
//     console.log('Comment data:', comment); // Debug log
//     if (!comment.user) return 'Unknown User';
//     if (typeof comment.user === 'string') return 'Loading...';
//     return comment.user.name || 'Unknown User';
//   };

//   // Safe author ID getter for comparison - FIXED: using 'user' instead of 'author'
//   const getAuthorId = (comment: CommentType): string | null => {
//     if (!comment.user) return null;
//     if (typeof comment.user === 'string') return comment.user;
//     return comment.user._id || null;
//   };

//   // Safe like/dislike check
//   const hasUserLiked = (comment: CommentType): boolean => {
//     if (!currentUser?._id) return false;
//     return comment.likes.some(like => {
//       if (!like) return false;
//       if (typeof like === 'string') return like === currentUser._id;
//       return like._id === currentUser._id || like.toString?.() === currentUser._id;
//     });
//   };

//   const hasUserDisliked = (comment: CommentType): boolean => {
//     if (!currentUser?._id) return false;
//     return comment.dislikes.some(dislike => {
//       if (!dislike) return false;
//       if (typeof dislike === 'string') return dislike === currentUser._id;
//       return dislike._id === currentUser._id || dislike.toString?.() === currentUser._id;
//     });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay: 0.6 }}
//     >
//       <Card
//         sx={{
//           borderRadius: { xs: 2, sm: 3 },
//           overflow: 'hidden',
//           background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
//           boxShadow: `0 4px 20px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}`,
//           border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`,
//         }}
//       >
//         <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
//           {/* Header */}
//           <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
//             <Box
//               sx={{
//                 background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
//                 borderRadius: 2,
//                 p: 1,
//                 color: 'white',
//               }}
//             >
//               <Comment />
//             </Box>
//             <Box>
//               <Typography
//                 variant="h5"
//                 sx={{
//                   fontWeight: 700,
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
//                   backgroundClip: 'text',
//                   WebkitBackgroundClip: 'text',
//                   color: 'transparent',
//                 }}
//               >
//                 Comments
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
//               </Typography>
//             </Box>
//           </Stack>

//           {/* Error Alert */}
//           {error && (
//             <Alert 
//               severity="error" 
//               onClose={clearError}
//               sx={{ mb: 3 }}
//               icon={<ErrorOutline />}
//             >
//               {error}
//             </Alert>
//           )}

//           {/* Add Comment Form */}
//           <CommentForm
//             onSubmit={handleAddComment}
//             currentUser={currentUser}
//             isMobile={isMobile}
//             replyingTo={replyingTo}
//             onCancelReply={() => setReplyingTo(null)}
//           />

//           {/* Loading State */}
//           {loading && (
//             <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
//               <CircularProgress size={40} />
//             </Box>
//           )}

//           {/* Comments List */}
//           <Box sx={{ mt: 4 }}>
//             <AnimatePresence>
//               {!loading && comments.map((comment, index) => (
//                 <motion.div
//                   key={comment._id}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.4, delay: index * 0.1 }}
//                   exit={{ opacity: 0, x: 20 }}
//                 >
//                   <CommentCard
//                     comment={comment}
//                     onLike={() => handleLikeComment(comment._id)}
//                     onDislike={() => handleDislikeComment(comment._id)}
//                     onDelete={() => handleDeleteComment(comment._id)}
//                     onReply={() => setReplyingTo(comment._id)}
//                     currentUser={currentUser}
//                     isMobile={isMobile}
//                     isAuthor={currentUser?._id === getAuthorId(comment)}
//                     hasUserLiked={hasUserLiked(comment)}
//                     hasUserDisliked={hasUserDisliked(comment)}
//                     isLoading={actionLoading === comment._id}
//                     authorName={getAuthorName(comment)}
//                   />
//                 </motion.div>
//               ))}
//             </AnimatePresence>

//             {/* Empty State */}
//             {!loading && comments.length === 0 && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <Box
//                   sx={{
//                     textAlign: 'center',
//                     py: 8,
//                     color: 'text.secondary',
//                   }}
//                 >
//                   <AddComment sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
//                   <Typography variant="h6" gutterBottom>
//                     No comments yet
//                   </Typography>
//                   <Typography variant="body2">
//                     {currentUser ? 'Be the first to share your thoughts!' : 'Login to share your thoughts!'}
//                   </Typography>
//                 </Box>
//               </motion.div>
//             )}
//           </Box>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// };

// export default CommentsSection;

import React, { useContext, useState } from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Stack, 
  useTheme, 
  Alert, 
  CircularProgress,
  Snackbar 
} from "@mui/material";
import { Comment as CommentIcon, AddComment, ErrorOutline } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
import type { Comment as CommentType, User } from "../blogs/types/index";
import { AuthContext } from "../../Context/AuthContext";

interface CommentsSectionProps {
  postId: string;
  comments: CommentType[];
  loading: boolean;
  error: string | null;
  onAddComment: (content: string) => Promise<void>;
  onLikeComment: (commentId: string) => Promise<void>;
  onDislikeComment: (commentId: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
  currentUser: User | null;
  clearError: () => void;
  isMobile: boolean;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  postId,
  comments,
  loading,
  error,
  onAddComment,
  onLikeComment,
  onDislikeComment,
  onDeleteComment,
  currentUser,
  clearError,
  isMobile,
}) => {
  const theme = useTheme();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: "", 
    severity: "success" as "success" | "error" 
  });
  const {user} = useContext(AuthContext);
  const showSnackbar = (message: string, severity: "success" | "error" = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleAddComment = async (content: string) => {
    try {
      await onAddComment(content);
      setReplyingTo(null);
      showSnackbar("Comment added successfully!");
    } catch (error: any) {
      console.error('Error adding comment:', error);
      showSnackbar(error.message || "Failed to add comment", "error");
    }
  };

  const handleLikeComment = async (commentId: string) => {
    if (!currentUser) {
      showSnackbar("Please login to like comments", "error");
      return;
    }
    
    setActionLoading(commentId);
    try {
      await onLikeComment(commentId);
    } catch (error: any) {
      console.error('Error liking comment:', error);
      showSnackbar(error.message || "Failed to like comment", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDislikeComment = async (commentId: string) => {
    if (!currentUser) {
      showSnackbar("Please login to dislike comments", "error");
      return;
    }
    
    setActionLoading(commentId);
    try {
      await onDislikeComment(commentId);
    } catch (error: any) {
      console.error('Error disliking comment:', error);
      showSnackbar(error.message || "Failed to dislike comment", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!currentUser) {
      showSnackbar("Please login to delete comments", "error");
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setActionLoading(commentId);
      try {
        await onDeleteComment(commentId);
        showSnackbar("Comment deleted successfully!");
      } catch (error: any) {
        console.error('Error deleting comment:', error);
        const errorMessage = error.message || "Failed to delete comment";
        showSnackbar(errorMessage, "error");
      } finally {
        setActionLoading(null);
      }
    }
  };

  // Safe comment author name getter
  const getAuthorName = (comment: CommentType): string => {
    if (!comment.user) return 'Unknown User';
    if (typeof comment.user === 'string') return 'Loading...';
    return comment.user.name || 'Unknown User';
  };

  // Safe author ID getter for comparison
  const getAuthorId = (comment: CommentType): string | null => {
    if (!comment.user) return null;
    if (typeof comment.user === 'string') return comment.user;
    return comment.user._id || null;
  };

  // Safe like/dislike check
  const hasUserLiked = (comment: CommentType): boolean => {
    if (!currentUser?._id) return false;
    return comment.likes.some(like => {
      if (!like) return false;
      if (typeof like === 'string') return like === currentUser._id;
      return like._id === currentUser._id || like.toString?.() === currentUser._id;
    });
  };

  const hasUserDisliked = (comment: CommentType): boolean => {
    if (!currentUser?._id) return false;
    return comment.dislikes.some(dislike => {
      if (!dislike) return false;
      if (typeof dislike === 'string') return dislike === currentUser._id;
      return dislike._id === currentUser._id || dislike.toString?.() === currentUser._id;
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card
          sx={{
            borderRadius: { xs: 2, sm: 3 },
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
            boxShadow: `0 4px 20px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}`,
            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`,
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            {/* Header */}
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  borderRadius: 2,
                  p: 1,
                  color: 'white',
                }}
              >
                <CommentIcon />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Comments
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
                </Typography>
              </Box>
            </Stack>

            {/* Error Alert */}
            {error && (
              <Alert 
                severity="error" 
                onClose={clearError}
                sx={{ mb: 3 }}
                icon={<ErrorOutline />}
              >
                {error}
              </Alert>
            )}

            {/* Add Comment Form */}
            <CommentForm
              onSubmit={handleAddComment}
              currentUser={currentUser}
              isMobile={isMobile}
              replyingTo={replyingTo}
              onCancelReply={() => setReplyingTo(null)}
            />

            {/* Loading State */}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress size={40} />
              </Box>
            )}

            {/* Comments List */}
            <Box sx={{ mt: 4 }}>
              <AnimatePresence>
                {!loading && comments.map((comment, index) => (
                  <motion.div
                    key={comment._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <CommentCard
                      comment={comment}
                      onLike={() => handleLikeComment(comment._id)}
                      onDislike={() => handleDislikeComment(comment._id)}
                      onDelete={() => handleDeleteComment(comment._id)}
                      onReply={() => setReplyingTo(comment._id)}
                      currentUser={currentUser}
                      isMobile={isMobile}
                      isAuthor={currentUser?._id === getAuthorId(comment)}
                      hasUserLiked={hasUserLiked(comment)}
                      hasUserDisliked={hasUserDisliked(comment)}
                      isLoading={actionLoading === comment._id}
                      authorName={getAuthorName(comment)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Empty State */}
              {!loading && comments.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: 8,
                      color: 'text.secondary',
                    }}
                  >
                    <AddComment sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                    <Typography variant="h6" gutterBottom>
                      No comments yet
                    </Typography>
                    <Typography variant="body2">
                      {currentUser ? 'Be the first to share your thoughts!' : 'Login to share your thoughts!'}
                    </Typography>
                  </Box>
                </motion.div>
              )}
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CommentsSection;