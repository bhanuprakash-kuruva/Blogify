// components/PostSection.tsx
import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Avatar,
  IconButton,
  Divider,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Share, BookmarkBorder, Bookmark } from "@mui/icons-material";
import type{  Post } from "./blogs/types/index";

interface PostSectionProps {
  post: Post;
  isBookmarked: boolean;
  bookmarkLoading: boolean;
  onBookmark: () => void;
  onShare: () => void;
  isMobile: boolean;
  isTablet: boolean;
}

const PostSection: React.FC<PostSectionProps> = ({
  post,
  isBookmarked,
  bookmarkLoading,
  onBookmark,
  onShare,
  isMobile,
  isTablet,
}) => {
  const theme = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card
      sx={{
        mb: { xs: 3, sm: 4 },
        borderRadius: { xs: 2, sm: 3 },
        overflow: "hidden",
        boxShadow: theme.shadows[2],
        "&:hover": {
          boxShadow: theme.shadows[6],
          transition: "box-shadow 0.3s ease-in-out",
        },
      }}
    >
      {post.imageUrl && (
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <CardMedia
            component="img"
            height={isMobile ? 200 : isTablet ? 300 : 400}
            image={post.imageUrl}
            alt={post.title}
            sx={{
              objectFit: "cover",
              transition: "transform 0.3s ease-in-out",
              filter: imageLoaded ? "none" : "blur(10px)",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
            onLoad={handleImageLoad}
          />
          {!imageLoaded && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.100",
              }}
            >
              <CircularProgress size={40} />
            </Box>
          )}
        </Box>
      )}

      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        {/* Category and Status */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mb: 2 }}
          flexWrap="wrap"
          gap={1}
        >
          {post.category && (
            <Chip
              label={post.category.name}
              color="primary"
              variant="outlined"
              size={isMobile ? "small" : "medium"}
            />
          )}
          {post.status === "draft" && (
            <Chip
              label="Draft"
              color="warning"
              size={isMobile ? "small" : "medium"}
            />
          )}
        </Stack>

        {/* Title */}
        <Typography
          variant={isMobile ? "h4" : "h3"}
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: "1.75rem",
              sm: "2.125rem",
              md: "2.5rem",
            },
            lineHeight: 1.2,
            wordBreak: "break-word",
          }}
        >
          {post.title}
        </Typography>

        {/* Author Info */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ mb: 3 }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <Avatar
              sx={{
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                bgcolor: theme.palette.primary.main,
                fontSize: { xs: "1rem", sm: "1.2rem" },
              }}
            >
              {post.author.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                color="text.primary"
                noWrap
              >
                {post.author.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                }}
              >
                {post.author.role} • {formatDate(post.createdAt)}
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }} />

          <Stack
            direction="row"
            spacing={1}
            sx={{
              width: { xs: "100%", sm: "auto" },
              justifyContent: { xs: "space-between", sm: "flex-end" },
            }}
          >
            <IconButton
              onClick={onShare}
              color="primary"
              size={isMobile ? "medium" : "large"}
              sx={{
                bgcolor: "action.hover",
                "&:hover": { bgcolor: "primary.light", color: "white" },
              }}
            >
              <Share fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
            <IconButton
              onClick={onBookmark}
              disabled={bookmarkLoading}
              color={isBookmarked ? "primary" : "default"}
              size={isMobile ? "medium" : "large"}
              sx={{
                bgcolor: "action.hover",
                "&:hover": { bgcolor: "primary.light", color: "white" },
              }}
              title={isBookmarked ? "Remove bookmark" : "Add to bookmarks"}
            >
              {bookmarkLoading ? (
                <CircularProgress size={20} />
              ) : isBookmarked ? (
                <Bookmark fontSize={isMobile ? "small" : "medium"} />
              ) : (
                <BookmarkBorder fontSize={isMobile ? "small" : "medium"} />
              )}
            </IconButton>
          </Stack>
        </Stack>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              Tags:
            </Typography>
            <Stack
              direction="row"
              flexWrap="wrap"
              gap={1}
              sx={{ maxHeight: { xs: 60, sm: "none" }, overflow: "hidden" }}
            >
              {post.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size={isMobile ? "small" : "medium"}
                  variant="outlined"
                  sx={{
                    fontSize: { xs: "0.7rem", sm: "0.8125rem" },
                    maxWidth: { xs: 120, sm: "none" },
                  }}
                />
              ))}
            </Stack>
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Content */}
        <Typography
          variant="body1"
          sx={{
            whiteSpace: "pre-line",
            lineHeight: 1.8,
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
            color: "text.primary",
            "& p": { mb: 2 },
            textAlign: "justify",
          }}
        >
          {post.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostSection;