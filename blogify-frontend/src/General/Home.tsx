// // src/Pages/Home.tsx
// import React, { useContext, useEffect, useState } from "react";
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Typography,
//   Button,
//   Box,
//   Chip,
//   Paper,
//   IconButton,
//   TextField,
//   InputAdornment,
//   useTheme,
// } from "@mui/material";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import SearchIcon from "@mui/icons-material/Search";
// import { AuthContext } from "../Context/AuthContext";
// import axios from "axios";

// interface Category {
//   _id: string;
//   name: string;
// }

// interface Post {
//   _id: string;
//   title: string;
//   content: string;
//   category: Category;
//   author: { _id: string; name: string; role: string };
//   imageUrl?: string;
//   tags?: string[];
//   likes: string[];
//   createdAt: string;
// }

// interface Testimonial {
//   id: number;
//   name: string;
//   feedback: string;
//   avatar?: string;
// }

// const BASE_URL = import.meta.env.VITE_BASE_URL;

// const Home: React.FC = () => {
//   const { user } = useContext(AuthContext);
//   const token = user?.token;
//   const theme = useTheme();

//   const [recentPosts, setRecentPosts] = useState<Post[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [testimonialIndex, setTestimonialIndex] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

//   const testimonials: Testimonial[] = [
//     { id: 1, name: "Alice", feedback: "Blogify is amazing! It boosted my writing skills." },
//     { id: 2, name: "Bob", feedback: "I love the clean UI and interactive dashboard." },
//     { id: 3, name: "Charlie", feedback: "The categories and tags help me organize posts perfectly." },
//   ];

//   // Fetch posts
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}posts?limit=8`, {
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//         });
//         if (res.data?.posts && Array.isArray(res.data.posts)) {
//           setRecentPosts(res.data.posts);
//           setFilteredPosts(res.data.posts);
//         }
//       } catch (err) {
//         console.error(err);
//         setRecentPosts([]);
//         setFilteredPosts([]);
//       }
//     };
//     fetchPosts();
//   }, [token]);

//   // Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}categories`, {
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//         });
//         if (Array.isArray(res.data)) setCategories(res.data);
//         else if (res.data.categories) setCategories(res.data.categories);
//       } catch (err) {
//         console.error(err);
//         setCategories([]);
//       }
//     };
//     fetchCategories();
//   }, [token]);

//   // Search
//   useEffect(() => {
//     if (!searchQuery) setFilteredPosts(recentPosts);
//     else {
//       const q = searchQuery.toLowerCase();
//       setFilteredPosts(
//         recentPosts.filter(
//           (post) =>
//             post.title.toLowerCase().includes(q) ||
//             post.content.toLowerCase().includes(q)
//         )
//       );
//     }
//   }, [searchQuery, recentPosts]);

//   // Testimonials carousel
//   const prevTestimonial = () => setTestimonialIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
//   const nextTestimonial = () => setTestimonialIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

//   const handleTagClick = (tag: string) => {
//     setFilteredPosts(recentPosts.filter((post) => post.tags?.includes(tag)));
//   };

//   const handleLike = async (postId: string) => {
//     if (!user) return;
//     try {
//       const res = await axios.post(`${BASE_URL}posts/like/${postId}`, null, {
//         headers: token ? { Authorization: `Bearer ${token}` } : {},
//       });
//       setRecentPosts((prev) =>
//         prev.map((p) => (p._id === postId ? { ...p, likes: Array(res.data.likes).fill("") } : p))
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 5 }}>
//       {/* Hero Section */}
//       <Box sx={{ textAlign: "center", mb: 6, py: 6, bgcolor: "primary.main", color: "primary.contrastText", borderRadius: 2 }}>
//         <Typography variant="h3" gutterBottom>Welcome to Blogify</Typography>
//         <Typography variant="h6" gutterBottom>Share your ideas and stories with the world</Typography>
//         {!user && <Button variant="contained" color="secondary" href="/signup" sx={{ mt: 2 }}>Get Started</Button>}
//       </Box>

//       {/* Search */}
//       <TextField
//         fullWidth
//         placeholder="Search posts..."
//         variant="outlined"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         sx={{ mb: 5 }}
//         InputProps={{
//           startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
//         }}
//       />

