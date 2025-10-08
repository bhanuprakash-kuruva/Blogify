// import React, { useContext, useEffect, useState } from "react";
// import {
//   Container,
//   Box,
//   Typography,
//   Paper,
//   useTheme,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Chip,
//   Avatar,
//   Stack,
//   Button,
//   Tabs,
//   Tab,
//   CircularProgress,
//   IconButton,
//   Divider,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Snackbar,
//   alpha,
// } from "@mui/material";
// import {
//   Bookmark,
//   Favorite,
//   Edit,
//   Visibility,
//   BookmarkBorder,
//   FavoriteBorder,
//   Person,
//   Email,
//   AdminPanelSettings,
//   CalendarToday,
//   BookmarkAdded,
//   ThumbUp,
// } from "@mui/icons-material";
// import { AuthContext } from "../Context/AuthContext";
// import { motion } from "framer-motion";
// import axios from "axios";

// interface Post {
//   _id: string;
//   title: string;
//   content: string;
//   category: { _id: string; name: string };
//   author: { _id: string; name: string; email: string; role: string };
//   imageUrl?: string;
//   tags?: string[];
//   status: "draft" | "published";
//   likes: string[];
//   dislikes: string[];
//   createdAt: string;
// }

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// const BASE_URL = import.meta.env.VITE_BASE_URL;

// const MotionCard = motion(Card);

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`profile-tabpanel-${index}`}
//       aria-labelledby={`profile-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// const Profile: React.FC = () => {
//   const { user } = useContext(AuthContext);
//   const theme = useTheme();
//   const token = user?.token;
//   const [tabValue, setTabValue] = useState(0);
//   const [bookmarks, setBookmarks] = useState<Post[]>([]);
//   const [likedPosts, setLikedPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
//   const [editOpen, setEditOpen] = useState(false);
//   const [editForm, setEditForm] = useState({
//     name: user?.name || "",
//     email: user?.email || "",
//   });
//   const [editLoading, setEditLoading] = useState(false);

//   const showSnackbar = (message: string, severity: "success" | "error" = "success") => {
//     setSnackbar({ open: true, message, severity });
//   };

//   useEffect(() => {
//     if (user && token) {
//       fetchUserData();
//     }
//   }, [user, token, tabValue]);

//   const fetchUserData = async () => {
//     if (!token) return;
    
//     setLoading(true);
//     setError(null);
//     try {
//       const [bookmarksRes, likedRes] = await Promise.all([
//         axios.get(`${BASE_URL}posts/bookmarks/my`, {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//         axios.get(`${BASE_URL}posts/liked-posts/my`, {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//       ]);
      
//       setBookmarks(bookmarksRes.data.bookmarks || []);
//       setLikedPosts(likedRes.data.likedPosts || []);
//     } catch (err: any) {
//       const errorMessage = err.response?.data?.message || "Failed to fetch data";
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue);
//   };

//   const handleEditOpen = () => {
//     setEditForm({
//       name: user?.name || "",
//       email: user?.email || "",
//     });
//     setEditOpen(true);
//   };

//   // In your profile component
// const handleEditSave = async () => {
//   if (!token || !user) return;
  
//   setEditLoading(true);
//   try {
//     const response = await axios.put(
//       `${BASE_URL}users/profile`,
//       editForm,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
    
//     // Update your context or state with new user data
//     setEditOpen(false);
//     showSnackbar("Profile updated successfully!");
    
//   } catch (err: any) {
//     const errorMessage = err.response?.data?.message || "Failed to update profile";
//     showSnackbar(errorMessage, "error");
//   } finally {
//     setEditLoading(false);
//   }
// };

//   const handleRemoveBookmark = async (postId: string) => {
//     if (!token) return;
    
//     try {
//       await axios.post(
//         `${BASE_URL}posts/bookmark/${postId}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
      
//       setBookmarks(prev => prev.filter(post => post._id !== postId));
//       showSnackbar("Bookmark removed successfully!");
      
//     } catch (err: any) {
//       const errorMessage = err.response?.data?.message || "Failed to remove bookmark";
//       showSnackbar(errorMessage, "error");
//     }
//   };

//   const handleUnlikePost = async (postId: string) => {
//     if (!token) return;
    
//     try {
//       await axios.post(
//         `${BASE_URL}posts/like/${postId}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
      
//       setLikedPosts(prev => prev.filter(post => post._id !== postId));
//       showSnackbar("Post unliked successfully!");
      
//     } catch (err: any) {
//       const errorMessage = err.response?.data?.message || "Failed to unlike post";
//       showSnackbar(errorMessage, "error");
//     }
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return 'N/A';
    
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//       });
//     } catch (error) {
//       return 'Invalid Date';
//     }
//   };

//   const userName = user?.name || 'Unknown User';
//   const userEmail = user?.email || 'No email';
//   const userRole = user?.role || 'user';
//   const userCreatedAt = user?.createdAt;

//   if (!user) {
//     return (
//       <Container maxWidth="sm">
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
//           <Typography variant="h6" align="center" color="text.secondary">
//             Please log in to view your profile
//           </Typography>
//         </Box>
//       </Container>
//     );
//   }

