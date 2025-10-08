// import React from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   useTheme,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Alert,
//   Chip,
//   Tab,
//   Tabs,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Switch,
//   FormControlLabel,
//   Avatar,
//   LinearProgress,
//   MenuItem,
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
//   Category as CategoryIcon,
//   PostAdd as PostAddIcon,
//   People as PeopleIcon,
//   Comment as CommentIcon,
//   ThumbUp as ThumbUpIcon,
//   BarChart as BarChartIcon,
//   Image as ImageIcon,
// } from "@mui/icons-material";
// import { useDashboard } from "../hooks/DashboardHooks";
// import TabPanel from "../components/TabPanel";
// import OverviewTab from "../components/OverviewTab";
// import PostsManagementTab from "../components/PostsManagementTab";
// import CategoriesTab from "../components/CategoriesTab";
// import UsersManagementTab from "../components/UsersManagementTab";

// const Dashboard: React.FC = () => {
//   const theme = useTheme();
//   const {
//     // State
//     tabValue,
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
//     user: currentUser,
    
//     // Setters
//     setTabValue,
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
//   } = useDashboard();

//   if (loading) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 5 }}>
//         <LinearProgress />
//         <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
//           Loading Dashboard...
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="xl" sx={{ py: 4 }}>
//       {/* Header */}
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
//           Admin Dashboard
//         </Typography>
//         <Typography variant="h6" color="text.secondary">
//           Welcome back, {currentUser?.name}! Manage your platform efficiently.
//         </Typography>
//       </Box>

//       {/* Stats Overview */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
//             <PeopleIcon sx={{ fontSize: 40, mb: 2 }} />
//             <Typography variant="h4" gutterBottom>{stats.totalUsers}</Typography>
//             <Typography variant="h6">Total Users</Typography>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'secondary.main', color: 'white' }}>
//             <PostAddIcon sx={{ fontSize: 40, mb: 2 }} />
//             <Typography variant="h4" gutterBottom>{stats.totalPosts}</Typography>
//             <Typography variant="h6">Total Posts</Typography>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'success.main', color: 'white' }}>
//             <CommentIcon sx={{ fontSize: 40, mb: 2 }} />
//             <Typography variant="h4" gutterBottom>{stats.totalComments}</Typography>
//             <Typography variant="h6">Total Comments</Typography>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'warning.main', color: 'white' }}>
//             <ThumbUpIcon sx={{ fontSize: 40, mb: 2 }} />
//             <Typography variant="h4" gutterBottom>{stats.totalLikes}</Typography>
//             <Typography variant="h6">Total Likes</Typography>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Tabs Navigation */}
//       <Paper sx={{ width: '100%', mb: 2 }}>
//         <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
//           <Tab icon={<BarChartIcon />} label="Overview" />
//           <Tab icon={<PostAddIcon />} label="Posts Management" />
//           <Tab icon={<CategoryIcon />} label="Categories" />
//           <Tab icon={<PeopleIcon />} label="Users Management" />
//         </Tabs>
//       </Paper>

//       {/* Messages */}
//       {message.text && (
//         <Alert 
//           severity={message.type as any} 
//           sx={{ mb: 2 }}
//           onClose={clearMessage}
//         >
//           {message.text}
//         </Alert>
//       )}

//       {/* Tab Panels */}
//       <Paper>
//         <TabPanel value={tabValue} index={0}>
//           <OverviewTab 
//             posts={posts}
//             openPostModal={openPostModal}
//             openCategoryModal={openCategoryModal}
//           />
//         </TabPanel>

//         <TabPanel value={tabValue} index={1}>
//           <PostsManagementTab 
//             posts={posts}
//             page={page}
//             rowsPerPage={rowsPerPage}
//             openPostModal={openPostModal}
//             openDeleteModal={openDeleteModal}
//             setPage={setPage}
//             setRowsPerPage={setRowsPerPage}
//           />
//         </TabPanel>

//         <TabPanel value={tabValue} index={2}>
//           <CategoriesTab 
//             categories={categories}
//             posts={posts}
//             openCategoryModal={openCategoryModal}
//             openDeleteModal={openDeleteModal}
//           />
//         </TabPanel>

