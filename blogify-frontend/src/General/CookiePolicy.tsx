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
  Button,
  useTheme,
  alpha,
  Chip,
} from "@mui/material";
import CookieIcon from "@mui/icons-material/Cookie";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import SettingsIcon from "@mui/icons-material/Settings";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const CookiePolicy: React.FC = () => {
  const theme = useTheme();

  const cookieCategories = [
    {
      name: "Essential Cookies",
      description: "Required for basic site functionality",
      necessary: true,
      examples: ["Authentication", "Security", "Site features"],
      color: "primary" as const,
    },
    {
      name: "Performance Cookies",
      description: "Help us understand how visitors interact with our website",
      necessary: false,
      examples: ["Analytics", "Error tracking", "Performance monitoring"],
      color: "secondary" as const,
    },
    {
      name: "Functional Cookies",
      description: "Enable enhanced functionality and personalization",
      necessary: false,
      examples: ["Preferences", "Settings", "Personalized content"],
      color: "info" as const,
    },
    {
      name: "Targeting Cookies",
      description: "Used to deliver relevant advertisements",
      necessary: false,
      examples: ["Advertising", "Social media integration"],
      color: "warning" as const,
    },
  ];

  const handleAcceptAll = () => {
    // In a real implementation, this would set cookie preferences
    console.log("All cookies accepted");
    alert("Cookie preferences updated! You can change these anytime in your settings.");
  };

  const handleEssentialOnly = () => {
    // In a real implementation, this would set cookie preferences
    console.log("Only essential cookies accepted");
    alert("Only essential cookies enabled. Some features may be limited.");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <CookieIcon
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
          Cookie Policy
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
            Understanding Cookies
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            Like most modern websites, Blogify uses cookies and similar technologies 
            to help us provide you with the best possible experience. This policy 
            explains what cookies are, how we use them, and how you can manage your 
            cookie preferences.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* What are Cookies */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <PrivacyTipIcon sx={{ mr: 2, color: "primary.main" }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              What Are Cookies?
            </Typography>
          </Box>
          
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
            Cookies are small text files that are stored on your device when you visit 
            a website. They are widely used to make websites work more efficiently and 
            provide information to the website owners.
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            Cookies can be "persistent" or "session" cookies. Persistent cookies remain 
            on your device when you go offline, while session cookies are deleted as 
            soon as you close your web browser.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Cookie Categories */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <AnalyticsIcon sx={{ mr: 2, color: "primary.main" }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Types of Cookies We Use
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {cookieCategories.map((category, index) => (
              <Paper
                key={index}
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette[category.color].main, 0.1)}`,
                  backgroundColor: alpha(theme.palette[category.color].main, 0.03),
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {category.name}
                  </Typography>
                  <Chip
                    label={category.necessary ? "Always Active" : "Optional"}
                    color={category.necessary ? "primary" : "default"}
                    size="small"
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {category.description}
                </Typography>

                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  Examples:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {category.examples.map((example, exampleIndex) => (
                    <Chip
                      key={exampleIndex}
                      label={example}
                      variant="outlined"
                      size="small"
                      color={category.color}
                    />
                  ))}
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Specific Cookies */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Specific Cookies We Use
          </Typography>
          
          <List>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Authentication Cookies"
                secondary="Remember your login state and keep you signed in across browsing sessions. Essential for using Blogify."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Preference Cookies"
                secondary="Remember your settings and preferences, such as theme choice (light/dark mode) and language settings."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Analytics Cookies"
                secondary="Help us understand how visitors interact with our website through anonymous data collection. This information helps us improve our services."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Security Cookies"
                secondary="Support security features and help detect malicious activity to keep your account safe."
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Third-Party Cookies */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Third-Party Cookies
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
            In addition to our own cookies, we may also use various third-party cookies 
            to report usage statistics of the service, deliver advertisements on and 
            through the service, and so on.
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            These third-party services have their own privacy policies and cookie 
            policies. We recommend reviewing their policies to understand how they 
            handle your data.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Managing Cookies */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <SettingsIcon sx={{ mr: 2, color: "primary.main" }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Managing Your Cookie Preferences
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
            You have several options to control or limit how we and our partners use cookies:
          </Typography>

          <List>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Browser Settings"
                secondary="Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience on our site."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Opt-Out Tools"
                secondary="You can opt out of certain types of targeting and advertising cookies through industry opt-out platforms."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Do Not Track"
                secondary="Some browsers have a 'Do Not Track' feature that lets you tell websites you do not want to be tracked. We currently do not respond to these signals."
              />
            </ListItem>
          </List>

          <Typography variant="body1" sx={{ lineHeight: 1.8, mt: 3 }}>
            Note that blocking some types of cookies may impact your experience on 
            our site and the services we are able to offer.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Cookie Consent */}
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Update Your Cookie Preferences
          </Typography>
          
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 4 }}>
            You can change your cookie preferences at any time using the options below:
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleAcceptAll}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              Accept All Cookies
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={handleEssentialOnly}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              Essential Cookies Only
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Contact */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Need More Information?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            If you have any questions about our use of cookies, please contact us at{" "}
            <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
              privacy@blogify.com
            </Box>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default CookiePolicy;