//       {/* Featured Posts */}
//       <Typography variant="h4" gutterBottom>Featured Posts</Typography>
//       <Grid container spacing={4} sx={{ mb: 6 }}>
//         {filteredPosts.map((post) => {
//           const excerpt = post.content.length > 120 ? post.content.substring(0, 120) + "..." : post.content;
//           return (
//             <Grid item xs={12} sm={6} md={4} key={post._id}>
//               <Card sx={{ height: "100%", display: "flex", flexDirection: "column", cursor: "pointer", transition: "transform 0.3s", "&:hover": { transform: "scale(1.03)" } }}>
//                 {post.imageUrl && <Box component="img" src={post.imageUrl} alt={post.title} sx={{ width: "100%", height: 180, objectFit: "cover" }} />}
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography variant="h6">{post.title}</Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                     By {post.author.name} | {post.category.name}
//                   </Typography>
//                   <Typography variant="body2">{excerpt}</Typography>
//                   <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                     {post.tags?.map((tag) => (
//                       <Chip key={tag} label={tag} size="small" color="primary" clickable onClick={() => handleTagClick(tag)} />
//                     ))}
//                   </Box>
//                 </CardContent>
//                 <CardActions>
//                   <Button size="small" href={`/post/${post._id}`}>Read More</Button>
//                   <Button size="small" onClick={() => handleLike(post._id)}>👍 {post.likes.length}</Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Categories */}
//       <Typography variant="h4" gutterBottom>Explore Categories</Typography>
//       <Grid container spacing={3} sx={{ mb: 6 }}>
//         {categories.map((cat) => (
//           <Grid item xs={12} sm={6} md={3} key={cat._id}>
//             <Paper
//               elevation={3}
//               sx={{ p: 3, textAlign: "center", cursor: "pointer", "&:hover": { transform: "scale(1.05)", boxShadow: theme.shadows[6] } }}
//               onClick={() => setFilteredPosts(recentPosts.filter((p) => p.category._id === cat._id))}
//             >
//               <Typography variant="h6">{cat.name}</Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Testimonials */}
//       <Typography variant="h4" gutterBottom>What Our Users Say</Typography>
//       <Box sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", mb: 6 }}>
//         <IconButton onClick={prevTestimonial} sx={{ position: "absolute", left: 0 }}><ArrowBackIosNewIcon /></IconButton>
//         <Paper elevation={4} sx={{ p: 4, maxWidth: 600, textAlign: "center" }}>
//           <Typography variant="h6">{testimonials[testimonialIndex].name}</Typography>
//           <Typography variant="body1" sx={{ mt: 1 }}>"{testimonials[testimonialIndex].feedback}"</Typography>
//         </Paper>
//         <IconButton onClick={nextTestimonial} sx={{ position: "absolute", right: 0 }}><ArrowForwardIosIcon /></IconButton>
//       </Box>
//     </Container>
//   );
// };

// export default Home;


// src/Pages/Home.tsx
import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
  useTheme,
  alpha,
  Avatar,
  Rating,
  Fab,
  Fade,
  Grow,
  Slide,
  Zoom,
} from "@mui/material";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Search,
  TrendingUp,
  Favorite,
  FavoriteBorder,
  Share,
  BookmarkBorder,
  Bookmark,
  PlayArrow,
  Groups,
  Article,
  EmojiEvents,
  RocketLaunch,
  Diversity3,
  AutoAwesome,
} from "@mui/icons-material";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

interface Category {
  _id: string;
  name: string;
  description?: string;
  postCount?: number;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  category: Category;
  author: { _id: string; name: string; role: string; avatar?: string };
  imageUrl?: string;
  tags?: string[];
  likes: string[];
  createdAt: string;
  readTime?: number;
  views?: number;
}