//         <TabPanel value={tabValue} index={3}>
//           <UsersManagementTab 
//             users={users}
//             usersPage={usersPage}
//             usersRowsPerPage={usersRowsPerPage}
//             usersTotal={usersTotal}
//             currentUser={currentUser}
//             handleUpdateUserRole={handleUpdateUserRole}
//             openDeleteModal={openDeleteModal}
//             setUsersPage={setUsersPage}
//             setUsersRowsPerPage={setUsersRowsPerPage}
//           />
//         </TabPanel>
//       </Paper>

//       {/* Category Modal */}
//       <Dialog open={categoryModal.open} onClose={() => openCategoryModal(null)}>
//         <DialogTitle>
//           {categoryModal.category ? 'Edit Category' : 'Create New Category'}
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Category Name"
//             fullWidth
//             variant="outlined"
//             value={categoryForm.name}
//             onChange={(e) => setCategoryForm({ name: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => openCategoryModal(null)}>Cancel</Button>
//           <Button 
//             onClick={categoryModal.category ? handleUpdateCategory : handleCreateCategory}
//             variant="contained"
//           >
//             {categoryModal.category ? 'Update' : 'Create'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Post Modal */}
//       <Dialog open={postModal.open} onClose={() => openPostModal(null)} maxWidth="md" fullWidth>
//         <DialogTitle>
//           {postModal.post ? 'Edit Post' : 'Create New Post'}
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Title"
//                 fullWidth
//                 value={postForm.title}
//                 onChange={(e) => setPostForm(prev => ({ ...prev, title: e.target.value }))}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Content"
//                 fullWidth
//                 multiline
//                 rows={4}
//                 value={postForm.content}
//                 onChange={(e) => setPostForm(prev => ({ ...prev, content: e.target.value }))}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 label="Category"
//                 fullWidth
//                 value={postForm.category}
//                 onChange={(e) => setPostForm(prev => ({ ...prev, category: e.target.value }))}
//               >
//                 {categories.map((category) => (
//                   <MenuItem key={category._id} value={category._id}>
//                     {category.name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Tags (comma separated)"
//                 fullWidth
//                 value={postForm.tags}
//                 onChange={(e) => setPostForm(prev => ({ ...prev, tags: e.target.value }))}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={postForm.status === 'published'}
//                     onChange={(e) => setPostForm(prev => ({ 
//                       ...prev, 
//                       status: e.target.checked ? 'published' : 'draft' 
//                     }))}
//                   />
//                 }
//                 label="Published"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Button
//                 variant="outlined"
//                 component="label"
//                 startIcon={<ImageIcon />}
//                 fullWidth
//               >
//                 Upload Image
//                 <input
//                   type="file"
//                   hidden
//                   accept="image/*"
//                   onChange={(e) => setPostForm(prev => ({ 
//                     ...prev, 
//                     image: e.target.files?.[0] || null 
//                   }))}
//                 />
//               </Button>
//               {postForm.image && (
//                 <Typography variant="body2" sx={{ mt: 1 }}>
//                   Selected: {postForm.image.name}
//                 </Typography>
//               )}
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => openPostModal(null)}>Cancel</Button>
//           <Button 
//             onClick={postModal.post ? handleUpdatePost : handleCreatePost}
//             variant="contained"
//           >
//             {postModal.post ? 'Update' : 'Create'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Confirmation Modal */}
//       <Dialog open={deleteModal.open} onClose={() => openDeleteModal('', '', '')}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to delete {deleteModal.type} "{deleteModal.name}"?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => openDeleteModal('', '', '')}>
//             Cancel
//           </Button>
//           <Button 
//             onClick={
//               deleteModal.type === 'post' ? handleDeletePost : 
//               deleteModal.type === 'category' ? handleDeleteCategory : 
//               handleDeleteUser
//             }
//             color="error"
//             variant="contained"
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default Dashboard;

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Chip,
  Tab,
  Tabs,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Switch,
  FormControlLabel,
  Avatar,
  LinearProgress,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Category as CategoryIcon,
  PostAdd as PostAddIcon,
  People as PeopleIcon,
  Comment as CommentIcon,
  ThumbUp as ThumbUpIcon,
  BarChart as BarChartIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import { useDashboard } from "../hooks/DashboardHooks";
