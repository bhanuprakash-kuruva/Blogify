// services/commentApi.ts
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export interface Comment {
  _id: string;
  post: string;
  user: { 
    _id: string; 
    name?: string;
    email?: string;
  };
  content: string;
  likes: any[];
  dislikes: any[];
  createdAt: string;
}

// Get comments for a post
export const getCommentsByPostId = async (postId: string): Promise<Comment[]> => {
  const response = await axios.get(`${BASE_URL}comments/${postId}`);
  return response.data;
};

// Add a new comment
export const addComment = async (postId: string, content: string, token: string): Promise<Comment> => {
  const response = await axios.post(
    `${BASE_URL}comments/`,
    {
      postId,
      content,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Like a comment
export const likeComment = async (commentId: string, token: string): Promise<Comment> => {
  const response = await axios.post(
    `${BASE_URL}comments/${commentId}/like`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Dislike a comment
export const dislikeComment = async (commentId: string, token: string): Promise<Comment> => {
  const response = await axios.post(
    `${BASE_URL}comments/${commentId}/dislike`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Delete a comment
export const deleteComment = async (commentId: string, token: string): Promise<void> => {
  console.log(token);
  await axios.delete(`${BASE_URL}comments/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

