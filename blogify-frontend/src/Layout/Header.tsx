// import React, { useContext, useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Box,
//   useTheme,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import { AuthContext } from "../Context/AuthContext";
// import { ColorModeContext } from "../Context/ThemeContext"; // We'll create this

// const Header: React.FC = () => {
//   const { user, logout } = useContext(AuthContext);
//   const colorMode = useContext(ColorModeContext);
//   const theme = useTheme();

//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const menuItems = user
//     ? [
//         { label: "Home", href: "/" },
//         { label: "Profile", href: "/profile" },
//         ...(user.role === "admin" ? [{ label: "Dashboard", href: "/dashboard" }] : []),
//         { label: "Blogs", href: "/blogs" },
//         { label: "About", href: "/about" },
//         { label: "Contact", href: "/contact" },
//         { label: "Logout", action: logout },
//       ]
//     : [
//         { label: "Home", href: "/" },
//         { label: "About", href: "/about" },
//         { label: "Contact", href: "/contact" },
//         { label: "Login", href: "/login" },
//         { label: "Register", href: "/signup" },
//       ];

//   const toggleDrawer = (open: boolean) => () => {
//     setDrawerOpen(open);
//   };

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//           {/* Brand */}
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Blogify
//           </Typography>

//           {/* Desktop Menu */}
//           <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
//             {menuItems.map((item, idx) =>
//               item.action ? (
//                 <Button key={idx} color="inherit" onClick={item.action}>
//                   {item.label}
//                 </Button>
//               ) : (
//                 <Button key={idx} color="inherit" href={item.href}>
//                   {item.label}
//                 </Button>
//               )
//             )}
//             {/* Theme Switcher */}
//             <IconButton
//               color="inherit"
//               onClick={colorMode.toggleColorMode}
//             >
//               {theme.palette.mode === "dark" ? (
//                 <Brightness7Icon />
//               ) : (
//                 <Brightness4Icon />
//               )}
//             </IconButton>
//           </Box>

//           {/* Mobile Menu Icon */}
//           <IconButton
//             edge="end"
//             color="inherit"
//             sx={{ display: { xs: "block", md: "none" } }}
//             onClick={toggleDrawer(true)}
//           >
//             <MenuIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       {/* Drawer for Mobile */}
//       <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
//         <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
//           <List>
//             {menuItems.map((item, idx) =>
//               item.action ? (
//                 <ListItem button key={idx} onClick={item.action}>
//                   <ListItemText primary={item.label} />
//                 </ListItem>
//               ) : (
//                 <ListItem button key={idx} component="a" href={item.href}>
//                   <ListItemText primary={item.label} />
//                 </ListItem>
//               )
//             )}
//             {/* Theme Switcher inside Drawer */}
//             <ListItem button onClick={colorMode.toggleColorMode}>
//               <ListItemText
//                 primary={
//                   theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"
//                 }
//               />
//             </ListItem>
//           </List>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default Header;

import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  useTheme,
  alpha,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  Fade,
  Slide,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../Context/AuthContext";
import { ColorModeContext } from "../Context/ThemeContext";
import { Link, useLocation } from "react-router-dom";