//   const stats = {
//     bookmarksCount: bookmarks.length,
//     likedPostsCount: likedPosts.length,
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 6 }}>
//       {error && (
//         <Alert 
//           severity="error" 
//           sx={{ mb: 3, borderRadius: 2 }}
//           onClose={() => setError(null)}
//         >
//           {error}
//         </Alert>
//       )}

//       <Grid container spacing={4}>
//         {/* Sidebar - User Info */}
//         <Grid item xs={12} md={4}>
//           <Paper
//             elevation={0}
//             sx={{
//               p: 4,
//               borderRadius: 4,
//               background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
//               border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//               backdropFilter: 'blur(10px)',
//               position: 'sticky',
//               top: 100,
//             }}
//           >
//             <Stack alignItems="center" spacing={3}>
//               <Avatar
//                 sx={{
//                   width: 120,
//                   height: 120,
//                   bgcolor: theme.palette.primary.main,
//                   fontSize: '2.5rem',
//                   fontWeight: 'bold',
//                   border: `4px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                 }}
//               >
//                 {userName.charAt(0).toUpperCase()}
//               </Avatar>

//               <Box textAlign="center">
//                 <Typography variant="h5" gutterBottom fontWeight="600">
//                   {userName}
//                 </Typography>
//                 <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
//                   <Email fontSize="small" sx={{ color: 'text.secondary' }} />
//                   <Typography variant="body2" color="text.secondary">
//                     {userEmail}
//                   </Typography>
//                 </Stack>
//                 <Chip 
//                   icon={<AdminPanelSettings />}
//                   label={userRole.toUpperCase()}
//                   color={userRole === 'admin' ? 'primary' : 'default'}
//                   size="small"
//                   variant="filled"
//                   sx={{ fontWeight: 500 }}
//                 />
//               </Box>

//               <Button
//                 variant="outlined"
//                 startIcon={<Edit />}
//                 onClick={handleEditOpen}
//                 fullWidth
//                 sx={{ 
//                   borderRadius: 3,
//                   py: 1,
//                   textTransform: 'none',
//                   fontWeight: 500,
//                 }}
//               >
//                 Edit Profile
//               </Button>
//             </Stack>

//             <Divider sx={{ my: 3 }} />

//             <Stack spacing={2.5}>
//               <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
//                 Activity Overview
//               </Typography>
              
//               <Paper 
//                 variant="outlined" 
//                 sx={{ 
//                   p: 2, 
//                   borderRadius: 3,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   background: alpha(theme.palette.primary.main, 0.02),
//                 }}
//               >
//                 <Stack direction="row" spacing={1.5} alignItems="center">
//                   <BookmarkAdded color="primary" />
//                   <Typography variant="body2" fontWeight="500">Bookmarks</Typography>
//                 </Stack>
//                 <Chip label={stats.bookmarksCount} size="small" color="primary" variant="filled" />
//               </Paper>

//               <Paper 
//                 variant="outlined" 
//                 sx={{ 
//                   p: 2, 
//                   borderRadius: 3,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   background: alpha(theme.palette.secondary.main, 0.02),
//                 }}
//               >
//                 <Stack direction="row" spacing={1.5} alignItems="center">
//                   <ThumbUp color="secondary" />
//                   <Typography variant="body2" fontWeight="500">Liked Posts</Typography>
//                 </Stack>
//                 <Chip label={stats.likedPostsCount} size="small" color="secondary" variant="filled" />
//               </Paper>

//               <Paper 
//                 variant="outlined" 
//                 sx={{ 
//                   p: 2, 
//                   borderRadius: 3,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <Stack direction="row" spacing={1.5} alignItems="center">
//                   <CalendarToday sx={{ color: 'text.secondary' }} />
//                   <Typography variant="body2" fontWeight="500">Member Since</Typography>
//                 </Stack>
//                 <Typography variant="caption" color="text.secondary" fontWeight="500">
//                   {formatDate(userCreatedAt)}
//                 </Typography>
//               </Paper>
//             </Stack>
//           </Paper>
//         </Grid>

//         {/* Main Content */}
//         <Grid item xs={12} md={8}>
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: 4,
//               border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//               overflow: 'hidden',
//               background: theme.palette.background.paper,
//             }}
//           >
//             <Box sx={{ 
//               borderBottom: 1, 
//               borderColor: 'divider',
//               background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, transparent 100%)`,
//             }}>
//               <Tabs 
//                 value={tabValue} 
//                 onChange={handleTabChange}
//                 variant="scrollable"
//                 scrollButtons="auto"
//                 sx={{
//                   '& .MuiTab-root': {
//                     textTransform: 'none',
//                     fontWeight: 500,
//                     fontSize: '0.95rem',
//                     py: 2,
//                     minHeight: 'auto',
//                   }
//                 }}
//               >
//                 <Tab 
//                   icon={<Person />} 
//                   label="Profile Overview" 
//                   iconPosition="start"
//                 />
//                 <Tab 
//                   icon={<Bookmark />} 
//                   label={`Bookmarks (${stats.bookmarksCount})`}
//                   iconPosition="start"
//                 />
//                 <Tab 
//                   icon={<Favorite />} 
//                   label={`Liked Posts (${stats.likedPostsCount})`}
//                   iconPosition="start"
//                 />
//               </Tabs>
//             </Box>

