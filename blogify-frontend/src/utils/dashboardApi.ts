// services/dashboardApi.ts
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: { _id: string; name: string };
  category: { _id: string; name: string };
  tags: string[];
  status: 'draft' | 'published';
  imageUrl?: string;
  likes: string[];
  dislikes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  postCount?: number;
}

export interface AdminStats {
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
  totalLikes: number;
}

// Dashboard Data
export const fetchDashboardData = async (token?: string) => {
  const [statsRes, categoriesRes, postsRes, usersRes] = await Promise.all([
    axios.get(`${BASE_URL}admin/stats`, { 
      headers: token ? { Authorization: `Bearer ${token}` } : {} 
    }),
    axios.get(`${BASE_URL}categories`),
    axios.get(`${BASE_URL}posts`, {
      params: { page: 1, limit: 100 },
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
    axios.get(`${BASE_URL}users`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      params: { page: 1, limit: 100 }
    })
  ]);

  const usersData = usersRes.data.users || [];
  const validUsers = usersData.filter((user: User | null) => user !== null);

  return {
    stats: statsRes.data,
    categories: Array.isArray(categoriesRes.data) ? categoriesRes.data : categoriesRes.data.categories || [],
    posts: postsRes.data.posts || [],
    users: validUsers,
    usersTotal: validUsers.length,
  };
};

// Category Operations
export const createCategory = async (name: string, token: string) => {
  const res = await axios.post(
    `${BASE_URL}categories`,
    { name },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const updateCategory = async (id: string, name: string, token: string) => {
  const res = await axios.put(
    `${BASE_URL}categories/${id}`,
    { name },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const deleteCategory = async (id: string, token: string) => {
  await axios.delete(
    `${BASE_URL}categories/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// Post Operations
export const createPost = async (formData: FormData, token: string) => {
  const res = await axios.post(
    `${BASE_URL}posts`,
    formData,
    { 
      headers: { 
        Authorization: `Bearer ${token}`
      } 
    }
  );
  return res.data;
};

export const updatePost = async (id: string, formData: FormData, token: string) => {
  console.log(id,formData,token);
  const res = await axios.put(
    `${BASE_URL}posts/${id}`,
    formData,
    { 
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      } 
    }
  );
  return res.data;
};

export const deletePost = async (id: string, token: string) => {
  await axios.delete(
    `${BASE_URL}posts/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// User Operations
export const updateUserRole = async (userId: string, role: 'user' | 'admin', token: string) => {
  await axios.put(
    `${BASE_URL}users/${userId}/role`,
    { role },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const deleteUser = async (userId: string, token: string) => {
  await axios.delete(
    `${BASE_URL}users/${userId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// services/dashboardApi.ts - Add these functions
export const bookmarkPost = async (postId: string, token: string) => {
  const res = await axios.post(
    `${BASE_URL}posts/bookmark/${postId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const getUserBookmarks = async (token: string) => {
  const res = await axios.get(
    `${BASE_URL}posts/bookmarks/my`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const checkBookmarkStatus = async (postId: string, token: string) => {
  const res = await axios.get(
    `${BASE_URL}posts/bookmarks/check/${postId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const getUserLikedPosts = async (token: string) => {
  const res = await axios.get(
    `${BASE_URL}posts/liked-posts/my`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};