// Hide on scroll component
function HideOnScroll(props: any) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const location = useLocation();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);

  const menuItems = user
    ? [
        { label: "Home", href: "/", icon: <HomeIcon /> },
        { label: "Profile", href: "/profile", icon: <PersonIcon /> },
        ...(user.role === "admin" 
          ? [{ label: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> }] 
          : []),
        { label: "Blogs", href: "/blogs", icon: <ArticleIcon /> },
        { label: "About", href: "/about", icon: <InfoIcon /> },
        { label: "Contact", href: "/contact", icon: <ContactMailIcon /> },
      ]
    : [
        { label: "Home", href: "/", icon: <HomeIcon /> },
        { label: "About", href: "/about", icon: <InfoIcon /> },
        { label: "Contact", href: "/contact", icon: <ContactMailIcon /> },
        { label: "Login", href: "/login", icon: <LoginIcon /> },
        { label: "Register", href: "/signup", icon: <AppRegistrationIcon /> },
      ];

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
  };

  // Check if current path matches menu item
  const isActivePath = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <HideOnScroll>
        <AppBar 
          position="fixed" 
          sx={{
            backdropFilter: "blur(20px)",
            backgroundColor: alpha(theme.palette.primary.main, 0.9),
            backgroundImage: "none",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <Toolbar sx={{ 
            display: "flex", 
            justifyContent: "space-between",
            minHeight: { xs: 64, md: 72 }
          }}>
            {/* Brand with enhanced styling */}
            <Typography 
              variant="h4" 
              sx={{ 
                flexGrow: 1,
                fontWeight: 700,
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(45deg, #fff 30%, #e0e0e0 90%)'
                  : 'linear-gradient(45deg, #fff 30%, #f5f5f5 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              Blogify
            </Typography>

            {/* Desktop Menu - No Icons */}
            <Box sx={{ 
              display: { xs: "none", md: "flex" }, 
              gap: 1,
              alignItems: 'center'
            }}>
              {menuItems.map((item, idx) => (
                <Button
                  key={idx}
                  color="inherit"
                  component={Link}
                  to={item.href}
                  sx={{
                    borderRadius: 3,
                    px: 2,
                    py: 1,
                    transition: 'all 0.3s ease',
                    backgroundColor: isActivePath(item.href) 
                      ? alpha(theme.palette.common.white, 0.2)
                      : 'transparent',
                    fontWeight: isActivePath(item.href) ? 600 : 500,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.common.white, 0.1),
                      transform: 'translateY(-1px)',
                    },
                    position: 'relative',
                    '&::after': isActivePath(item.href) ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 4,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60%',
                      height: 2,
                      backgroundColor: theme.palette.common.white,
                      borderRadius: 1,
                    } : {},
                  }}
                >
                  {item.label}
                </Button>
              ))}
              
              {/* User Profile Menu */}
              {user && (
                <>
                  <IconButton
                    onClick={handleProfileMenuOpen}
                    sx={{
                      ml: 1,
                      border: `2px solid ${alpha(theme.palette.common.white, 0.3)}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: alpha(theme.palette.common.white, 0.6),
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: theme.palette.secondary.main,
                        fontSize: '0.875rem',
                      }}
                    >
                      {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                    </Avatar>
                  </IconButton>
                  
                  <Menu
                    anchorEl={profileAnchor}
                    open={Boolean(profileAnchor)}
                    onClose={handleProfileMenuClose}
                    TransitionComponent={Fade}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        borderRadius: 3,
                        minWidth: 200,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        overflow: 'visible',
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                  >
                    <MenuItem 
                      onClick={handleProfileMenuClose} 
                      component={Link}
                      to="/profile"
                      sx={{ py: 1.5 }}
                    >
                      <ListItemIcon>
                        <PersonIcon fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              )}

              {/* Theme Switcher */}
              <IconButton
                color="inherit"
                onClick={colorMode.toggleColorMode}
                sx={{
                  ml: 1,
                  borderRadius: 3,
                  p: 1.5,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.common.white, 0.1),
                    transform: 'rotate(15deg)',
                  },
                }}
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Box>

            {/* Mobile Menu Icon */}
            <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1, alignItems: 'center' }}>
              <IconButton
                color="inherit"
                onClick={colorMode.toggleColorMode}
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'rotate(15deg)',
                  },
                }}
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
              
              <IconButton
                edge="end"
                color="inherit"
                onClick={toggleDrawer(true)}
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Spacer for fixed AppBar */}
      <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }} />

      {/* Enhanced Drawer for Mobile - With Icons */}
      <Drawer 
        anchor="right" 
        open={drawerOpen} 
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            borderRadius: '20px 0 0 20px',
            background: theme.palette.background.paper,
          },
        }}
      >
        <Box 
          sx={{ 
            width: 280,
            height: '100%',
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 0.1)} 100%)`,
          }} 
          role="presentation"
        >
          {/* Drawer Header */}
          <Box sx={{ p: 3, textAlign: 'center', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(45deg, #333 30%, #666 90%)'
                  : 'linear-gradient(45deg, #333 30%, #666 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Blogify
            </Typography>
            {user && (
              <Typography 
                variant="body2" 
                sx={{ 
                  mt: 1,
                  color: 'text.secondary',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1
                }}
              >
                <PersonIcon fontSize="small" />
                Hello, {user.name || user.email}
              </Typography>
            )}
          </Box>

          <List sx={{ p: 2 }}>
            {menuItems.map((item, idx) => (
              <ListItem 
                button 
                key={idx} 
                component={Link}
                to={item.href}
                onClick={toggleDrawer(false)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  transition: 'all 0.2s ease',
                  backgroundColor: isActivePath(item.href) 
                    ? alpha(theme.palette.primary.main, 0.15)
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 40,
                  color: isActivePath(item.href) ? 'primary.main' : 'inherit'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActivePath(item.href) ? 600 : 500,
                    color: isActivePath(item.href) ? 'primary.main' : 'inherit'
                  }}
                />
              </ListItem>
            ))}
            
            {/* Logout for mobile */}
            {user && (
              <ListItem 
                button 
                onClick={() => {
                  logout();
                  toggleDrawer(false)();
                }}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.error.main, 0.1),
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <LogoutIcon color="error" />
                </ListItemIcon>
                <ListItemText 
                  primary="Logout"
                  primaryTypographyProps={{
                    fontWeight: 500,
                    color: 'error.main',
                  }}
                />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;