//             <Box sx={{ p: 4 }}>
//               {/* Profile Info Tab */}
//               <TabPanel value={tabValue} index={0}>
//                 <Stack spacing={4}>
//                   <Box>
//                     <Typography variant="h5" gutterBottom fontWeight="600" sx={{ mb: 3 }}>
//                       Personal Information
//                     </Typography>
//                     <Grid container spacing={3}>
//                       <Grid item xs={12} sm={6}>
//                         <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight="500">
//                           Full Name
//                         </Typography>
//                         <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
//                           <Typography variant="body1" fontWeight="500">
//                             {userName}
//                           </Typography>
//                         </Paper>
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                         <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight="500">
//                           Email Address
//                         </Typography>
//                         <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
//                           <Typography variant="body1" fontWeight="500">
//                             {userEmail}
//                           </Typography>
//                         </Paper>
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                         <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight="500">
//                           Account Role
//                         </Typography>
//                         <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
//                           <Chip 
//                             label={userRole} 
//                             color={userRole === 'admin' ? 'primary' : 'default'}
//                             size="small"
//                             sx={{ fontWeight: 500 }}
//                           />
//                         </Paper>
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                         <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight="500">
//                           Member Since
//                         </Typography>
//                         <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
//                           <Typography variant="body1" fontWeight="500">
//                             {formatDate(userCreatedAt)}
//                           </Typography>
//                         </Paper>
//                       </Grid>
//                     </Grid>
//                   </Box>

//                   <Box>
//                     <Typography variant="h5" gutterBottom fontWeight="600" sx={{ mb: 3 }}>
//                       Activity Summary
//                     </Typography>
//                     <Grid container spacing={3}>
//                       <Grid item xs={12} sm={6}>
//                         <Paper 
//                           sx={{ 
//                             p: 3, 
//                             textAlign: 'center', 
//                             borderRadius: 3,
//                             background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 100%)`,
//                             border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                           }}
//                         >
//                           <Bookmark fontSize="large" color="primary" />
//                           <Typography variant="h4" sx={{ mt: 1, mb: 0.5 }} fontWeight="600">
//                             {stats.bookmarksCount}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary" fontWeight="500">
//                             Saved Bookmarks
//                           </Typography>
//                         </Paper>
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                         <Paper 
//                           sx={{ 
//                             p: 3, 
//                             textAlign: 'center', 
//                             borderRadius: 3,
//                             background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 100%)`,
//                             border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
//                           }}
//                         >
//                           <Favorite fontSize="large" color="secondary" />
//                           <Typography variant="h4" sx={{ mt: 1, mb: 0.5 }} fontWeight="600">
//                             {stats.likedPostsCount}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary" fontWeight="500">
//                             Liked Posts
//                           </Typography>
//                         </Paper>
//                       </Grid>
//                     </Grid>
//                   </Box>
//                 </Stack>
//               </TabPanel>

//               {/* Bookmarks Tab */}
//               <TabPanel value={tabValue} index={1}>
//                 {loading ? (
//                   <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
//                     <CircularProgress />
//                   </Box>
//                 ) : bookmarks.length === 0 ? (
//                   <Box sx={{ textAlign: 'center', py: 8 }}>
//                     <Bookmark 
//                       sx={{ 
//                         fontSize: 80, 
//                         mb: 2, 
//                         color: alpha(theme.palette.text.secondary, 0.3) 
//                       }} 
//                     />
//                     <Typography variant="h6" gutterBottom fontWeight="500">
//                       No Bookmarks Yet
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                       Start saving your favorite posts to access them quickly
//                     </Typography>
//                     <Button 
//                       variant="contained" 
//                       href="/blogs"
//                       sx={{ borderRadius: 3, textTransform: 'none', px: 3 }}
//                     >
//                       Discover Posts
//                     </Button>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={3}>
//                     {bookmarks.map((post, index) => (
//                       <Grid item xs={12} key={post._id}>
//                         <MotionCard
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.4, delay: index * 0.1 }}
//                           sx={{
//                             display: 'flex',
//                             flexDirection: { xs: 'column', sm: 'row' },
//                             borderRadius: 3,
//                             overflow: 'hidden',
//                             border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//                             '&:hover': {
//                               boxShadow: theme.shadows[8],
//                               transform: 'translateY(-4px)',
//                               transition: 'all 0.3s ease-in-out'
//                             }
//                           }}
//                         >
//                           {post.imageUrl && (
//                             <CardMedia
//                               component="img"
//                               sx={{ 
//                                 width: { xs: '100%', sm: 200 },
//                                 height: { xs: 200, sm: 'auto' },
//                                 objectFit: 'cover'
//                               }}
//                               image={post.imageUrl}
//                               alt={post.title}
//                             />
//                           )}
//                           <CardContent sx={{ 
//                             flex: 1, 
//                             display: 'flex', 
//                             flexDirection: 'column',
//                             p: 3,
//                           }}>
//                             <Box sx={{ flex: 1 }}>
//                               <Typography variant="h6" gutterBottom fontWeight="600">
//                                 {post.title}
//                               </Typography>
//                               <Typography 
//                                 variant="body2" 
//                                 color="text.secondary" 
//                                 sx={{ 
//                                   mb: 2,
//                                   display: '-webkit-box',
//                                   WebkitLineClamp: 2,
//                                   WebkitBoxOrient: 'vertical',
//                                   overflow: 'hidden',
//                                   lineHeight: 1.5,
//                                 }}
//                               >
//                                 {post.content.replace(/<[^>]*>/g, '')}
//                               </Typography>
//                               <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap" gap={0.5}>
//                                 {post.tags?.slice(0, 3).map((tag, idx) => (
//                                   <Chip 
//                                     key={idx} 
//                                     label={tag} 
//                                     size="small" 
//                                     variant="outlined" 
//                                     sx={{ fontWeight: 400 }}
//                                   />
//                                 ))}
//                               </Stack>
//                             </Box>
//                             <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
//                               <Button 
//                                 size="small" 
//                                 href={`/post/${post._id}`}
//                                 startIcon={<Visibility />}
//                                 sx={{ 
//                                   textTransform: 'none',
//                                   borderRadius: 2,
//                                   fontWeight: 500,
//                                 }}
//                               >
//                                 Read Article
//                               </Button>
//                               <IconButton 
//                                 size="small" 
//                                 onClick={() => handleRemoveBookmark(post._id)}
//                                 title="Remove bookmark"
//                                 sx={{
//                                   color: theme.palette.error.main,
//                                   '&:hover': {
//                                     backgroundColor: alpha(theme.palette.error.main, 0.1),
//                                   }
//                                 }}
//                               >
//                                 <BookmarkBorder />
//                               </IconButton>
//                             </Stack>
//                           </CardContent>
//                         </MotionCard>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </TabPanel>

