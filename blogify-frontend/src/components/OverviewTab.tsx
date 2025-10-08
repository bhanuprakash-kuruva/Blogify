// components/dashboard/OverviewTab.tsx
import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
} from '@mui/material';
import { Add, Category } from '@mui/icons-material';
import type { Post } from '../services/dashboardApi';

interface OverviewTabProps {
  posts: Post[];
  openPostModal: () => void;
  openCategoryModal: () => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  posts,
  openPostModal,
  openCategoryModal,
}) => {
  return (
    <Grid container spacing={3}>
      {/* Recent Posts */}
      <Grid item xs={12} md={8}>
        <Typography variant="h5" gutterBottom>
          Recent Posts
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Likes</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.slice(0, 5).map((post) => (
                <TableRow key={post._id}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>
                    <Chip
                      label={post.category?.name || 'Uncategorized'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={post.status}
                      color={post.status === 'published' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{post.likes?.length || 0}</TableCell>
                  <TableCell>
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString()
                      : 'Unknown'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {/* Quick Actions */}
      <Grid item xs={12} md={4}>
        <Typography variant="h5" gutterBottom>
          Quick Actions
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={openPostModal}
          >
            Create New Post
          </Button>
          <Button
            variant="outlined"
            startIcon={<Category />}
            onClick={openCategoryModal}
          >
            Manage Categories
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OverviewTab;
