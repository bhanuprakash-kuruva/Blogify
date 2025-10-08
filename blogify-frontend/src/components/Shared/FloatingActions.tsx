import React, { useState, useEffect } from "react";
import { Fab, Tooltip, useTheme, Zoom } from "@mui/material";
import { KeyboardArrowUp, Share, BookmarkBorder } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingActionsProps {
  isMobile: boolean;
}

const FloatingActions: React.FC<FloatingActionsProps> = ({ isMobile }) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: "Check out this amazing post!",
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // You might want to show a snackbar here
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const actions = [
    {
      icon: <Share />,
      tooltip: "Share post",
      onClick: handleShare,
      color: theme.palette.info.main,
    },
    {
      icon: <BookmarkBorder />,
      tooltip: "Bookmark post",
      onClick: () => console.log("Bookmark clicked"),
      color: theme.palette.secondary.main,
    },
    {
      icon: <KeyboardArrowUp />,
      tooltip: "Scroll to top",
      onClick: scrollToTop,
      color: theme.palette.primary.main,
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            bottom: isMobile ? 80 : 24,
            right: isMobile ? 16 : 24,
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {actions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Tooltip title={action.tooltip} placement="left" arrow>
                <Fab
                  size={isMobile ? "small" : "medium"}
                  onClick={action.onClick}
                  sx={{
                    background: `linear-gradient(135deg, ${action.color} 0%, ${action.color}dd 100%)`,
                    color: 'white',
                    boxShadow: `0 4px 20px ${action.color}40`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${action.color}dd 0%, ${action.color} 100%)`,
                      boxShadow: `0 6px 24px ${action.color}60`,
                    },
                  }}
                >
                  {action.icon}
                </Fab>
              </Tooltip>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingActions;