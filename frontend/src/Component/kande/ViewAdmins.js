import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Typography, Box
} from '@mui/material';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    username: '',
    city: '',
    phone: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/admin');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    setDeleteUserId(id);
    setConfirmationOpen(true);
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setUpdatedUser({
      username: user.username,
      city: user.city,
      phone: user.phone,
      email: user.email,
      address: user.address,
    });
    setUpdateDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8070/api/admin/${deleteUserId}`);
      const response = await axios.get('http://localhost:8070/api/admin');
      setUsers(response.data);
      setConfirmationOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCloseUpdateDialog = () => setUpdateDialogOpen(false);

  const handleUpdateInputChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:8070/api/admin/${selectedUser._id}`, updatedUser);
      const response = await axios.get('http://localhost:8070/api/admin');
      setUsers(response.data);
      setUpdateDialogOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>User Table</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.city}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>
                <Button variant="contained" color="error" sx={{ mr: 1 }} onClick={() => handleDelete(user._id)}>Delete</Button>
                <Button variant="contained" color="primary" onClick={() => handleUpdate(user)}>Update</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Dialog */}
      <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this user?</DialogContent>
        <DialogActions>
          <Button onClick={confirmDelete} color="error">Confirm</Button>
          <Button onClick={() => setConfirmationOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Update Dialog */}
      <Dialog open={updateDialogOpen} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          {['username', 'city', 'phone', 'email', 'address'].map((field) => (
            <TextField
              key={field}
              margin="dense"
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              value={updatedUser[field]}
              onChange={handleUpdateInputChange}
              fullWidth
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateSubmit} variant="contained">Update</Button>
          <Button onClick={handleCloseUpdateDialog} variant="outlined" color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserTable;