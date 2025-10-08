import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Box,
  Typography,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import BlogHeader from "../components/blogs/BlogHeader";
import BlogFilters from "../components/blogs/BlogFilters";
import PostsGrid from "../components/blogs/PostsGrid";
import EditPostModal from "../components/blogs/EditPostModal";
import LoadingState from "../components/blogs/LoadingState";
import EmptyState from "../components/blogs/EmptyState";
import type { Post, Category } from "../types";



const BASE_URL = import.meta.env.VITE_BASE_URL;

const Blogs: React.FC = () => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const token = user?.token;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 9;

  // Edit modal state
  const [open, setOpen] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);

  // Bookmark state
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set());
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

  // Fetch posts and categories
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (searchTerm) queryParams.append('search', searchTerm);
        if (selectedCategory) queryParams.append('category', selectedCategory);
        queryParams.append('page', currentPage.toString());
        queryParams.append('limit', postsPerPage.toString());

        const res = await axios.get(`${BASE_URL}posts?${queryParams}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        
        if (res.data && Array.isArray(res.data.posts)) {
          setPosts(res.data.posts);
          setTotalPages(Math.ceil(res.data.total / postsPerPage));
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error("Failed to fetch posts", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}categories`);
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchPosts();
    fetchCategories();
  }, [token, searchTerm, selectedCategory, currentPage]);

  // Check bookmark status for all posts
  useEffect(() => {
    if (token && posts.length > 0) {
      checkBookmarkStatuses();
    }
  }, [posts, token]);

  const checkBookmarkStatuses = async () => {
    if (!token || posts.length === 0) return;

    try {
      const bookmarkPromises = posts.map(post => 
        axios.get(`${BASE_URL}posts/bookmarks/check/${post._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );

      const responses = await Promise.all(bookmarkPromises);
      const bookmarkedIds = new Set<string>();

      responses.forEach((response, index) => {
        if (response.data.bookmarked) {
          bookmarkedIds.add(posts[index]._id);
        }
      });

      setBookmarkedPosts(bookmarkedIds);
    } catch (err) {
      console.error("Error checking bookmark statuses:", err);
    }
  };

  // Show snackbar helper
  const showSnackbar = (message: string, severity: "success" | "error" = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // Open edit modal
  const handleOpenEdit = (post: Post) => {
    setEditPost(post);
    setOpen(true);
  };

  const handleCloseEdit = () => {
    setOpen(false);
    setEditPost(null);
  };

  // Like a post
  const handleLike = async (postId: string) => {
    if (!token) {
      showSnackbar("Please login to like posts", "error");
      return;
    }
    
    try {
      await axios.post(
        `${BASE_URL}posts/like/${postId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Refetch posts to get updated data
      const updatedPosts = await axios.get(`${BASE_URL}posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(Array.isArray(updatedPosts.data.posts) ? updatedPosts.data.posts : []);
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to like post", "error");
    }
  };

  // Dislike a post
  const handleDislike = async (postId: string) => {
    if (!token) {
      showSnackbar("Please login to dislike posts", "error");
      return;
    }
    
    try {
      await axios.post(
        `${BASE_URL}posts/dislike/${postId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Refetch posts to get updated data
      const updatedPosts = await axios.get(`${BASE_URL}posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(Array.isArray(updatedPosts.data.posts) ? updatedPosts.data.posts : []);
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to dislike post", "error");
    }
  };

  // Bookmark a post
  const handleBookmark = async (postId: string) => {
    if (!token) {
      showSnackbar("Please login to bookmark posts", "error");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}posts/bookmark/${postId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state based on response
      if (response.data.bookmarked) {
        setBookmarkedPosts(prev => new Set(prev).add(postId));
        showSnackbar("Post bookmarked successfully! 📚");
      } else {
        setBookmarkedPosts(prev => {
          const newSet = new Set(prev);
          newSet.delete(postId);
          return newSet;
        });
        showSnackbar("Bookmark removed");
      }
    } catch (err: any) {
      console.error("Error bookmarking post:", err);
      showSnackbar(err.response?.data?.message || "Failed to bookmark post", "error");
    }
  };

  // Update posts after edit
  const handlePostUpdate = (updatedPost: Post) => {
    setPosts((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setCurrentPage(1);
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <BlogHeader />
      
      <BlogFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        categories={categories}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        onClearFilters={clearFilters}
      />

      {posts.length === 0 ? (
        <EmptyState 
          hasFilters={!!(searchTerm || selectedCategory)}
          user={user}
        />
      ) : (
        <PostsGrid
          posts={posts}
          currentPage={currentPage}
          totalPages={totalPages}
          bookmarkedPosts={bookmarkedPosts}
          user={user}
          onPageChange={setCurrentPage}
          onEditPost={handleOpenEdit}
          onLikePost={handleLike}
          onDislikePost={handleDislike}
          onBookmarkPost={handleBookmark}
        />
      )}

      {editPost && (
        <EditPostModal
          open={open}
          post={editPost}
          categories={categories}
          onClose={handleCloseEdit}
          onSave={handlePostUpdate}
          token={token}
        />
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Blogs;