//               {/* Liked Posts Tab */}
//               <TabPanel value={tabValue} index={2}>
//                 {loading ? (
//                   <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
//                     <CircularProgress />
//                   </Box>
//                 ) : likedPosts.length === 0 ? (
//                   <Box sx={{ textAlign: 'center', py: 8 }}>
//                     <Favorite 
//                       sx={{ 
//                         fontSize: 80, 
//                         mb: 2, 
//                         color: alpha(theme.palette.text.secondary, 0.3) 
//                       }} 
//                     />
//                     <Typography variant="h6" gutterBottom fontWeight="500">
//                       No Liked Posts Yet
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                       Like posts that inspire you to build your collection
//                     </Typography>
//                     <Button 
//                       variant="contained" 
//                       href="/blogs"
//                       sx={{ borderRadius: 3, textTransform: 'none', px: 3 }}
//                     >
//                       Explore Content
//                     </Button>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={3}>
//                     {likedPosts.map((post, index) => (
//                       <Grid item xs={12} sm={6} key={post._id}>
//                         <MotionCard
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.4, delay: index * 0.1 }}
//                           sx={{
//                             height: '100%',
//                             display: 'flex',
//                             flexDirection: 'column',
//                             borderRadius: 3,
//                             overflow: 'hidden',
//                             border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//                             '&:hover': {
//                               boxShadow: theme.shadows[8],
//                               transform: 'translateY(-4px)',
//                               transition: 'all 0.3s ease-in-out'
//                             }
//                           }}
//                         >
//                           {post.imageUrl && (
//                             <CardMedia
//                               component="img"
//                               height="160"
//                               image={post.imageUrl}
//                               alt={post.title}
//                               sx={{ objectFit: 'cover' }}
//                             />
//                           )}
//                           <CardContent sx={{ 
//                             flex: 1, 
//                             display: 'flex', 
//                             flexDirection: 'column',
//                             p: 3,
//                           }}>
//                             <Box sx={{ flex: 1 }}>
//                               <Typography variant="h6" gutterBottom fontWeight="600" sx={{ lineHeight: 1.3 }}>
//                                 {post.title}
//                               </Typography>
//                               <Typography 
//                                 variant="body2" 
//                                 color="text.secondary" 
//                                 sx={{ 
//                                   mb: 2,
//                                   display: '-webkit-box',
//                                   WebkitLineClamp: 3,
//                                   WebkitBoxOrient: 'vertical',
//                                   overflow: 'hidden',
//                                   lineHeight: 1.5,
//                                 }}
//                               >
//                                 {post.content.replace(/<[^>]*>/g, '')}
//                               </Typography>
//                             </Box>
//                             <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
//                               <Button 
//                                 size="small" 
//                                 href={`/post/${post._id}`}
//                                 startIcon={<Visibility />}
//                                 sx={{ 
//                                   textTransform: 'none',
//                                   borderRadius: 2,
//                                   fontWeight: 500,
//                                 }}
//                               >
//                                 Read More
//                               </Button>
//                               <IconButton 
//                                 size="small" 
//                                 onClick={() => handleUnlikePost(post._id)}
//                                 title="Unlike post"
//                                 sx={{
//                                   color: theme.palette.error.main,
//                                   '&:hover': {
//                                     backgroundColor: alpha(theme.palette.error.main, 0.1),
//                                   }
//                                 }}
//                               >
//                                 <Favorite />
//                               </IconButton>
//                             </Stack>
//                           </CardContent>
//                         </MotionCard>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </TabPanel>
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Edit Profile Dialog */}
//       <Dialog 
//         open={editOpen} 
//         onClose={() => setEditOpen(false)} 
//         maxWidth="sm" 
//         fullWidth
//         PaperProps={{
//           sx: { borderRadius: 4 }
//         }}
//       >
//         <DialogTitle sx={{ pb: 2 }}>
//           <Typography variant="h5" fontWeight="600">
//             Edit Profile
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Update your personal information
//           </Typography>
//         </DialogTitle>
//         <DialogContent>
//           <Stack spacing={3} sx={{ mt: 1 }}>
//             <TextField
//               label="Full Name"
//               fullWidth
//               value={editForm.name}
//               onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
//               disabled={editLoading}
//               variant="outlined"
//               sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
//             />
//             <TextField
//               label="Email Address"
//               fullWidth
//               type="email"
//               value={editForm.email}
//               onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
//               disabled={editLoading}
//               variant="outlined"
//               sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
//             />
//           </Stack>
//         </DialogContent>
//         <DialogActions sx={{ p: 3, pt: 1 }}>
//           <Button 
//             onClick={() => setEditOpen(false)}
//             disabled={editLoading}
//             sx={{ 
//               textTransform: 'none',
//               borderRadius: 2,
//               px: 3,
//             }}
//           >
//             Cancel
//           </Button>
//           <Button 
//             variant="contained" 
//             onClick={handleEditSave}
//             disabled={editLoading || !editForm.name.trim() || !editForm.email.trim()}
//             startIcon={editLoading ? <CircularProgress size={16} /> : null}
//             sx={{ 
//               textTransform: 'none',
//               borderRadius: 2,
//               px: 3,
//               fontWeight: 500,
//             }}
//           >
//             {editLoading ? 'Saving...' : 'Save Changes'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//       >
//         <Alert 
//           severity={snackbar.severity} 
//           onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
//           sx={{ borderRadius: 2 }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default Profile;

