// // hooks/DashboardHooks.ts
// import { useState, useContext, useEffect } from 'react';
// import { AuthContext } from '../Context/AuthContext';
// import * as dashboardApi from '../services/dashboardApi';

// export const useDashboard = () => {
//   const { user } = useContext(AuthContext);
//   const token = user?.token;

//   // State management
//   const [tabValue, setTabValue] = useState(0);
//   const [categories, setCategories] = useState<dashboardApi.Category[]>([]);
//   const [posts, setPosts] = useState<dashboardApi.Post[]>([]);
//   const [users, setUsers] = useState<dashboardApi.User[]>([]);
//   const [stats, setStats] = useState<dashboardApi.AdminStats>({
//     totalUsers: 0,
//     totalPosts: 0,
//     totalComments: 0,
//     totalLikes: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState({ type: '', text: '' });

//   // Modals state
//   const [categoryModal, setCategoryModal] = useState({ open: false, category: null as dashboardApi.Category | null });
//   const [postModal, setPostModal] = useState({ open: false, post: null as dashboardApi.Post | null });
//   const [deleteModal, setDeleteModal] = useState({ open: false, type: '', id: '', name: '' });

//   // Form state
//   const [categoryForm, setCategoryForm] = useState({ name: '' });
//   const [postForm, setPostForm] = useState({
//     title: '',
//     content: '',
//     category: '',
//     tags: '',
//     status: 'published' as 'draft' | 'published',
//     image: null as File | null,
//   });

//   // Pagination
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [usersPage, setUsersPage] = useState(0);
//   const [usersRowsPerPage, setUsersRowsPerPage] = useState(10);
//   const [usersTotal, setUsersTotal] = useState(0);

//   // Fetch all data
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const data = await dashboardApi.fetchDashboardData(token);
//         setStats(data.stats);
//         setCategories(data.categories);
//         setPosts(data.posts);
//         setUsers(data.users);
//         setUsersTotal(data.usersTotal);
//       } catch (err) {
//         console.error("Failed to fetch data", err);
//         setMessage({ type: 'error', text: 'Failed to load dashboard data' });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [token]);

//   // Category Operations
//   const handleCreateCategory = async () => {
//     try {
//       const newCategory = await dashboardApi.createCategory(categoryForm.name, token!);
//       setCategories(prev => [...prev, newCategory]);
//       setCategoryModal({ open: false, category: null });
//       setCategoryForm({ name: '' });
//       setMessage({ type: 'success', text: 'Category created successfully!' });
//     } catch (err: any) {
//       setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to create category' });
//     }
//   };

//   const handleUpdateCategory = async () => {
//     if (!categoryModal.category) return;
//     try {
//       const updatedCategory = await dashboardApi.updateCategory(categoryModal.category._id, categoryForm.name, token!);
//       setCategories(prev => prev.map(cat => 
//         cat._id === categoryModal.category!._id ? updatedCategory : cat
//       ));
//       setCategoryModal({ open: false, category: null });
//       setCategoryForm({ name: '' });
//       setMessage({ type: 'success', text: 'Category updated successfully!' });
//     } catch (err: any) {
//       setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update category' });
//     }
//   };

//   const handleDeleteCategory = async () => {
//     try {
//       await dashboardApi.deleteCategory(deleteModal.id, token!);
//       setCategories(prev => prev.filter(cat => cat._id !== deleteModal.id));
//       setDeleteModal({ open: false, type: '', id: '', name: '' });
//       setMessage({ type: 'success', text: 'Category deleted successfully!' });
//     } catch (err: any) {
//       setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to delete category' });
//     }
//   };

//   // Post Operations
//   const handleCreatePost = async () => {
//     const formData = new FormData();
//     formData.append('title', postForm.title);
//     formData.append('content', postForm.content);
//     formData.append('category', postForm.category);
//     formData.append('tags', postForm.tags);
//     formData.append('status', postForm.status);
//     if (postForm.image) {
//       formData.append('image', postForm.image);
//     }

//     try {
//       const newPost = await dashboardApi.createPost(formData, token!);
//       setPosts(prev => [newPost, ...prev]);
//       setPostModal({ open: false, post: null });
//       setPostForm({ title: '', content: '', category: '', tags: '', status: 'published', image: null });
//       setMessage({ type: 'success', text: 'Post created successfully!' });
//     } catch (err: any) {
//       setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to create post' });
//     }
//   };

