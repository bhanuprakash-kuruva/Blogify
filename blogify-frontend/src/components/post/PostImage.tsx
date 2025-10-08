import React, { useState } from "react";
import { CardMedia, Box, CircularProgress, alpha, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

interface PostImageProps {
  imageUrl: string;
  title: string;
  isMobile: boolean;
  isTablet: boolean;
}

const PostImage: React.FC<PostImageProps> = ({
  imageUrl,
  title,
  isMobile,
  isTablet,
}) => {
  const theme = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence>
        {!imageLoaded && !imageError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${theme.palette.grey[100]} 0%, ${theme.palette.grey[300]} 100%)`,
              zIndex: 1
            }}
          >
            <CircularProgress 
              size={40} 
              sx={{ 
                color: theme.palette.primary.main,
                opacity: 0.7
              }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <CardMedia
          component="img"
          height={isMobile ? 200 : isTablet ? 300 : 400}
          image={imageUrl}
          alt={title}
          sx={{ 
            objectFit: "cover",
            width: '100%',
            transition: 'transform 0.5s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </motion.div>

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60%',
          background: `linear-gradient(to top, ${alpha(theme.palette.common.black, 0.7)} 0%, transparent 100%)`,
          opacity: 0.3,
        }}
      />
    </Box>
  );
};

export default PostImage;