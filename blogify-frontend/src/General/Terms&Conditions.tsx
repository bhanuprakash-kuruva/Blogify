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
import GavelIcon from "@mui/icons-material/Gavel";
import DescriptionIcon from "@mui/icons-material/Description";
import WarningIcon from "@mui/icons-material/Warning";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const TermsOfService: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <GavelIcon
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
          Terms of Service
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Effective date: {new Date().toLocaleDateString()}
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
            Welcome to Blogify
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            These Terms of Service govern your use of Blogify and provide information 
            about our services. By creating an account or using our platform, you agree 
            to these terms.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Account Terms */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <AccountCircleIcon sx={{ mr: 2, color: "primary.main" }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Account Terms
            </Typography>
          </Box>
          
          <List sx={{ mb: 3 }}>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Eligibility"
                secondary="You must be at least 13 years old to use Blogify. If you are under 18, you need permission from a parent or guardian."
                primaryTypographyProps={{ fontWeight: 600, mb: 1 }}
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Account Security"
                secondary="You are responsible for maintaining the security of your account and password. Blogify cannot and will not be liable for any loss or damage from your failure to comply with this security obligation."
                primaryTypographyProps={{ fontWeight: 600, mb: 1 }}
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="One Account Per Person"
                secondary="You may not create multiple accounts for the same person. Each account must represent an individual human being."
                primaryTypographyProps={{ fontWeight: 600, mb: 1 }}
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Account Termination"
                secondary="We reserve the right to suspend or terminate your account at any time for violations of these terms."
                primaryTypographyProps={{ fontWeight: 600, mb: 1 }}
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Content Guidelines */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <DescriptionIcon sx={{ mr: 2, color: "primary.main" }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Content Guidelines
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
            You retain ownership of any intellectual property rights that you hold in 
            content you post to Blogify. By posting content, you grant us a license to 
            display, distribute, and promote your content on Blogify.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'error.main' }}>
            Prohibited Content
          </Typography>
          
          <List>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Illegal Content"
                secondary="Content that violates any applicable law or regulation."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Hate Speech"
                secondary="Content that promotes violence or hatred against individuals or groups based on race, ethnicity, religion, disability, gender, age, or sexual orientation."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Harassment"
                secondary="Bullying, intimidation, or harassment of any individual or organization."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Spam and Malware"
                secondary="Unsolicited bulk messages, automated content, or malicious software."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Private Information"
                secondary="Content that reveals personal identifying information about others without their consent."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Copyright Infringement"
                secondary="Content that infringes on others' intellectual property rights."
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* User Responsibilities */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <WarningIcon sx={{ mr: 2, color: "primary.main" }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              User Responsibilities
            </Typography>
          </Box>

          <List>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Respectful Interaction"
                secondary="Engage with other users in a respectful and constructive manner. Disagreements are fine, but personal attacks are not."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Content Accuracy"
                secondary="Ensure that your content is accurate and not misleading, especially in educational or news-related posts."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Attribution"
                secondary="Properly attribute sources and give credit where credit is due for referenced content."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Platform Integrity"
                secondary="Do not attempt to manipulate our systems, create fake engagement, or otherwise game our algorithms."
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Platform Services */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Our Services
          </Typography>
          
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
            Blogify provides a platform for publishing and discovering content. 
            We reserve the right to:
          </Typography>

          <List>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Modify or Discontinue Services"
                secondary="We may add, change, or remove features or functionality of the platform at any time."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Content Moderation"
                secondary="We may review and remove content that violates these terms or that we determine to be harmful to our community."
              />
            </ListItem>
            <ListItem sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary="Service Interruptions"
                secondary="We do not guarantee uninterrupted access to our services and may perform maintenance or experience outages."
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Liability */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Limitation of Liability
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
            To the extent permitted by law, Blogify shall not be liable for any indirect, 
            incidental, special, consequential, or punitive damages, or any loss of 
            profits or revenues, whether incurred directly or indirectly, or any loss 
            of data, use, goodwill, or other intangible losses.
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            Our total liability in any matter related to these terms or our services 
            is limited to the amount you paid us in the 12 months preceding the event 
            giving rise to the liability.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Changes to Terms */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Changes to Terms
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            We may update these Terms of Service from time to time. We will notify you 
            of any changes by posting the new Terms on this page and updating the 
            "Effective Date" at the top. You are advised to review these Terms 
            periodically for any changes.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Contact */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Questions About These Terms?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Contact us at{" "}
            <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
              legal@blogify.com
            </Box>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TermsOfService;