interface Testimonial {
  id: number;
  name: string;
  feedback: string;
  role: string;
  avatar?: string;
  rating: number;
}

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Home: React.FC = () => {
  const { user } = useContext(AuthContext);
  const token = user?.token;
  const theme = useTheme();

  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null);
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());

  // Statistics data
  const stats: Stat[] = [
    { label: "Active Writers", value: "10K+", icon: <Groups sx={{ fontSize: 40 }} /> },
    { label: "Articles Published", value: "50K+", icon: <Article sx={{ fontSize: 40 }} /> },
    { label: "Happy Readers", value: "1M+", icon: <Diversity3 sx={{ fontSize: 40 }} /> },
    { label: "Awards Won", value: "25+", icon: <EmojiEvents sx={{ fontSize: 40 }} /> },
  ];

  const testimonials: Testimonial[] = [
    { 
      id: 1, 
      name: "Sarah Johnson", 
      role: "Content Creator",
      feedback: "Blogify transformed my writing career. The platform's intuitive design and engaged community helped me grow my audience by 300% in just 3 months!", 
      rating: 5 
    },
    { 
      id: 2, 
      name: "Michael Chen", 
      role: "Tech Blogger",
      feedback: "As a technical writer, I appreciate the clean code formatting and organization features. My readers love the reading experience!", 
      rating: 5 
    },
    { 
      id: 3, 
      name: "Emma Davis", 
      role: "Lifestyle Influencer",
      feedback: "The analytics and engagement tools are incredible. I can track what resonates with my audience and optimize my content strategy.", 
      rating: 4 
    },
  ];

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [recentRes, trendingRes] = await Promise.all([
          axios.get(`${BASE_URL}posts?limit=8&sort=-createdAt`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }),
          axios.get(`${BASE_URL}posts?limit=4&sort=-likes`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          })
        ]);

        if (recentRes.data?.posts && Array.isArray(recentRes.data.posts)) {
          setRecentPosts(recentRes.data.posts);
          setFilteredPosts(recentRes.data.posts);
          // Set the first post as featured
          if (recentRes.data.posts.length > 0) {
            setFeaturedPost(recentRes.data.posts[0]);
          }
        }

        if (trendingRes.data?.posts && Array.isArray(trendingRes.data.posts)) {
          setTrendingPosts(trendingRes.data.posts);
        }
      } catch (err) {
        console.error(err);
        setRecentPosts([]);
        setFilteredPosts([]);
        setTrendingPosts([]);
      }
    };
    fetchPosts();
  }, [token]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}categories`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (Array.isArray(res.data)) setCategories(res.data);
        else if (res.data.categories) setCategories(res.data.categories);
      } catch (err) {
        console.error(err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, [token]);

  // Search functionality
  useEffect(() => {
    if (!searchQuery) setFilteredPosts(recentPosts);
    else {
      const q = searchQuery.toLowerCase();
      setFilteredPosts(
        recentPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(q) ||
            post.content.toLowerCase().includes(q) ||
            post.tags?.some(tag => tag.toLowerCase().includes(q)) ||
            post.category.name.toLowerCase().includes(q)
        )
      );
    }
  }, [searchQuery, recentPosts]);

  // Testimonials carousel
  const prevTestimonial = () => setTestimonialIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const nextTestimonial = () => setTestimonialIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTagClick = (tag: string) => {
    setFilteredPosts(recentPosts.filter((post) => post.tags?.includes(tag)));
  };

  const handleLike = async (postId: string) => {
    if (!user) {
      // Redirect to login or show login prompt
      return;
    }
    try {
      const res = await axios.post(`${BASE_URL}posts/like/${postId}`, null, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setRecentPosts((prev) =>
        prev.map((p) => (p._id === postId ? { ...p, likes: res.data.likes || p.likes } : p))
      );
      setTrendingPosts((prev) =>
        prev.map((p) => (p._id === postId ? { ...p, likes: res.data.likes || p.likes } : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleSavePost = (postId: string) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section with Gradient */}
      <Box 
        sx={{ 
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
          color: 'primary.contrastText',
          py: 15,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/api/placeholder/1200/600") center/cover',
            opacity: 0.1,
          }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in timeout={1000}>
                <Box>
                  <Chip 
                    label="🚀 Most Popular Blogging Platform" 
                    sx={{ 
                      bgcolor: alpha('#fff', 0.2), 
                      color: 'white', 
                      mb: 3,
                      fontWeight: 600,
                      backdropFilter: 'blur(10px)'
                    }} 
                  />
                  <Typography 
                    variant="h2" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 800,
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      lineHeight: 1.1
                    }}
                  >
                    Write, Share & 
                    <Box component="span" sx={{ color: 'secondary.main' }}> Inspire</Box>
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 4, 
                      opacity: 0.9,
                      fontWeight: 300
                    }}
                  >
                    Join thousands of writers sharing their stories, insights, and expertise with a global audience.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    {!user && (
                      <Button 
                        variant="contained" 
                        color="secondary" 
                        size="large"
                        href="/signup"
                        sx={{ 
                          px: 4, 
                          py: 1.5,
                          fontSize: '1.1rem',
                          borderRadius: 3
                        }}
                      >
                        Start Writing Now
                      </Button>
                    )}
                    <Button 
                      variant="outlined" 
                      color="inherit"
                      size="large"
                      href="/posts"
                      sx={{ 
                        px: 4, 
                        py: 1.5,
                        fontSize: '1.1rem',
                        borderRadius: 3,
                        borderColor: alpha('#fff', 0.3),
                        '&:hover': {
                          borderColor: '#fff',
                          bgcolor: alpha('#fff', 0.1)
                        }
                      }}
                    >
                      Explore Posts
                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in timeout={1500}>
                <Box
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -20,
                      left: -20,
                      right: 20,
                      bottom: 20,
                      background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                      borderRadius: 4,
                      zIndex: 0,
                    }
                  }}
                >
                  <Box
                    component="img"
                    src="/api/placeholder/600/400"
                    alt="Blogging Illustration"
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: 'auto',
                      borderRadius: 4,
                      boxShadow: theme.shadows[10],
                      zIndex: 1,
                    }}
                  />
                </Box>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8, mt: -8, position: 'relative', zIndex: 2 }}>
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 4,
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.light, 0.05)} 100%)`,
          }}
        >
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={stat.label}>
                <Grow in timeout={(index + 1) * 500}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>{stat.icon}</Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>

      {/* Search Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Discover Amazing Content
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Find articles, tutorials, and stories that inspire and educate
          </Typography>
        </Box>
        
        <TextField
          fullWidth
          placeholder="Search posts, topics, or authors..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ 
            mb: 6,
            maxWidth: 700,
            mx: 'auto',
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              fontSize: '1.1rem',
              py: 1,
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ fontSize: 30, color: 'primary.main' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Featured Post */}
        {featuredPost && (
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
              Featured Post
            </Typography>
            <Card 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' },
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: theme.shadows[8],
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.shadows[16],
                }
              }}
            >
              <Box 
                sx={{ 
                  width: { xs: '100%', md: '50%' },
                  minHeight: 400,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                {featuredPost.imageUrl ? (
                  <Box
                    component="img"
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <Box sx={{ textAlign: 'center', p: 4 }}>
                    <Article sx={{ fontSize: 80, mb: 2, opacity: 0.8 }} />
                    <Typography variant="h5">{featuredPost.title}</Typography>
                  </Box>
                )}
                <Chip 
                  label="Featured" 
                  sx={{ 
                    position: 'absolute', 
                    top: 16, 
                    left: 16,
                    bgcolor: 'secondary.main',
                    color: 'white',
                    fontWeight: 600
                  }} 
                />
              </Box>
              
              <Box sx={{ width: { xs: '100%', md: '50%' }, p: 4, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Chip 
                    label={featuredPost.category?.name} 
                    size="small" 
                    color="primary" 
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    {featuredPost.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 3,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {featuredPost.content}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {featuredPost.author.name.charAt(0)}
                    </Avatar>
                    <Typography variant="body2" fontWeight={600}>
                      {featuredPost.author.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • {formatDate(featuredPost.createdAt)}
                    </Typography>
                    {featuredPost.readTime && (
                      <Typography variant="body2" color="text.secondary">
                        • {featuredPost.readTime} min read
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                    {featuredPost.tags?.slice(0, 3).map((tag) => (
                      <Chip 
                        key={tag} 
                        label={tag} 
                        size="small" 
                        variant="outlined"
                        clickable 
                        onClick={() => handleTagClick(tag)}
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    href={`/post/${featuredPost._id}`}
                    endIcon={<PlayArrow />}
                    sx={{ borderRadius: 3 }}
                  >
                    Read Full Story
                  </Button>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton onClick={() => handleLike(featuredPost._id)}>
                      <Favorite sx={{ color: featuredPost.likes.includes(user?._id || '') ? 'error.main' : 'inherit' }} />
                    </IconButton>
                    <IconButton onClick={() => handleSavePost(featuredPost._id)}>
                      {savedPosts.has(featuredPost._id) ? <Bookmark color="primary" /> : <BookmarkBorder />}
                    </IconButton>
                    <IconButton>
                      <Share />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        )}

        {/* Trending Posts */}
        {trendingPosts.length > 0 && (
          <Box sx={{ mb: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrendingUp sx={{ color: 'secondary.main' }} />
                Trending Now
              </Typography>
              <Button variant="outlined" href="/posts?sort=trending">
                View All
              </Button>
            </Box>
            <Grid container spacing={3}>
              {trendingPosts.map((post, index) => (
                <Grid item xs={12} md={6} key={post._id}>
                  <Grow in timeout={(index + 1) * 300}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 3,
                        overflow: 'hidden',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: theme.shadows[8],
                        }
                      }}
                    >
                      {post.imageUrl && (
                        <Box 
                          component="img"
                          src={post.imageUrl}
                          alt={post.title}
                          sx={{
                            width: '100%',
                            height: 200,
                            objectFit: 'cover',
                          }}
                        />
                      )}
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                          <Chip 
                            label={post.category?.name} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Favorite sx={{ fontSize: 16, color: 'error.main' }} />
                            <Typography variant="body2" color="text.secondary">
                              {post.likes.length}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                          {post.title}
                        </Typography>
                        
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ 
                            mb: 2,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {post.content}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '0.8rem' }}>
                            {post.author.name.charAt(0)}
                          </Avatar>
                          <Typography variant="body2" fontSize="0.8rem">
                            {post.author.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" fontSize="0.8rem">
                            • {formatDate(post.createdAt)}
                          </Typography>
                        </Box>
                      </CardContent>
                      <CardActions sx={{ p: 3, pt: 0, justifyContent: 'space-between' }}>
                        <Button 
                          size="small" 
                          href={`/post/${post._id}`}
                          sx={{ borderRadius: 2 }}
                        >
                          Read More
                        </Button>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <IconButton size="small" onClick={() => handleLike(post._id)}>
                            <Favorite sx={{ 
                              fontSize: 18,
                              color: post.likes.includes(user?._id || '') ? 'error.main' : 'inherit' 
                            }} />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleSavePost(post._id)}>
                            {savedPosts.has(post._id) ? 
                              <Bookmark sx={{ fontSize: 18 }} color="primary" /> : 
                              <BookmarkBorder sx={{ fontSize: 18 }} />
                            }
                          </IconButton>
                        </Box>
                      </CardActions>
                    </Card>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Recent Posts */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Latest Stories
            </Typography>
            <Button variant="outlined" href="/posts">
              View All
            </Button>
          </Box>
          
          {filteredPosts.length === 0 ? (
            <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 4 }}>
              <AutoAwesome sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No posts found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {searchQuery ? 'Try adjusting your search terms' : 'Be the first to create a post!'}
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredPosts.map((post, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={post._id}>
                  <Slide in timeout={(index + 1) * 200} direction="up">
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        borderRadius: 3,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: theme.shadows[8],
                        }
                      }}
                    >
                      {post.imageUrl && (
                        <Box 
                          component="img"
                          src={post.imageUrl}
                          alt={post.title}
                          sx={{
                            width: '100%',
                            height: 160,
                            objectFit: 'cover',
                          }}
                        />
                      )}
                      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                        <Chip 
                          label={post.category?.name} 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                          sx={{ mb: 1.5, fontSize: '0.7rem' }}
                        />
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontSize: '1rem',
                            fontWeight: 600,
                            mb: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{
                            fontSize: '0.8rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            mb: 2
                          }}
                        >
                          {post.content}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem' }}>
                              {post.author.name.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" fontSize="0.7rem" fontWeight={500}>
                              {post.author.name}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Favorite sx={{ fontSize: 14, color: 'error.main' }} />
                            <Typography variant="body2" fontSize="0.7rem" color="text.secondary">
                              {post.likes.length}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                      <CardActions sx={{ p: 2.5, pt: 0 }}>
                        <Button 
                          size="small" 
                          href={`/post/${post._id}`}
                          sx={{ borderRadius: 2, fontSize: '0.8rem' }}
                        >
                          Read Story
                        </Button>
                      </CardActions>
                    </Card>
                  </Slide>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Categories */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, textAlign: 'center', mb: 4 }}>
            Explore Categories
          </Typography>
          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <Grid item xs={6} sm={4} md={3} key={category._id}>
                <Grow in timeout={(index + 1) * 300}>
                  <Paper
                    elevation={2}
                    sx={{ 
                      p: 4, 
                      textAlign: 'center', 
                      cursor: 'pointer',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[8],
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.15)} 100%)`,
                      }
                    }}
                    onClick={() => setFilteredPosts(recentPosts.filter((p) => p.category._id === category._id))}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        color: 'white',
                      }}
                    >
                      <Article />
                    </Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.postCount || 'Multiple'} posts
                    </Typography>
                  </Paper>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Testimonials */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, textAlign: 'center', mb: 6 }}>
            What Our Community Says
          </Typography>
          <Box sx={{ position: 'relative', maxWidth: 800, mx: 'auto' }}>
            <IconButton 
              onClick={prevTestimonial}
              sx={{ 
                position: 'absolute', 
                left: { xs: -60, md: -80 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                bgcolor: 'background.paper',
                boxShadow: theme.shadows[4],
                '&:hover': {
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) scale(1.1)',
                }
              }}
            >
              <ArrowBackIosNew />
            </IconButton>
            
            <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  transition: 'transform 0.5s ease',
                  transform: `translateX(-${testimonialIndex * 100}%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <Box
                    key={testimonial.id}
                    sx={{
                      minWidth: '100%',
                      p: 4,
                    }}
                  >
                    <Paper
                      elevation={4}
                      sx={{
                        p: 5,
                        textAlign: 'center',
                        borderRadius: 4,
                        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.light, 0.05)} 100%)`,
                        position: 'relative',
                        '&::before': {
                          content: '"❝"',
                          position: 'absolute',
                          top: -20,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: '4rem',
                          color: theme.palette.primary.main,
                          opacity: 0.2,
                        }
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          mx: 'auto',
                          mb: 3,
                          border: `4px solid ${theme.palette.primary.main}`,
                        }}
                      >
                        {testimonial.name.charAt(0)}
                      </Avatar>
                      <Rating value={testimonial.rating} readOnly sx={{ mb: 3 }} />
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {testimonial.role}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          mt: 3, 
                          fontStyle: 'italic',
                          fontSize: '1.1rem',
                          lineHeight: 1.6
                        }}
                      >
                        "{testimonial.feedback}"
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>
            </Box>

            <IconButton 
              onClick={nextTestimonial}
              sx={{ 
                position: 'absolute', 
                right: { xs: -60, md: -80 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                bgcolor: 'background.paper',
                boxShadow: theme.shadows[4],
                '&:hover': {
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) scale(1.1)',
                }
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          </Box>

          {/* Testimonial Indicators */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
            {testimonials.map((_, index) => (
              <Box
                key={index}
                onClick={() => setTestimonialIndex(index)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: index === testimonialIndex ? 'primary.main' : alpha(theme.palette.primary.main, 0.3),
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    transform: 'scale(1.2)',
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        {/* CTA Section */}
        <Paper
          sx={{
            p: 8,
            textAlign: 'center',
            borderRadius: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("/api/placeholder/1200/400") center/cover',
              opacity: 0.1,
            }
          }}
        >
          <RocketLaunch sx={{ fontSize: 60, mb: 3, opacity: 0.9 }} />
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 800 }}>
            Ready to Start Your Blogging Journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
            Join thousands of writers who are already sharing their stories and building their audience.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {!user ? (
              <>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  href="/signup"
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderRadius: 3,
                    fontWeight: 600
                  }}
                >
                  Sign Up Free
                </Button>
                <Button 
                  variant="outlined" 
                  color="inherit"
                  size="large"
                  href="/about"
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderRadius: 3,
                    borderColor: alpha('#fff', 0.5),
                    '&:hover': {
                      borderColor: '#fff',
                      bgcolor: alpha('#fff', 0.1)
                    }
                  }}
                >
                  Learn More
                </Button>
              </>
            ) : (
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                href="/create-post"
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: 3,
                  fontWeight: 600
                }}
              >
                Create Your First Post
              </Button>
            )}
          </Box>
        </Paper>
      </Container>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
        href={user ? "/create-post" : "/signup"}
      >
        <Article />
      </Fab>
    </Box>
  );
};

export default Home;