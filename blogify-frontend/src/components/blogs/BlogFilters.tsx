import React from "react";
import {
  Grid,
  TextField as MuiTextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Button,
  Box,
  useTheme,
  alpha,
  Chip,
  Fade,
  IconButton,
  Tooltip, Typography
} from "@mui/material";
import { 
  Search, 
  Clear, 
  FilterList, 
  Category as CategoryIcon,
  Refresh 
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import type { Category } from "./types";

interface BlogFiltersProps {
  searchTerm: string;
  selectedCategory: string;
  categories: Category[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onClearFilters: () => void;
}

const MotionBox = motion(Box);

const BlogFilters: React.FC<BlogFiltersProps> = ({
  searchTerm,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
  onClearFilters,
}) => {
  const theme = useTheme();
  
  const hasActiveFilters = searchTerm || selectedCategory;
  const selectedCategoryName = categories.find(cat => cat._id === selectedCategory)?.name;

  return (
    <MotionBox
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{ mb: 4 }}
    >
      {/* Active Filters Display */}
      <AnimatePresence>
        {hasActiveFilters && (
          <MotionBox
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            sx={{ mb: 2 }}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              flexWrap: 'wrap' 
            }}>
              <FilterList 
                sx={{ 
                  fontSize: 18, 
                  color: theme.palette.primary.main 
                }} 
              />
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ mr: 1 }}
              >
                Active filters:
              </Typography>
              
              {searchTerm && (
                <Chip
                  label={`Search: "${searchTerm}"`}
                  size="small"
                  onDelete={() => onSearchChange('')}
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                    '& .MuiChip-deleteIcon': {
                      color: theme.palette.primary.main,
                      '&:hover': {
                        color: theme.palette.primary.dark,
                      }
                    }
                  }}
                />
              )}
              
              {selectedCategory && (
                <Chip
                  icon={<CategoryIcon sx={{ fontSize: 16 }} />}
                  label={`Category: ${selectedCategoryName}`}
                  size="small"
                  onDelete={() => onCategoryChange('')}
                  sx={{
                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                    color: theme.palette.secondary.main,
                    fontWeight: 500,
                    '& .MuiChip-deleteIcon': {
                      color: theme.palette.secondary.main,
                      '&:hover': {
                        color: theme.palette.secondary.dark,
                      }
                    }
                  }}
                />
              )}
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>

      {/* Filters Grid */}
      <Box
        sx={{
          p: 3,
          borderRadius: 4,
          bgcolor: alpha(theme.palette.background.paper, 0.8),
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.4)} 100%)`,
          backdropFilter: 'blur(10px)',
          boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.08)}`,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {/* Search Field */}
          <Grid item xs={12} md={6}>
            <MuiTextField
              fullWidth
              placeholder="Search blogs by title, content, or tags..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search 
                      sx={{ 
                        color: theme.palette.primary.main,
                        fontSize: 20 
                      }} 
                    />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => onSearchChange('')}
                      sx={{
                        color: theme.palette.text.secondary,
                        '&:hover': {
                          color: theme.palette.primary.main,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                        }
                      }}
                    >
                      <Clear sx={{ fontSize: 18 }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  bgcolor: alpha(theme.palette.background.paper, 0.6),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.background.paper, 0.8),
                    boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.1)}`,
                  },
                  '&.Mui-focused': {
                    bgcolor: theme.palette.background.paper,
                    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
                    borderColor: theme.palette.primary.main,
                  },
                },
                '& .MuiOutlinedInput-input': {
                  py: 1.5,
                }
              }}
            />
          </Grid>

          {/* Category Filter */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  color: theme.palette.text.secondary,
                  '&.Mui-focused': {
                    color: theme.palette.primary.main,
                  }
                }}
              >
                Category
              </InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => onCategoryChange(e.target.value)}
                startAdornment={
                  <InputAdornment position="start" sx={{ ml: 1 }}>
                    <CategoryIcon 
                      sx={{ 
                        fontSize: 20,
                        color: selectedCategory ? theme.palette.primary.main : theme.palette.text.secondary
                      }} 
                    />
                  </InputAdornment>
                }
                sx={{
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  bgcolor: alpha(theme.palette.background.paper, 0.6),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.background.paper, 0.8),
                    boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.1)}`,
                  },
                  '&.Mui-focused': {
                    bgcolor: theme.palette.background.paper,
                    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                    }
                  },
                  '& .MuiSelect-select': {
                    py: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                  }
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: 2,
                      mt: 1,
                      boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.12)}`,
                      '& .MuiMenuItem-root': {
                        py: 1.5,
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.08),
                        },
                        '&.Mui-selected': {
                          bgcolor: alpha(theme.palette.primary.main, 0.12),
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.16),
                          }
                        }
                      }
                    }
                  }
                }}
              >
                <MenuItem value="">
                  <em>All Categories</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem 
                    key={category._id} 
                    value={category._id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: theme.palette.primary.main,
                      }}
                    />
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Clear Filters Button */}
          <Grid item xs={12} md={2}>
            <Tooltip 
              title="Clear all filters" 
              placement="top"
              arrow
            >
              <Button
                variant={hasActiveFilters ? "contained" : "outlined"}
                fullWidth
                onClick={onClearFilters}
                startIcon={<Refresh sx={{ fontSize: 18 }} />}
                disabled={!hasActiveFilters}
                sx={{
                  borderRadius: 3,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  transition: 'all 0.3s ease',
                  boxShadow: hasActiveFilters 
                    ? `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`
                    : 'none',
                  '&:hover': {
                    transform: hasActiveFilters ? 'translateY(-2px)' : 'none',
                    boxShadow: hasActiveFilters 
                      ? `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`
                      : 'none',
                  },
                  '&:disabled': {
                    bgcolor: alpha(theme.palette.text.disabled, 0.1),
                    color: theme.palette.text.disabled,
                    borderColor: alpha(theme.palette.text.disabled, 0.3),
                  }
                }}
              >
                {hasActiveFilters ? 'Clear' : 'Clear All'}
              </Button>
            </Tooltip>
          </Grid>
        </Grid>

        {/* Quick Category Chips */}
        {categories.length > 0 && (
          <Fade in timeout={800}>
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ width: '100%', mb: 1 }}
              >
                Quick categories:
              </Typography>
              {categories.slice(0, 5).map((category) => (
                <Chip
                  key={category._id}
                  label={category.name}
                  size="small"
                  clickable
                  variant={selectedCategory === category._id ? "filled" : "outlined"}
                  onClick={() => onCategoryChange(
                    selectedCategory === category._id ? '' : category._id
                  )}
                  sx={{
                    borderRadius: 2,
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    ...(selectedCategory === category._id 
                      ? {
                          bgcolor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                          boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
                        }
                      : {
                          bgcolor: 'transparent',
                          borderColor: alpha(theme.palette.primary.main, 0.3),
                          color: theme.palette.text.secondary,
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                          }
                        }
                    )
                  }}
                />
              ))}
            </Box>
          </Fade>
        )}
      </Box>
    </MotionBox>
  );
};

export default BlogFilters;