import TabPanel from "../components/TabPanel";
import OverviewTab from "../components/OverviewTab";
import PostsManagementTab from "../components/PostsManagementTab";
import CategoriesTab from "../components/CategoriesTab";
import UsersManagementTab from "../components/UsersManagementTab";
import { validatePost } from "../utils/validationSchemas";

// Interface for form errors
interface PostFormErrors {
  title?: string;
  content?: string;
  category?: string;
  tags?: string;
  status?: string;
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const {
    // State
    tabValue,
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
    user: currentUser,
    
    // Setters
    setTabValue,
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
  } = useDashboard();

  // State for form errors
  const [postFormErrors, setPostFormErrors] = React.useState<PostFormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Validate post form
  const validatePostForm = (): boolean => {
    const validation = validatePost({
      title: postForm.title,
      content: postForm.content,
      category: postForm.category,
      tags: postForm.tags,
      status: postForm.status,
    });

    if (!validation.success) {
      const errors: PostFormErrors = {};
      validation.error.issues.forEach((issue) => {
        errors[issue.path[0] as keyof PostFormErrors] = issue.message;
      });
      setPostFormErrors(errors);
      return false;
    }

    setPostFormErrors({});
    return true;
  };

  // Handle post submission with validation
  const handlePostSubmit = async () => {
    if (!validatePostForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (postModal.post) {
        await handleUpdatePost();
      } else {
        await handleCreatePost();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset errors when modal opens/closes
  React.useEffect(() => {
    if (!postModal.open) {
      setPostFormErrors({});
    }
  }, [postModal.open]);

  // Handle field changes with validation
  const handlePostFieldChange = (field: keyof typeof postForm, value: string) => {
    setPostForm(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (postFormErrors[field as keyof PostFormErrors]) {
      setPostFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <LinearProgress />
        <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
          Loading Dashboard...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
          Admin Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Welcome back, {currentUser?.name}! Manage your platform efficiently.
        </Typography>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <PeopleIcon sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h4" gutterBottom>{stats.totalUsers}</Typography>
            <Typography variant="h6">Total Users</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'secondary.main', color: 'white' }}>
            <PostAddIcon sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h4" gutterBottom>{stats.totalPosts}</Typography>
            <Typography variant="h6">Total Posts</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'success.main', color: 'white' }}>
            <CommentIcon sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h4" gutterBottom>{stats.totalComments}</Typography>
            <Typography variant="h6">Total Comments</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'warning.main', color: 'white' }}>
            <ThumbUpIcon sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h4" gutterBottom>{stats.totalLikes}</Typography>
            <Typography variant="h6">Total Likes</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs Navigation */}
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab icon={<BarChartIcon />} label="Overview" />
          <Tab icon={<PostAddIcon />} label="Posts Management" />
          <Tab icon={<CategoryIcon />} label="Categories" />
          <Tab icon={<PeopleIcon />} label="Users Management" />
        </Tabs>
      </Paper>

      {/* Messages */}
      {message.text && (
        <Alert 
          severity={message.type as any} 
          sx={{ mb: 2 }}
          onClose={clearMessage}
        >
          {message.text}
        </Alert>
      )}

      {/* Tab Panels */}
      <Paper>
        <TabPanel value={tabValue} index={0}>
          <OverviewTab 
            posts={posts}
            openPostModal={openPostModal}
            openCategoryModal={openCategoryModal}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <PostsManagementTab 
            posts={posts}
            page={page}
            rowsPerPage={rowsPerPage}
            openPostModal={openPostModal}
            openDeleteModal={openDeleteModal}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <CategoriesTab 
            categories={categories}
            posts={posts}
            openCategoryModal={openCategoryModal}
            openDeleteModal={openDeleteModal}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <UsersManagementTab 
            users={users}
            usersPage={usersPage}
            usersRowsPerPage={usersRowsPerPage}
            usersTotal={usersTotal}
            currentUser={currentUser}
            handleUpdateUserRole={handleUpdateUserRole}
            openDeleteModal={openDeleteModal}
            setUsersPage={setUsersPage}
            setUsersRowsPerPage={setUsersRowsPerPage}
          />
        </TabPanel>
      </Paper>

      {/* Category Modal */}
      <Dialog open={categoryModal.open} onClose={() => openCategoryModal(null)}>
        <DialogTitle>
          {categoryModal.category ? 'Edit Category' : 'Create New Category'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            fullWidth
            variant="outlined"
            value={categoryForm.name}
            onChange={(e) => setCategoryForm({ name: e.target.value })}
            error={!categoryForm.name}
            helperText={!categoryForm.name ? "Category name is required" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => openCategoryModal(null)}>Cancel</Button>
          <Button 
            onClick={categoryModal.category ? handleUpdateCategory : handleCreateCategory}
            variant="contained"
            disabled={!categoryForm.name}
          >
            {categoryModal.category ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Post Modal with Validation */}
      <Dialog open={postModal.open} onClose={() => openPostModal(null)} maxWidth="md" fullWidth>
        <DialogTitle>
          {postModal.post ? 'Edit Post' : 'Create New Post'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                value={postForm.title}
                onChange={(e) => handlePostFieldChange('title', e.target.value)}
                error={!!postFormErrors.title}
                helperText={postFormErrors.title || "Minimum 3 characters required"}
                placeholder="Enter post title"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Content"
                fullWidth
                multiline
                rows={4}
                value={postForm.content}
                onChange={(e) => handlePostFieldChange('content', e.target.value)}
                error={!!postFormErrors.content}
                helperText={postFormErrors.content || "Minimum 10 characters required"}
                placeholder="Write your post content here..."
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Category"
                fullWidth
                value={postForm.category}
                onChange={(e) => handlePostFieldChange('category', e.target.value)}
                error={!!postFormErrors.category}
                helperText={postFormErrors.category}
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
                value={postForm.tags}
                onChange={(e) => handlePostFieldChange('tags', e.target.value)}
                error={!!postFormErrors.tags}
                helperText={postFormErrors.tags || "Separate tags with commas"}
                placeholder="technology, programming, web"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={postForm.status === 'published'}
                    onChange={(e) => setPostForm(prev => ({ 
                      ...prev, 
                      status: e.target.checked ? 'published' : 'draft' 
                    }))}
                  />
                }
                label="Published"
              />
              <FormHelperText>
                {postForm.status === 'published' ? 'Post will be visible to everyone' : 'Post will be saved as draft'}
              </FormHelperText>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<ImageIcon />}
                fullWidth
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setPostForm(prev => ({ 
                    ...prev, 
                    image: e.target.files?.[0] || null 
                  }))}
                />
              </Button>
              {postForm.image && (
                <Typography variant="body2" sx={{ mt: 1, color: 'success.main' }}>
                  ✓ Selected: {postForm.image.name}
                </Typography>
              )}
              <FormHelperText>
                Optional: Upload a featured image for your post
              </FormHelperText>
            </Grid>

            {/* Validation Summary */}
            {Object.keys(postFormErrors).length > 0 && (
              <Grid item xs={12}>
                <Alert severity="error" sx={{ mt: 1 }}>
                  Please fix the errors above before submitting.
                </Alert>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => openPostModal(null)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handlePostSubmit}
            variant="contained"
            disabled={isSubmitting || Object.keys(postFormErrors).length > 0}
            startIcon={isSubmitting ? <LinearProgress size={20} /> : null}
          >
            {isSubmitting ? 'Saving...' : (postModal.post ? 'Update Post' : 'Create Post')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModal.open} onClose={() => openDeleteModal('', '', '')}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {deleteModal.type} "{deleteModal.name}"?
            {deleteModal.type === 'user' && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                Note: All posts by this user will also be deleted.
              </Typography>
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => openDeleteModal('', '', '')}>
            Cancel
          </Button>
          <Button 
            onClick={
              deleteModal.type === 'post' ? handleDeletePost : 
              deleteModal.type === 'category' ? handleDeleteCategory : 
              handleDeleteUser
            }
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;