// hooks/usePost.ts
import { useState, useCallback } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export interface Post {
  _id: string;
  title: string;
  content: string;
  category?: { _id: string; name: string };
  author: { _id: string; name: string; email: string; role: string };
  imageUrl?: string;
  tags?: string[];
  status: "draft" | "published";
  likes: string[];
  dislikes: string[];
  createdAt: string;
}

interface UsePostReturn {
  post: Post | null;
  loading: boolean;
  error: string | null;
  fetchPost: (postId: string, token?: string) => Promise<void>;
  likePost: (postId: string, token: string) => Promise<void>;
  dislikePost: (postId: string, token: string) => Promise<void>;
  deletePost: (postId: string, token: string) => Promise<void>;
  updatePost: (postId: string, updates: { title: string; content: string }, token: string) => Promise<void>;
  clearError: () => void;
}

export const usePost = (): UsePostReturn => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = useCallback(async (postId: string, token?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}posts/${postId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setPost(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Post not found');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const likePost = useCallback(async (postId: string, token: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}posts/like/${postId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPost(prev => prev ? { ...prev, likes: response.data.likes || [], dislikes: response.data.dislikes || [] } : prev);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to like post');
      throw err;
    }
  }, []);

  const dislikePost = useCallback(async (postId: string, token: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}posts/dislike/${postId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPost(prev => prev ? { ...prev, likes: response.data.likes || [], dislikes: response.data.dislikes || [] } : prev);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to dislike post');
      throw err;
    }
  }, []);

  const deletePost = useCallback(async (postId: string, token: string) => {
    try {
      await axios.delete(`${BASE_URL}posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete post');
      throw err;
    }
  }, []);

  const updatePost = useCallback(async (postId: string, updates: { title: string; content: string }, token: string) => {
    try {
      const response = await axios.put(
        `${BASE_URL}posts/${postId}`,
        updates,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPost(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update post');
      throw err;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    post,
    loading,
    error,
    fetchPost,
    likePost,
    dislikePost,
    deletePost,
    updatePost,
    clearError,
  };
};