//   const handleUpdatePost = async () => {
//     if (!postModal.post) return;
//     const formData = new FormData();
//     formData.append('title', postForm.title);
//     formData.append('content', postForm.content);
//     formData.append('category', postForm.category);
//     formData.append('tags', postForm.tags);
//     formData.append('status', postForm.status);
//     if (postForm.image) {
//       formData.append('image', postForm.image);
//     }

//     try {
//       const updatedPost = await dashboardApi.updatePost(postModal.post._id, formData, token!);
//       setPosts(prev => prev.map(post => 
//         post._id === postModal.post!._id ? updatedPost : post
//       ));
//       setPostModal({ open: false, post: null });
//       setPostForm({ title: '', content: '', category: '', tags: '', status: 'published', image: null });
//       setMessage({ type: 'success', text: 'Post updated successfully!' });
//     } catch (err: any) {
//       setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update post' });
//     }
//   };

//   const handleDeletePost = async () => {
//     try {
//       await dashboardApi.deletePost(deleteModal.id, token!);
//       setPosts(prev => prev.filter(post => post._id !== deleteModal.id));
//       setDeleteModal({ open: false, type: '', id: '', name: '' });
//       setMessage({ type: 'success', text: 'Post deleted successfully!' });
//     } catch (err: any) {
//       setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to delete post' });
//     }
//   };

//   // User Operations
//   const handleUpdateUserRole = async (userId: string, newRole: 'user' | 'admin') => {
//     if (!userId) {
//       setMessage({ type: 'error', text: 'Invalid user ID' });
//       return;
//     }

//     try {
//       await dashboardApi.updateUserRole(userId, newRole, token!);
//       setUsers(prev => prev.map(user => 
//         user && user._id === userId ? { ...user, role: newRole } : user
//       ));
//       setMessage({ type: 'success', text: `User role updated to ${newRole}` });
//     } catch (err: any) {
//       setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update user role' });
//     }
//   };

//   const handleDeleteUser = async () => {
//     if (!deleteModal.id) {
//       setMessage({ type: 'error', text: 'Invalid user ID' });
//       return;
//     }

//     try {
//       await dashboardApi.deleteUser(deleteModal.id, token!);
//       setUsers(prev => prev.filter(user => user && user._id !== deleteModal.id));
//       setDeleteModal({ open: false, type: '', id: '', name: '' });
//       setMessage({ type: 'success', text: 'User deleted successfully!' });
//       setStats(prev => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
//     } catch (err: any) {
//       setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to delete user' });
//     }
//   };

//   // Modal handlers
//   const openPostModal = (post: dashboardApi.Post | null = null) => {
//   setPostModal({ open: true, post });

//   if (post) {
//     setPostForm({
//       title: post.title || '',
//       content: post.content || '',
//       category: post.category?._id || '', // safe access
//       tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
//       status: post.status || 'draft',
//       image: null, // If you want to display existing image, you may need extra logic in the modal
//     });
//   } else {
//     setPostForm({
//       title: '',
//       content: '',
//       category: '',
//       tags: '',
//       status: 'published',
//       image: null,
//     });
//   }
// };


//   const openDeleteModal = (type: string, id: string, name: string) => {
//     if (!id) {
//       setMessage({ type: 'error', text: 'Invalid item selected' });
//       return;
//     }
//     setDeleteModal({ open: true, type, id, name: name || 'Unknown' });
//   };

//   const clearMessage = () => {
//     setMessage({ type: '', text: '' });
//   };

//   return {
//     // State
//     tabValue,
//     setTabValue,
//     categories,
//     posts,
//     users,
//     stats,
//     loading,
//     message,
//     categoryModal,
//     postModal,
//     deleteModal,
//     categoryForm,
//     postForm,
//     page,
//     rowsPerPage,
//     usersPage,
//     usersRowsPerPage,
//     usersTotal,
    
//     // Setters
//     setCategoryForm,
//     setPostForm,
//     setPage,
//     setRowsPerPage,
//     setUsersPage,
//     setUsersRowsPerPage,
    
//     // Operations
//     handleCreateCategory,
//     handleUpdateCategory,
//     handleDeleteCategory,
//     handleCreatePost,
//     handleUpdatePost,
//     handleDeletePost,
//     handleUpdateUserRole,
//     handleDeleteUser,
    
