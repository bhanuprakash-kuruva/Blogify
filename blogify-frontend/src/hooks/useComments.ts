// hooks/useComments.ts
import { useState, useCallback } from 'react';
import {type Comment, getCommentsByPostId, addComment, likeComment, dislikeComment, deleteComment } from '../utils/commentApi';

interface UseCommentsReturn {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  fetchComments: (postId: string) => Promise<void>;
  createComment: (postId: string, content: string, token: string, user: any) => Promise<void>;
  likeComment: (commentId: string, token: string) => Promise<void>;
  dislikeComment: (commentId: string, token: string) => Promise<void>;
  removeComment: (commentId: string, token: string) => Promise<void>;
  clearError: () => void;
}

export const useComments = (): UseCommentsReturn => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async (postId: string) => {
    setLoading(true);
    setError(null);
    try {
      const commentsData = await getCommentsByPostId(postId);
      setComments(commentsData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch comments');
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createComment = useCallback(async (postId: string, content: string, token: string, user: any) => {
    setError(null);
    try {
      const newComment = await addComment(postId, content, token);
      
      // Enhance the comment with user data
      const commentWithUser = {
        ...newComment,
        user: {
          _id: user?._id,
          name: user?.name || 'Unknown User',
          email: user?.email || ''
        }
      };
      
      setComments(prev => [commentWithUser, ...prev]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add comment');
      throw err;
    }
  }, []);

  const handleLikeComment = useCallback(async (commentId: string, token: string) => {
    try {
      const updatedComment = await likeComment(commentId, token);
      setComments(prev => prev.map(comment => 
        comment._id === commentId ? updatedComment : comment
      ));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to like comment');
      throw err;
    }
  }, []);

  const handleDislikeComment = useCallback(async (commentId: string, token: string) => {
    try {
      const updatedComment = await dislikeComment(commentId, token);
      setComments(prev => prev.map(comment => 
        comment._id === commentId ? updatedComment : comment
      ));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to dislike comment');
      throw err;
    }
  }, []);

  const removeComment = useCallback(async (commentId: string, token: string) => {
    try {
      await deleteComment(commentId, token);
      setComments(prev => prev.filter(comment => comment._id !== commentId));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete comment');
      throw err;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    comments,
    loading,
    error,
    fetchComments,
    createComment,
    likeComment: handleLikeComment,
    dislikeComment: handleDislikeComment,
    removeComment,
    clearError,
  };
};

