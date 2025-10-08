import React from "react";
import { Stack, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import AuthorCard from "./AuthorCard";
import StatsCard from "./StatsCard";
import type { Post, Comment } from "../../types";

interface PostSidebarProps {
  post: Post;
  comments: Comment[];
  isBookmarked: boolean;
  isTablet: boolean;
}

const PostSidebar: React.FC<PostSidebarProps> = ({
  post,
  comments,
  isBookmarked,
  isTablet,
}) => {
  const theme = useTheme();

  return (
    <Stack spacing={3}>
      {/* Author Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <AuthorCard 
          author={post.author} 
          createdAt={post.createdAt}
          isTablet={isTablet}
        />
      </motion.div>

      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <StatsCard 
          post={post}
          comments={comments}
          isBookmarked={isBookmarked}
          isTablet={isTablet}
        />
      </motion.div>

      {/* Related Posts Card (Optional) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        {/* You can add related posts component here */}
      </motion.div>
    </Stack>
  );
};

export default PostSidebar;