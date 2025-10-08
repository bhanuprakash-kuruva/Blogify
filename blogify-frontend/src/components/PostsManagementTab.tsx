// components/dashboard/PostsManagementTab.tsx
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Avatar,
} from '@mui/material';
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import type { Post } from '../services/dashboardApi';

interface PostsManagementTabProps {
  posts: Post[];
  page: number;
  rowsPerPage: number;
  openPostModal: (post: Post | null) => void;
  openDeleteModal: (type: string, id: string, name: string) => void;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
}

const PostsManagementTab: React.FC<PostsManagementTabProps> = ({
  posts,
  page,
  rowsPerPage,
  openPostModal,
  openDeleteModal,
  setPage,
  setRowsPerPage,
}) => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Posts Management</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => openPostModal(null)}
        >
          New Post
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Likes/Dislikes</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((post) => (
                <TableRow key={post._id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {post.imageUrl && (
                        <Avatar src={post.imageUrl} variant="rounded" sx={{ width: 40, height: 40 }} />
                      )}
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {post.title}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip label={post.category?.name || 'Uncategorized'} size="small" />
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {post.tags?.slice(0, 2).map((tag, index) => (
                        <Chip key={index} label={tag} size="small" variant="outlined" />
                      ))}
                      {post.tags && post.tags.length > 2 && (
                        <Chip label={`+${post.tags.length - 2}`} size="small" />
                      )}
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip 
                      label={post.status} 
                      color={post.status === 'published' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Typography variant="body2">{post.likes?.length || 0}</Typography>
                      <Typography variant="body2">/</Typography>
                      <Typography variant="body2">{post.dislikes?.length || 0}</Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown'}
                  </TableCell>

                  <TableCell>
                    <Button
                      size="small"
                      startIcon={<Edit />}
                      onClick={() => openPostModal(post)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => openDeleteModal('post', post._id, post.title)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={posts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </>
  );
};

export default PostsManagementTab;
