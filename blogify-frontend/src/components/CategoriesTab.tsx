// components/dashboard/CategoriesTab.tsx
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import type { Category, Post } from '../services/dashboardApi';

interface CategoriesTabProps {
  categories: Category[];
  posts: Post[];
  openCategoryModal: (category: Category | null) => void;
  openDeleteModal: (type: 'category', id: string, name: string) => void;
}

const CategoriesTab: React.FC<CategoriesTabProps> = ({
  categories,
  posts,
  openCategoryModal,
  openDeleteModal,
}) => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Categories Management</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => openCategoryModal(null)}
        >
          New Category
        </Button>
      </Box>

      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {posts.filter(post => post.category?._id === category._id).length} posts
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  startIcon={<Edit />}
                  onClick={() => openCategoryModal(category)}
                >
                  Edit
                </Button>
                <Button 
                  size="small" 
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => openDeleteModal('category', category._id, category.name)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CategoriesTab;
