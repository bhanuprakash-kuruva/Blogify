// import React from "react";
// import { Box, Typography, Link, useTheme } from "@mui/material";

// const Footer: React.FC = () => {
//   const theme = useTheme();

//   return (
//     <Box
//       component="footer"
//       sx={{
//         bgcolor:
//           theme.palette.mode === "light"
//             ? theme.palette.grey[100] // light grey in light mode
//             : theme.palette.background.paper, // dark background in dark mode
//         color:
//           theme.palette.mode === "light"
//             ? theme.palette.text.primary
//             : theme.palette.text.primary,
//         py: 3,
//         px: 2,
//         mt: "auto",
//         textAlign: "center",
//         borderTop: `1px solid ${
//           theme.palette.mode === "light"
//             ? theme.palette.divider
//             : theme.palette.divider
//         }`,
//       }}
//     >
//       <Typography variant="body2" sx={{ mb: 1 }}>
//         © {new Date().getFullYear()} Blogify. All rights reserved.
//       </Typography>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           gap: 2,
//           flexWrap: "wrap",
//         }}
//       >
//         <Link href="/about" color="inherit" underline="hover">
//           About
//         </Link>
//         <Link href="/contact" color="inherit" underline="hover">
//           Contact
//         </Link>
//         <Link href="/t&c" color="inherit" underline="hover">
//           Privacy Policy
//         </Link>
//         <Link href="/t&c" color="inherit" underline="hover">
//           Terms of Service
//         </Link>
//       </Box>
//     </Box>
//   );
// };

// export default Footer;


import React from "react";
import { 
  Box, 
  Typography, 
  Link, 
  useTheme, 
  Container,
  Grid,
  IconButton,
  alpha,
  Divider
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Footer: React.FC = () => {
  const theme = useTheme();

  const socialLinks = [
    { icon: <FacebookIcon />, href: "#", label: "Facebook" },
    { icon: <TwitterIcon />, href: "#", label: "Twitter" },
    { icon: <InstagramIcon />, href: "#", label: "Instagram" },
    { icon: <LinkedInIcon />, href: "#", label: "LinkedIn" },
  ];

  const quickLinks = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blogs", href: "/blogs" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/t&c" },
    { label: "Cookie Policy", href: "/cookie" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.mode === "light" 
          ? alpha(theme.palette.primary.main, 0.02)
          : alpha(theme.palette.background.paper, 0.8),
        color: theme.palette.text.primary,
        py: 6,
        px: 2,
        mt: "auto",
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        backdropFilter: "blur(20px)",
        backgroundImage: theme.palette.mode === "light" 
          ? "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(248,248,248,0.95) 100%)"
          : "linear-gradient(180deg, rgba(18,18,18,0.9) 0%, rgba(30,30,30,0.95) 100%)",
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                mb: 2,
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(45deg, #fff 30%, #e0e0e0 90%)'
                  : 'linear-gradient(45deg, #333 30%, #666 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Blogify
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3,
                color: 'text.secondary',
                lineHeight: 1.6,
                maxWidth: 300
              }}
            >
              Share your stories, connect with readers, and build your writing community. 
              Your voice matters.
            </Typography>
            
            {/* Contact Info */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                <Typography variant="body2" color="text.secondary">
                  hello@blogify.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                <Typography variant="body2" color="text.secondary">
                  Worldwide Community
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3,
                fontWeight: 600,
                color: 'text.primary'
              }}
            >
              Explore
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  color="text.secondary"
                  underline="none"
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateX(4px)',
                    },
                    fontWeight: 500,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Legal Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3,
                fontWeight: 600,
                color: 'text.primary'
              }}
            >
              Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  color="text.secondary"
                  underline="none"
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateX(4px)',
                    },
                    fontWeight: 500,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Social Links */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3,
                fontWeight: 600,
                color: 'text.primary'
              }}
            >
              Connect With Us
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mb: 3 }}
            >
              Follow us on social media for updates, writing tips, and community highlights.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  sx={{
                    color: 'text.secondary',
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: alpha(theme.palette.divider, 0.1) }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: "space-between",
            alignItems: { xs: 'center', sm: 'center' },
            gap: 2,
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              fontWeight: 500
            }}
          >
            © {new Date().getFullYear()} Blogify. All rights reserved.
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              fontStyle: 'italic'
            }}
          >
            Crafted with ❤️ for writers and readers
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;