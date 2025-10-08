import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import ShareIcon from "@mui/icons-material/Share";
import CookieIcon from "@mui/icons-material/Cookie";

const PrivacyPolicy: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <SecurityIcon
          sx={{
            fontSize: 64,
            color: "primary.main",
            mb: 2,
          }}
        />
        <Typography
          variant="h2"
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
          Privacy Policy
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Last updated: {new Date().toLocaleDateString()}
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 5,
          borderRadius: 4,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        {/* Introduction */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            Your Privacy Matters
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            At Blogify, we are committed to protecting your privacy and ensuring 
            that your personal information is handled in a safe and responsible manner. 
            This Privacy Policy outlines how we collect, use, and protect your information.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Information Collection */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <DataUsageIcon sx={{ mr: 2, color: "primary.main" }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Information We Collect
            </Typography>
          </Box>
          
          <List sx={{ mb: 3 }}>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Personal Information"
                secondary="When you create an account, we collect your name, email address, and profile information. This helps us personalize your experience and communicate with you."
                primaryTypographyProps={{ fontWeight: 600, mb: 1 }}
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Content Data"
                secondary="We store the blogs, articles, comments, and other content you create on our platform. This allows you to access and manage your work across devices."
                primaryTypographyProps={{ fontWeight: 600, mb: 1 }}
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Usage Data"
                secondary="We collect information about how you interact with our platform, including pages visited, features used, and time spent. This helps us improve our services."
                primaryTypographyProps={{ fontWeight: 600, mb: 1 }}
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Technical Information"
                secondary="We automatically collect IP addresses, browser type, device information, and cookies to ensure platform security and optimize performance."
                primaryTypographyProps={{ fontWeight: 600, mb: 1 }}
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* How We Use Information */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <ShareIcon sx={{ mr: 2, color: "primary.main" }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              How We Use Your Information
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
            We use the information we collect for the following purposes:
          </Typography>

          <List>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Service Provision"
                secondary="To provide, maintain, and improve our blogging platform and its features."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Communication"
                secondary="To send you important updates, security alerts, and support messages."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Personalization"
                secondary="To customize your experience and show you relevant content and recommendations."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Analytics"
                secondary="To understand how users interact with our platform and make data-driven improvements."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Security"
                secondary="To protect against fraud, abuse, and security threats."
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Cookies */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <CookieIcon sx={{ mr: 2, color: "primary.main" }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Cookies and Tracking
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
            We use cookies and similar tracking technologies to track activity on our 
            platform and hold certain information. Cookies are files with a small amount 
            of data which may include an anonymous unique identifier.
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            You can instruct your browser to refuse all cookies or to indicate when a 
            cookie is being sent. However, if you do not accept cookies, you may not be 
            able to use some portions of our platform.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Data Sharing */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Data Sharing and Disclosure
          </Typography>
          
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
            We do not sell your personal information to third parties. We may share 
            your information in the following circumstances:
          </Typography>

          <List>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Service Providers"
                secondary="With trusted third-party vendors who help us operate our platform (e.g., hosting, analytics, customer support)."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Legal Requirements"
                secondary="When required by law or to respond to valid legal processes."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Business Transfers"
                secondary="In connection with any merger, sale of company assets, or acquisition."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="With Your Consent"
                secondary="When you explicitly give us permission to share your information."
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Your Rights */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Your Rights and Choices
          </Typography>

          <List>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Access and Update"
                secondary="You can access and update your personal information through your account settings at any time."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Data Export"
                secondary="You can request a copy of your data in a machine-readable format."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Account Deletion"
                secondary="You can delete your account and associated data at any time through your account settings."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Communication Preferences"
                secondary="You can opt-out of promotional communications while still receiving essential service messages."
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Contact */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Questions?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
              privacy@blogify.com
            </Box>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;