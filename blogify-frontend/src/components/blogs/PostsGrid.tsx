import React from "react";
import { 
  Grid, 
  Box, 
  Pagination, 
  useTheme, 
  alpha 
} from "@mui/material";
import type { Post } from "./types";
import PostCard from "./PostCard";
import type { User } from "./types";

interface PostsGridProps {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  bookmarkedPosts: Set<string>;
  user: User | null;
  onPageChange: (page: number) => void;
  onEditPost: (post: Post) => void;
  onLikePost: (postId: string) => void;
  onDislikePost: (postId: string) => void;
  onBookmarkPost: (postId: string) => void;
}

const PostsGrid: React.FC<PostsGridProps> = ({
  posts,
  currentPage,
  totalPages,
  bookmarkedPosts,
  user,
  onPageChange,
  onEditPost,
  onLikePost,
  onDislikePost,
  onBookmarkPost,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%' }}>
      {/* Consistent Grid Container */}
      <Grid 
        container 
        spacing={3}
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 3,
          '& > *': {
            minWidth: 0, // Prevent overflow
          }
        }}
      >
        {posts.map((post, index) => (
          <Box key={post._id} sx={{ display: 'flex' }}>
            <PostCard
              post={post}
              index={index}
              isBookmarked={bookmarkedPosts.has(post._id)}
              user={user}
              onEdit={onEditPost}
              onLike={onLikePost}
              onDislike={onDislikePost}
              onBookmark={onBookmarkPost}
            />
          </Box>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => onPageChange(value)}
            color="primary"
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: 2,
                margin: '0 4px',
                fontWeight: 600,
              },
              '& .MuiPaginationItem-page.Mui-selected': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default PostsGrid;