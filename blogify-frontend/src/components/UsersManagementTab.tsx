// components/dashboard/UsersManagementTab.tsx
import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Avatar,
  Chip,
} from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import type { User } from '../services/dashboardApi';

interface UsersManagementTabProps {
  users: User[];
  usersPage: number;
  usersRowsPerPage: number;
  usersTotal: number;
  currentUser: User | null;
  handleUpdateUserRole: (userId: string, newRole: 'user' | 'admin') => void;
  openDeleteModal: (type: string, id: string, name: string) => void;
  setUsersPage: (page: number) => void;
  setUsersRowsPerPage: (rowsPerPage: number) => void;
}

const UsersManagementTab: React.FC<UsersManagementTabProps> = ({
  users,
  usersPage,
  usersRowsPerPage,
  usersTotal,
  currentUser,
  handleUpdateUserRole,
  openDeleteModal,
  setUsersPage,
  setUsersRowsPerPage,
}) => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Users Management</Typography>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Joined</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.length > 0 ? (
              users
                .slice(
                  usersPage * usersRowsPerPage,
                  usersPage * usersRowsPerPage + usersRowsPerPage
                )
                .map((userItem) => (
                  <TableRow key={userItem._id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {userItem.name?.[0]?.toUpperCase() || userItem.email?.[0]?.toUpperCase() || 'U'}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {userItem.name || 'No Name'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {userItem.postCount || 0} posts
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>{userItem.email || 'No Email'}</TableCell>

                    <TableCell>
                      <Chip
                        label={userItem.role || 'user'}
                        color={userItem.role === 'admin' ? 'secondary' : 'default'}
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      {userItem.createdAt
                        ? new Date(userItem.createdAt).toLocaleDateString()
                        : 'Unknown'}
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {userItem._id !== currentUser?._id && (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() =>
                              handleUpdateUserRole(
                                userItem._id,
                                userItem.role === 'admin' ? 'user' : 'admin'
                              )
                            }
                          >
                            Make {userItem.role === 'admin' ? 'User' : 'Admin'}
                          </Button>
                        )}

                        {userItem._id !== currentUser?._id && (
                          <Button
                            size="small"
                            color="error"
                            startIcon={<Delete />}
                            onClick={() =>
                              openDeleteModal(
                                'user',
                                userItem._id,
                                userItem.name || userItem.email
                              )
                            }
                          >
                            Delete
                          </Button>
                        )}

                        {userItem._id === currentUser?._id && (
                          <Typography variant="body2" color="text.secondary">
                            Current User
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body2" color="text.secondary">
                    No users found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {users && users.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={usersTotal}
          rowsPerPage={usersRowsPerPage}
          page={usersPage}
          onPageChange={(e, newPage) => setUsersPage(newPage)}
          onRowsPerPageChange={(e) => {
            setUsersRowsPerPage(parseInt(e.target.value, 10));
            setUsersPage(0);
          }}
        />
      )}
    </>
  );
};

export default UsersManagementTab;
