// src/Pages/About.tsx
import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  useTheme,
  Chip,
  Stack,
  useMediaQuery,
  alpha,
} from "@mui/material";
import {
  RocketLaunch,
  Groups,
  TrendingUp,
  Diversity3,
  EmojiObjects,
  ConnectWithoutContact,
} from "@mui/icons-material";
import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const teamMembers = [
  { 
    name: "Alice Johnson", 
    role: "Founder & CEO", 
    avatar: "/avatars/alice.jpg",
    bio: "Passionate about empowering writers and building inclusive communities.",
    social: ["Twitter", "LinkedIn"]
  },
  { 
    name: "Bob Smith", 
    role: "Lead Developer", 
    avatar: "/avatars/bob.jpg",
    bio: "Full-stack developer with 8+ years of experience in building scalable web applications.",
    social: ["GitHub", "Twitter"]
  },
  { 
    name: "Charlie Lee", 
    role: "UI/UX Designer", 
    avatar: "/avatars/charlie.jpg",
    bio: "Award-winning designer focused on creating intuitive and beautiful user experiences.",
    social: ["Dribbble", "Behance"]
  },
];

const stats = [
  { number: "50K+", label: "Active Writers" },
  { number: "1M+", label: "Monthly Readers" },
  { number: "100+", label: "Countries" },
  { number: "95%", label: "Satisfaction Rate" },
];

const values = [
  {
    icon: <EmojiObjects sx={{ fontSize: 40 }} />,
    title: "Innovation",
    description: "Constantly evolving to provide the best blogging experience"
  },
  {
    icon: <Diversity3 sx={{ fontSize: 40 }} />,
    title: "Inclusivity",
    description: "A platform for all voices and perspectives"
  },
  {
    icon: <ConnectWithoutContact sx={{ fontSize: 40 }} />,
    title: "Community",
    description: "Building connections between writers and readers"
  },
];

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionTypography = motion(Typography);
const MotionGrid = motion(Grid);