import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  useTheme,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  Stack,
  Button,
  Tabs,
  Tab,
  CircularProgress,
  IconButton,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  alpha,
  Fade,
} from "@mui/material";
import {
  Bookmark,
  Favorite,
  Edit,
  BookmarkBorder,
  FavoriteBorder,
  Email,
  CalendarToday,
  MoreHoriz,
  Visibility,
} from "@mui/icons-material";
import { AuthContext } from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface Post {
  _id: string;
  title: string;
  content: string;
  category: { _id: string; name: string };
  author: { _id: string; name: string; email: string; role: string };
  imageUrl?: string;
  tags?: string[];
  status: "draft" | "published";
  likes: string[];
  dislikes: string[];
  createdAt: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

const MotionCard = motion(Card);
const MotionGrid = motion(Grid);
const MotionBox = motion(Box);

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      <AnimatePresence mode="wait">
        {value === index && (
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            sx={{ py: 3 }}
          >
            {children}
          </MotionBox>
        )}
      </AnimatePresence>
    </div>
  );
}

const Profile: React.FC = () => {
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const token = user?.token;
  const [tabValue, setTabValue] = useState(0);
  const [bookmarks, setBookmarks] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [editLoading, setEditLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const showSnackbar = (message: string, severity: "success" | "error" = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    if (user && token) {
      fetchUserData();
    }
  }, [user, token, tabValue]);

  const fetchUserData = async () => {
    if (!token) return;
    
    setLoading(true);
    setError(null);
    try {
      const [bookmarksRes, likedRes] = await Promise.all([
        axios.get(`${BASE_URL}posts/bookmarks/my`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${BASE_URL}posts/liked-posts/my`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      
      setBookmarks(bookmarksRes.data.bookmarks || []);
      setLikedPosts(likedRes.data.likedPosts || []);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to fetch data";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditOpen = () => {
    setEditForm({
      name: user?.name || "",
      email: user?.email || "",
    });
    setEditOpen(true);
  };

  const handleEditSave = async () => {
    if (!token || !user) return;
    
    setEditLoading(true);
    try {
      await axios.put(
        `${BASE_URL}users/profile`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setEditOpen(false);
      showSnackbar("Profile updated successfully!");
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to update profile";
      showSnackbar(errorMessage, "error");
    } finally {
      setEditLoading(false);
    }
  };

  const handleRemoveBookmark = async (postId: string) => {
    if (!token) return;
    
    try {
      await axios.post(
        `${BASE_URL}posts/bookmark/${postId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setBookmarks(prev => prev.filter(post => post._id !== postId));
      showSnackbar("Bookmark removed successfully!");
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to remove bookmark";
      showSnackbar(errorMessage, "error");
    }
  };

  const handleUnlikePost = async (postId: string) => {
    if (!token) return;
    
    try {
      await axios.post(
        `${BASE_URL}posts/like/${postId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setLikedPosts(prev => prev.filter(post => post._id !== postId));
      showSnackbar("Post unliked successfully!");
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to unlike post";
      showSnackbar(errorMessage, "error");
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const userName = user?.name || 'Unknown User';
  const userEmail = user?.email || 'No email';
  const userRole = user?.role || 'user';
  const userCreatedAt = user?.createdAt;

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Typography variant="h6" align="center" color="text.secondary">
            Please log in to view your profile
          </Typography>
        </Box>
      </Container>
    );
  }

  const stats = [
    { label: "Bookmarks", value: bookmarks.length, icon: Bookmark, color: "primary" },
    { label: "Liked Posts", value: likedPosts.length, icon: Favorite, color: "secondary" },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Error Alert */}
      <AnimatePresence>
        {error && (
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Alert 
              severity="error" 
              sx={{ mb: 3, borderRadius: 2 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          </MotionBox>
        )}
      </AnimatePresence>

      {/* Profile Header */}
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            borderRadius: 4,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
            backdropFilter: 'blur(10px)',
          }}
        >
          <Grid container spacing={4} alignItems="center">
            {/* Avatar Section */}
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  sx={{
                    width: { xs: 100, md: 120 },
                    height: { xs: 100, md: 120 },
                    bgcolor: theme.palette.primary.main,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    fontWeight: 'bold',
                    border: `3px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
                  }}
                >
                  {userName.charAt(0).toUpperCase()}
                </Avatar>
              </Box>
            </Grid>

            {/* User Info Section */}
            <Grid item xs={12} md={8}>
              <Stack spacing={3}>
                {/* Name and Actions */}
                <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" sx={{ gap: 2 }}>
                  <Typography variant="h4" fontWeight="700" sx={{ color: 'text.primary' }}>
                    {userName}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Edit />}
                      onClick={handleEditOpen}
                      sx={{ 
                        borderRadius: 3,
                        textTransform: 'none',
                        fontWeight: 500,
                        px: 2,
                      }}
                    >
                      Edit
                    </Button>
                    <IconButton 
                      size="small" 
                      sx={{ 
                        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                        borderRadius: 2,
                      }}
                    >
                      <MoreHoriz />
                    </IconButton>
                  </Stack>
                </Stack>

                {/* Stats */}
                <Stack direction="row" spacing={4}>
                  {stats.map((stat, index) => (
                    <MotionBox
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" fontWeight="700" color={`${stat.color}.main`}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </MotionBox>
                  ))}
                </Stack>

                {/* User Details */}
                <Stack spacing={1.5}>
                  <Typography variant="body1" color="text.primary" fontWeight="500">
                    {userName}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" sx={{ gap: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Email fontSize="small" sx={{ color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {userEmail}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CalendarToday fontSize="small" sx={{ color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        Joined {formatDate(userCreatedAt)}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Chip 
                    label={userRole.toUpperCase()}
                    color={userRole === 'admin' ? 'primary' : 'default'}
                    size="small"
                    variant="filled"
                    sx={{ 
                      fontWeight: 600,
                      borderRadius: 2,
                      alignSelf: 'flex-start'
                    }}
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </MotionBox>

      {/* Content Tabs */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
            background: theme.palette.background.paper,
            overflow: 'hidden',
          }}
        >
          {/* Tabs Header */}
          <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, transparent 100%)`,
          }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  py: 3,
                  minHeight: 'auto',
                  color: 'text.secondary',
                  '&.Mui-selected': {
                    color: 'primary.main',
                  },
                },
                '& .MuiTabs-indicator': {
                  height: 3,
                  backgroundColor: 'primary.main',
                  borderRadius: 2,
                }
              }}
            >
              <Tab 
                icon={<Bookmark />} 
                label={`Bookmarks (${bookmarks.length})`}
                iconPosition="start"
              />
              <Tab 
                icon={<Favorite />} 
                label={`Liked Posts (${likedPosts.length})`}
                iconPosition="start"
              />
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box sx={{ p: { xs: 2, md: 3 } }}>
            {/* Bookmarks Tab */}
            <TabPanel value={tabValue} index={0}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                  <CircularProgress size={40} />
                </Box>
              ) : bookmarks.length === 0 ? (
                <MotionBox
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  sx={{ textAlign: 'center', py: 8 }}
                >
                  <Bookmark 
                    sx={{ 
                      fontSize: 80, 
                      mb: 3, 
                      color: alpha(theme.palette.primary.main, 0.2) 
                    }} 
                  />
                  <Typography variant="h5" gutterBottom fontWeight="600" sx={{ mb: 2 }}>
                    No Bookmarks Yet
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
                    Save your favorite posts to access them quickly later
                  </Typography>
                  <Button 
                    variant="contained" 
                    href="/blogs"
                    sx={{ 
                      borderRadius: 3, 
                      textTransform: 'none', 
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                    }}
                  >
                    Explore Posts
                  </Button>
                </MotionBox>
              ) : (
                <Grid container spacing={2}>
                  {bookmarks.map((post, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={post._id}>
                      <MotionCard
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        onMouseEnter={() => setHoveredCard(post._id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        sx={{
                          position: 'relative',
                          borderRadius: 3,
                          overflow: 'hidden',
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          background: 'transparent',
                          cursor: 'pointer',
                          height: '100%',
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          minHeight: 380,
                          maxWidth: '100%',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: `0 12px 40px ${alpha(theme.palette.common.black, 0.1)}`,
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        {/* Image Container with Fixed Height */}
                        <Box sx={{ 
                          position: 'relative',
                          height: 200,
                          width: '100%',
                          overflow: 'hidden',
                          flexShrink: 0
                        }}>
                          {post.imageUrl ? (
                            <CardMedia
                              component="img"
                              image={post.imageUrl}
                              alt={post.title}
                              sx={{ 
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%',
                                transition: 'transform 0.3s ease',
                                ...(hoveredCard === post._id && {
                                  transform: 'scale(1.05)',
                                })
                              }}
                            />
                          ) : (
                            <Box
                              sx={{
                                width: '100%',
                                height: '100%',
                                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Bookmark 
                                sx={{ 
                                  fontSize: 48, 
                                  color: alpha(theme.palette.primary.main, 0.3) 
                                }} 
                              />
                            </Box>
                          )}
                          
                          {/* Hover Overlay */}
                          <Fade in={hoveredCard === post._id}>
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: `linear-gradient(0deg, ${alpha(theme.palette.common.black, 0.8)} 0%, transparent 100%)`,
                                display: 'flex',
                                alignItems: 'flex-end',
                                p: 2,
                              }}
                            >
                              <Stack spacing={1} sx={{ width: '100%' }}>
                                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                                  <Button
                                    size="small"
                                    href={`/post/${post._id}`}
                                    startIcon={<Visibility />}
                                    sx={{ 
                                      textTransform: 'none',
                                      borderRadius: 2,
                                      fontWeight: 500,
                                      color: 'white',
                                      borderColor: 'white',
                                      '&:hover': {
                                        backgroundColor: alpha(theme.palette.common.white, 0.1),
                                      }
                                    }}
                                    variant="outlined"
                                  >
                                    View
                                  </Button>
                                  <IconButton 
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveBookmark(post._id);
                                    }}
                                    sx={{
                                      color: 'white',
                                      backgroundColor: alpha(theme.palette.error.main, 0.8),
                                      '&:hover': {
                                        backgroundColor: theme.palette.error.main,
                                      }
                                    }}
                                  >
                                    <BookmarkBorder fontSize="small" />
                                  </IconButton>
                                </Stack>
                              </Stack>
                            </Box>
                          </Fade>
                        </Box>

                        {/* Content Section with Equal Height */}
                        <CardContent 
                          sx={{ 
                            p: 2.5, 
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Box>
                            <Typography 
                              variant="body1" 
                              fontWeight="600"
                              sx={{ 
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                lineHeight: 1.4,
                                mb: 1,
                                minHeight: '2.8em'
                              }}
                            >
                              {post.title}
                            </Typography>
                            {post.tags && post.tags.length > 0 && (
                              <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                                {post.tags.slice(0, 2).map((tag, idx) => (
                                  <Chip 
                                    key={idx} 
                                    label={tag} 
                                    size="small" 
                                    variant="outlined" 
                                    sx={{ 
                                      fontWeight: 400,
                                      fontSize: '0.7rem',
                                      height: 24
                                    }}
                                  />
                                ))}
                                {post.tags.length > 2 && (
                                  <Chip 
                                    label={`+${post.tags.length - 2}`} 
                                    size="small" 
                                    variant="filled"
                                    sx={{ 
                                      fontWeight: 400,
                                      fontSize: '0.7rem',
                                      height: 24
                                    }}
                                  />
                                )}
                              </Stack>
                            )}
                          </Box>
                          
                          {/* Date and Author Info */}
                          <Box sx={{ mt: 'auto', pt: 1 }}>
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ 
                                display: 'block',
                                mt: 1
                              }}
                            >
                              {formatDate(post.createdAt)}
                            </Typography>
                          </Box>
                        </CardContent>
                      </MotionCard>
                    </Grid>
                  ))}
                </Grid>
              )}
            </TabPanel>

            {/* Liked Posts Tab */}
            <TabPanel value={tabValue} index={1}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                  <CircularProgress size={40} />
                </Box>
              ) : likedPosts.length === 0 ? (
                <MotionBox
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  sx={{ textAlign: 'center', py: 8 }}
                >
                  <Favorite 
                    sx={{ 
                      fontSize: 80, 
                      mb: 3, 
                      color: alpha(theme.palette.secondary.main, 0.2) 
                    }} 
                  />
                  <Typography variant="h5" gutterBottom fontWeight="600" sx={{ mb: 2 }}>
                    No Liked Posts Yet
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
                    Like posts that inspire you to build your collection
                  </Typography>
                  <Button 
                    variant="contained" 
                    href="/blogs"
                    sx={{ 
                      borderRadius: 3, 
                      textTransform: 'none', 
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                    }}
                  >
                    Discover Content
                  </Button>
                </MotionBox>
              ) : (
                <Grid container spacing={2}>
                  {likedPosts.map((post, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={post._id}>
                      <MotionCard
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        onMouseEnter={() => setHoveredCard(post._id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        sx={{
                          position: 'relative',
                          borderRadius: 3,
                          overflow: 'hidden',
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          background: 'transparent',
                          cursor: 'pointer',
                          height: '100%',
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          minHeight: 380,
                          maxWidth: '100%',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: `0 12px 40px ${alpha(theme.palette.common.black, 0.1)}`,
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        {/* Image Container with Fixed Height */}
                        <Box sx={{ 
                          position: 'relative',
                          height: 200,
                          width: '100%',
                          overflow: 'hidden',
                          flexShrink: 0
                        }}>
                          {post.imageUrl ? (
                            <CardMedia
                              component="img"
                              image={post.imageUrl}
                              alt={post.title}
                              sx={{ 
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%',
                                transition: 'transform 0.3s ease',
                                ...(hoveredCard === post._id && {
                                  transform: 'scale(1.05)',
                                })
                              }}
                            />
                          ) : (
                            <Box
                              sx={{
                                width: '100%',
                                height: '100%',
                                background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Favorite 
                                sx={{ 
                                  fontSize: 48, 
                                  color: alpha(theme.palette.secondary.main, 0.3) 
                                }} 
                              />
                            </Box>
                          )}
                          
                          {/* Hover Overlay */}
                          <Fade in={hoveredCard === post._id}>
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: `linear-gradient(0deg, ${alpha(theme.palette.common.black, 0.8)} 0%, transparent 100%)`,
                                display: 'flex',
                                alignItems: 'flex-end',
                                p: 2,
                              }}
                            >
                              <Stack spacing={1} sx={{ width: '100%' }}>
                                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                                  <Button
                                    size="small"
                                    href={`/post/${post._id}`}
                                    startIcon={<Visibility />}
                                    sx={{ 
                                      textTransform: 'none',
                                      borderRadius: 2,
                                      fontWeight: 500,
                                      color: 'white',
                                      borderColor: 'white',
                                      '&:hover': {
                                        backgroundColor: alpha(theme.palette.common.white, 0.1),
                                      }
                                    }}
                                    variant="outlined"
                                  >
                                    View
                                  </Button>
                                  <IconButton 
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleUnlikePost(post._id);
                                    }}
                                    sx={{
                                      color: 'white',
                                      backgroundColor: alpha(theme.palette.error.main, 0.8),
                                      '&:hover': {
                                        backgroundColor: theme.palette.error.main,
                                      }
                                    }}
                                  >
                                    <Favorite fontSize="small" />
                                  </IconButton>
                                </Stack>
                              </Stack>
                            </Box>
                          </Fade>
                        </Box>

                        {/* Content Section with Equal Height */}
                        <CardContent 
                          sx={{ 
                            p: 2.5, 
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Box>
                            <Typography 
                              variant="body1" 
                              fontWeight="600"
                              sx={{ 
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                lineHeight: 1.4,
                                mb: 1,
                                minHeight: '2.8em'
                              }}
                            >
                              {post.title}
                            </Typography>
                            {post.tags && post.tags.length > 0 && (
                              <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                                {post.tags.slice(0, 2).map((tag, idx) => (
                                  <Chip 
                                    key={idx} 
                                    label={tag} 
                                    size="small" 
                                    variant="outlined" 
                                    sx={{ 
                                      fontWeight: 400,
                                      fontSize: '0.7rem',
                                      height: 24
                                    }}
                                  />
                                ))}
                                {post.tags.length > 2 && (
                                  <Chip 
                                    label={`+${post.tags.length - 2}`} 
                                    size="small" 
                                    variant="filled"
                                    sx={{ 
                                      fontWeight: 400,
                                      fontSize: '0.7rem',
                                      height: 24
                                    }}
                                  />
                                )}
                              </Stack>
                            )}
                          </Box>
                          
                          {/* Date and Author Info */}
                          <Box sx={{ mt: 'auto', pt: 1 }}>
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ 
                                display: 'block',
                                mt: 1
                              }}
                            >
                              {formatDate(post.createdAt)}
                            </Typography>
                          </Box>
                        </CardContent>
                      </MotionCard>
                    </Grid>
                  ))}
                </Grid>
              )}
            </TabPanel>
          </Box>
        </Paper>
      </MotionBox>

      {/* Edit Profile Dialog */}
      <Dialog 
        open={editOpen} 
        onClose={() => setEditOpen(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: { 
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
            backdropFilter: 'blur(20px)',
          }
        }}
      >
        <DialogTitle sx={{ pb: 2 }}>
          <Typography variant="h5" fontWeight="700">
            Edit Profile
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Update your personal information
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField
              label="Full Name"
              fullWidth
              value={editForm.name}
              onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
              disabled={editLoading}
              variant="outlined"
              size="medium"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            <TextField
              label="Email Address"
              fullWidth
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
              disabled={editLoading}
              variant="outlined"
              size="medium"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={() => setEditOpen(false)}
            disabled={editLoading}
            sx={{ 
              textTransform: 'none',
              borderRadius: 2,
              px: 3,
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleEditSave}
            disabled={editLoading || !editForm.name.trim() || !editForm.email.trim()}
            startIcon={editLoading ? <CircularProgress size={16} /> : null}
            sx={{ 
              textTransform: 'none',
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
            }}
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          sx={{ 
            borderRadius: 2,
            fontWeight: 500,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile;