// components/PostMetadataSection.tsx
import React from "react";
import {
  Card,
  Typography,
  Stack,
  Avatar,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import type { Post } from "./blogs/types/index";

interface PostMetadataSectionProps {
  post: Post;
  isBookmarked: boolean;
  commentsCount: number;
  isMobile: boolean;
  isTablet: boolean;
}

const PostMetadataSection: React.FC<PostMetadataSectionProps> = ({
  post,
  isBookmarked,
  commentsCount,
  isMobile,
  isTablet,
}) => {
  const theme = useTheme();

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
    <Stack spacing={3}>
      {/* Author Card */}
      <Card
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: { xs: 2, sm: 3 },
          position: "sticky",
          top: 100,
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <Avatar
            sx={{
              width: { xs: 60, md: 80 },
              height: { xs: 60, md: 80 },
              bgcolor: theme.palette.primary.main,
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            {post.author.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box textAlign="center">
            <Typography
              variant={isTablet ? "h6" : "h5"}
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              {post.author.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
            >
              {post.author.role}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: { xs: "0.7rem", md: "0.8rem" },
                wordBreak: "break-word",
              }}
            >
              {post.author.email}
            </Typography>
          </Box>
        </Stack>
      </Card>

      {/* Stats Card */}
      <Card
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: { xs: 2, sm: 3 },
          position: "sticky",
          top: 300,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
        >
          Post Stats
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
            >
              Likes
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
            >
              {post.likes.length}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
            >
              Dislikes
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
            >
              {post.dislikes.length}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
            >
              Comments
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
            >
              {commentsCount}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
            >
              Bookmarked
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
            >
              {isBookmarked ? "Yes" : "No"}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
            >
              Published
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{
                fontSize: { xs: "0.7rem", md: "0.8rem" },
                textAlign: "right",
              }}
            >
              {formatDate(post.createdAt)}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default PostMetadataSection;