//     // Modal handlers
//     openCategoryModal,
//     openPostModal,
//     openDeleteModal,
//     clearMessage,
    
//     // User info
//     user,
//   };
// };

// hooks/DashboardHooks.ts
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import * as dashboardApi from '../utils/dashboardApi';

export const useDashboard = () => {
  const { user } = useContext(AuthContext);
  const token = user?.token;

  // ----------------------
  // State management
  // ----------------------
  const [tabValue, setTabValue] = useState(0);
  const [categories, setCategories] = useState<dashboardApi.Category[]>([]);
  const [posts, setPosts] = useState<dashboardApi.Post[]>([]);
  const [users, setUsers] = useState<dashboardApi.User[]>([]);
  const [stats, setStats] = useState<dashboardApi.AdminStats>({
    totalUsers: 0,
    totalPosts: 0,
    totalComments: 0,
    totalLikes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  // ----------------------
  // Modals state
  // ----------------------
  const [categoryModal, setCategoryModal] = useState({
    open: false,
    category: null as dashboardApi.Category | null,
  });
  const [postModal, setPostModal] = useState({
    open: false,
    post: null as dashboardApi.Post | null,
  });
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    type: '',
    id: '',
    name: '',
  });

  // ----------------------
  // Form state
  // ----------------------
  const [categoryForm, setCategoryForm] = useState({ name: '' });
  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    status: 'published' as 'draft' | 'published',
    image: null as File | null,
  });

  // ----------------------
  // Pagination
  // ----------------------
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [usersPage, setUsersPage] = useState(0);
  const [usersRowsPerPage, setUsersRowsPerPage] = useState(10);
  const [usersTotal, setUsersTotal] = useState(0);

  // ----------------------
  // Fetch all dashboard data
  // ----------------------
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await dashboardApi.fetchDashboardData(token);
        setStats(data.stats);
        setCategories(data.categories);
        setPosts(data.posts);
        setUsers(data.users);
        setUsersTotal(data.usersTotal);
      } catch (err) {
        console.error('Failed to fetch data', err);
        setMessage({ type: 'error', text: 'Failed to load dashboard data' });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  // ----------------------
  // Modal Handlers
  // ----------------------
  const openCategoryModal = (category: dashboardApi.Category | null = null) => {
    setCategoryModal({ open: true, category });
    setCategoryForm({ name: category?.name || '' });
  };

  const openPostModal = (post: dashboardApi.Post | null = null) => {
    setPostModal({ open: true, post });

    if (post) {
      setPostForm({
        title: post.title || '',
        content: post.content || '',
        category: post.category?._id || '',
        tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
        status: post.status || 'draft',
        image: null, // if you want to preview existing image, extra logic needed
      });
    } else {
      setPostForm({
        title: '',
        content: '',
        category: '',
        tags: '',
        status: 'published',
        image: null,
      });
    }
  };

  const openDeleteModal = (type: string, id: string, name: string) => {
    if (!id) {
      setMessage({ type: 'error', text: 'Invalid item selected' });
      return;
    }
    setDeleteModal({ open: true, type, id, name: name || 'Unknown' });
  };

  const clearMessage = () => setMessage({ type: '', text: '' });

  // ----------------------
  // Category Operations
  // ----------------------
  const handleCreateCategory = async () => {
    try {
      const newCategory = await dashboardApi.createCategory(categoryForm.name, token!);
      setCategories(prev => [...prev, newCategory]);
      setCategoryModal({ open: false, category: null });
      setCategoryForm({ name: '' });
      setMessage({ type: 'success', text: 'Category created successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to create category' });
    }
  };

  const handleUpdateCategory = async () => {
    if (!categoryModal.category) return;
    try {
      const updatedCategory = await dashboardApi.updateCategory(categoryModal.category._id, categoryForm.name, token!);
      setCategories(prev => prev.map(cat => cat._id === categoryModal.category!._id ? updatedCategory : cat));
      setCategoryModal({ open: false, category: null });
      setCategoryForm({ name: '' });
      setMessage({ type: 'success', text: 'Category updated successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update category' });
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await dashboardApi.deleteCategory(deleteModal.id, token!);
      setCategories(prev => prev.filter(cat => cat._id !== deleteModal.id));
      setDeleteModal({ open: false, type: '', id: '', name: '' });
      setMessage({ type: 'success', text: 'Category deleted successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to delete category' });
    }
  };

  // ----------------------
  // Post Operations
  // ----------------------
// Post Operations
const handleCreatePost = async () => {
  const formData = new FormData();
  formData.append('title', postForm.title || '');
  formData.append('content', postForm.content || '');
  formData.append('category', postForm.category || '');
  
  // Ensure tags is always a string, even if empty
  const tagsString = postForm.tags || '';
  formData.append('tags', tagsString);
  
  formData.append('status', postForm.status || 'draft');

  if (postForm.image) {
    formData.append('image', postForm.image);
  }
  console.log('FormData entries:');
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  console.log('PostForm data:', postForm);
  console.log(formData);
  try {
    const newPost = await dashboardApi.createPost(formData, token!);
    setPosts(prev => [newPost, ...prev]);
    setPostModal({ open: false, post: null });
    setPostForm({ title: '', content: '', category: '', tags: '', status: 'published', image: null });
    setMessage({ type: 'success', text: 'Post created successfully!' });
  } catch (err: any) {
    setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to create post' });
  }
};

const handleUpdatePost = async () => {
  if (!postModal.post) return;

  const formData = new FormData();
  formData.append('title', postForm.title || '');
  formData.append('content', postForm.content || '');
  formData.append('category', postForm.category || '');
  formData.append('tags', postForm.tags); // <-- send as string
  formData.append('status', postForm.status || 'draft');

  if (postForm.image) {
    formData.append('image', postForm.image);
  }

  try {
    const updatedPost = await dashboardApi.updatePost(postModal.post._id, formData, token!);
    setPosts(prev => prev.map(p => p._id === updatedPost._id ? updatedPost : p));
    setPostModal({ open: false, post: null });
    setPostForm({ title: '', content: '', category: '', tags: '', status: 'published', image: null });
    setMessage({ type: 'success', text: 'Post updated successfully!' });
  } catch (err: any) {
    setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update post' });
  }
};




  const handleDeletePost = async () => {
    try {
      await dashboardApi.deletePost(deleteModal.id, token!);
      setPosts(prev => prev.filter(post => post._id !== deleteModal.id));
      setDeleteModal({ open: false, type: '', id: '', name: '' });
      setMessage({ type: 'success', text: 'Post deleted successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to delete post' });
    }
  };

  // ----------------------
  // User Operations
  // ----------------------
  const handleUpdateUserRole = async (userId: string, newRole: 'user' | 'admin') => {
    if (!userId) {
      setMessage({ type: 'error', text: 'Invalid user ID' });
      return;
    }
    try {
      await dashboardApi.updateUserRole(userId, newRole, token!);
      setUsers(prev => prev.map(user => user && user._id === userId ? { ...user, role: newRole } : user));
      setMessage({ type: 'success', text: `User role updated to ${newRole}` });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update user role' });
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteModal.id) {
      setMessage({ type: 'error', text: 'Invalid user ID' });
      return;
    }
    try {
      await dashboardApi.deleteUser(deleteModal.id, token!);
      setUsers(prev => prev.filter(user => user && user._id !== deleteModal.id));
      setDeleteModal({ open: false, type: '', id: '', name: '' });
      setMessage({ type: 'success', text: 'User deleted successfully!' });
      setStats(prev => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to delete user' });
    }
  };

  // ----------------------
  // Return all hook data
  // ----------------------
  return {
    // State
    tabValue,
    setTabValue,
    categories,
    posts,
    users,
    stats,
    loading,
    message,
    categoryModal,
    postModal,
    deleteModal,
    categoryForm,
    postForm,
    page,
    rowsPerPage,
    usersPage,
    usersRowsPerPage,
    usersTotal,

    // Setters
    setCategoryForm,
    setPostForm,
    setPage,
    setRowsPerPage,
    setUsersPage,
    setUsersRowsPerPage,

    // Operations
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleCreatePost,
    handleUpdatePost,
    handleDeletePost,
    handleUpdateUserRole,
    handleDeleteUser,

    // Modal handlers
    openCategoryModal,
    openPostModal,
    openDeleteModal,
    clearMessage,

    // User info
    user,
  };
};
