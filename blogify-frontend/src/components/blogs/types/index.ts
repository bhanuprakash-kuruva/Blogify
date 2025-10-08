export interface Category {
  _id: string;
  name: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  category: Category;
  author: User;
  imageUrl?: string;
  likes: any[];
  dislikes: any[];
  tags?: string[];
  status: "draft" | "published";
  createdAt: string;
}

export interface Comment {
  _id: string;
  content: string;
  user: User; // Changed from 'author' to 'user' to match backend
  post: string;
  likes: any[];
  dislikes: any[];
  createdAt: string;
  updatedAt: string;
}