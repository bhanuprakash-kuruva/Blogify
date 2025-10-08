import React, { useContext, type ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  Paper,
  Alert,
  CircularProgress
} from "@mui/material";
import { Lock, Home, ArrowBack } from "@mui/icons-material";
import { AuthContext } from "../Context/AuthContext";

interface ProtectedRouteProps {
  component: ComponentType<any>;
  requireAdmin?: boolean;
}

const AccessDeniedPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 6, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          borderRadius: 4
        }}
      >
        <Lock sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
        
        <Typography variant="h4" gutterBottom color="error" fontWeight="bold">
          Access Denied
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Administrator Privileges Required
        </Typography>
        
        <Alert severity="warning" sx={{ mb: 4, textAlign: 'left' }}>
          You don't have permission to access this page. This area requires administrator privileges.
        </Alert>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            startIcon={<ArrowBack />}
            onClick={() => window.history.back()}
            size="large"
          >
            Go Back
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<Home />}
            href="/"
            size="large"
          >
            Home Page
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

const LoadingSpinner: React.FC = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" color="text.secondary">
        Loading...
      </Typography>
    </Box>
  );
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  requireAdmin = false,
}) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <LoadingSpinner />;

  if (!user) return <Navigate to="/login" replace />;
  
  if (requireAdmin && user.role !== "admin") {
    return <AccessDeniedPage />;
  }

  return <Component />;
};

export default ProtectedRoute;