const About: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Hero Section */}
        <MotionBox
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          sx={{ 
            textAlign: "center", 
            mb: 12,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
            borderRadius: 4,
            p: 6,
            mx: -3
          }}
        >
          <Chip 
            label="Our Story" 
            color="primary" 
            variant="outlined"
            sx={{ mb: 3 }}
          />
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            About Blogify
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            A modern platform to share ideas, connect with readers, and grow your blogging journey.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button variant="contained" color="primary" size="large" href="/signup">
              Start Writing
            </Button>
            <Button variant="outlined" color="primary" size="large" href="/discover">
              Discover Blogs
            </Button>
          </Stack>
        </MotionBox>

        {/* Stats Section */}
        <MotionBox
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          sx={{ mb: 12 }}
        >
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <MotionGrid
                key={stat.label}
                item xs={6} sm={3}
                variants={fadeInUp}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography 
                    variant="h3" 
                    color="primary" 
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </MotionGrid>
            ))}
          </Grid>
        </MotionBox>

        {/* Mission Section */}
        <MotionBox
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          sx={{ mb: 12 }}
        >
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                Our Mission
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: '1.1rem' }}>
                At Blogify, our mission is to empower writers of all backgrounds to share their stories with the world.
                We aim to provide an easy-to-use, interactive, and professional blogging platform that fosters creativity,
                engagement, and learning.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                We believe everyone has a story worth telling, and we're committed to building the tools and community
                that help those stories find their audience.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  borderRadius: 4,
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                <RocketLaunch sx={{ fontSize: 80, opacity: 0.8 }} />
              </Box>
            </Grid>
          </Grid>
        </MotionBox>

        {/* Values Section */}
        <MotionBox
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          sx={{ mb: 12 }}
        >
          <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 6, fontWeight: 700 }}>
            Our Values
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <MotionGrid
                key={value.title}
                item xs={12} md={4}
                variants={fadeInUp}
              >
                <Card sx={{ 
                  height: "100%", 
                  p: 4, 
                  textAlign: "center",
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[8]
                  }
                }}>
                  <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                    {value.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    {value.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {value.description}
                  </Typography>
                </Card>
              </MotionGrid>
            ))}
          </Grid>
        </MotionBox>

        {/* Features Section */}
        <MotionBox
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          sx={{ mb: 12 }}
        >
          <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 6, fontWeight: 700 }}>
            Why Choose Blogify?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <MotionCard variants={fadeInUp} sx={{ 
                height: "100%", 
                p: 4, 
                textAlign: "center",
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
              }}>
                <TrendingUp sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>Interactive Dashboard</Typography>
                <Typography color="text.secondary">
                  Manage your posts, track likes, and monitor engagement with a sleek, real-time dashboard 
                  that gives you insights into your audience's behavior.
                </Typography>
              </MotionCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <MotionCard variants={fadeInUp} sx={{ 
                height: "100%", 
                p: 4, 
                textAlign: "center",
                background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
              }}>
                <Groups sx={{ fontSize: 48, color: theme.palette.secondary.main, mb: 2 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>Smart Categories & Tags</Typography>
                <Typography color="text.secondary">
                  Organize your posts with intelligent categories and tags to reach the right audience 
                  and boost your content's discoverability.
                </Typography>
              </MotionCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <MotionCard variants={fadeInUp} sx={{ 
                height: "100%", 
                p: 4, 
                textAlign: "center",
                background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.05)} 0%, ${alpha(theme.palette.success.main, 0.1)} 100%)`,
              }}>
                <ConnectWithoutContact sx={{ fontSize: 48, color: theme.palette.success.main, mb: 2 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>Community Engagement</Typography>
                <Typography color="text.secondary">
                  Build meaningful connections with readers through likes, comments, and shares. 
                  Grow a loyal community around your content.
                </Typography>
              </MotionCard>
            </Grid>
          </Grid>
        </MotionBox>

        {/* Team Section */}
        <MotionBox
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          sx={{ mb: 12 }}
        >
          <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 6, fontWeight: 700 }}>
            Meet the Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member) => (
              <MotionGrid
                key={member.name}
                item xs={12} sm={6} md={4}
                variants={fadeInUp}
              >
                <Card sx={{ 
                  textAlign: "center", 
                  p: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[8]
                  }
                }}>
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    sx={{ 
                      width: 120, 
                      height: 120, 
                      mx: "auto", 
                      mb: 3,
                      border: `4px solid ${theme.palette.primary.main}`
                    }}
                  />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {member.name}
                  </Typography>
                  <Chip 
                    label={member.role} 
                    color="primary" 
                    variant="outlined"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <Typography color="text.secondary" sx={{ mb: 2, minHeight: 60 }}>
                    {member.bio}
                  </Typography>
                  <Stack direction="row" spacing={1} justifyContent="center">
                    {member.social.map((platform) => (
                      <Chip
                        key={platform}
                        label={platform}
                        variant="outlined"
                        size="small"
                        clickable
                      />
                    ))}
                  </Stack>
                </Card>
              </MotionGrid>
            ))}
          </Grid>
        </MotionBox>

        {/* Call-to-Action */}
        <MotionBox
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          sx={{ 
            textAlign: "center", 
            py: 8, 
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            borderRadius: 4,
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              background: alpha('#fff', 0.1),
              borderRadius: '50%'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -50,
              left: -50,
              width: 200,
              height: 200,
              background: alpha('#fff', 0.1),
              borderRadius: '50%'
            }}
          />
          <Box position="relative">
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
              Start Your Blogging Journey Today
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of writers who share their ideas on Blogify.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                href="/signup"
                sx={{ 
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100'
                  }
                }}
              >
                Get Started Free
              </Button>
              <Button 
                variant="outlined" 
                color="inherit" 
                size="large"
                href="/tour"
              >
                Take a Tour
              </Button>
            </Stack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default About;