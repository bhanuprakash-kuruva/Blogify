import React from "react";
import { Snackbar, Alert, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

interface SnackbarAlertProps {
  snackbar: {
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
  };
  onClose: () => void;
  isMobile: boolean;
  autoHideDuration?: number;
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({
  snackbar,
  onClose,
  isMobile,
  autoHideDuration = 4000,
}) => {
  const theme = useTheme();

  const getIconColor = () => {
    switch (snackbar.severity) {
      case "success":
        return theme.palette.success.main;
      case "error":
        return theme.palette.error.main;
      case "warning":
        return theme.palette.warning.main;
      case "info":
        return theme.palette.info.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <AnimatePresence>
      {snackbar.open && (
        <Snackbar
          open={snackbar.open}
          autoHideDuration={autoHideDuration}
          onClose={onClose}
          anchorOrigin={{ 
            vertical: isMobile ? 'bottom' : 'bottom', 
            horizontal: isMobile ? 'center' : 'left' 
          }}
          sx={{ 
            bottom: { xs: 70, sm: 24 } // Avoid FAB on mobile
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 30 
            }}
          >
            <Alert 
              severity={snackbar.severity} 
              onClose={onClose}
              variant="filled"
              sx={{ 
                width: '100%',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                borderRadius: 2,
                boxShadow: `0 8px 32px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)'}`,
                background: `linear-gradient(135deg, ${getIconColor()} 0%, ${getIconColor()}dd 100%)`,
                '& .MuiAlert-icon': {
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                },
                '& .MuiAlert-message': {
                  py: 0.5,
                }
              }}
            >
              {snackbar.message}
            </Alert>
          </motion.div>
        </Snackbar>
      )}
    </AnimatePresence>
  );
};

export default SnackbarAlert;