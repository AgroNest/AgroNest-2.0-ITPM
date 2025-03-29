import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Box,
  Paper,
  Stack,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Form = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    city: '',
    phone: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8070/api/admin', formData);
      alert('Data submitted successfully');
      setFormData({
        username: '',
        password: '',
        city: '',
        phone: '',
        email: '',
        address: '',
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4} direction="row" justifyContent="center">
          <Link to="/viewadmin" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" sx={{ width: 300 }}>
              View Admin Panel
            </Button>
          </Link>
          <Paper elevation={3} sx={{ p: 4, width: 500 }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  type="password"
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  type="email"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Stack>
            </form>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default Form;