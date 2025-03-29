import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Link as MuiLink
} from '@mui/material';

export default function MLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8070/Mlogin', {
        username,
        password,
      });

      console.log(response.data);
      navigate('/managerdashboard');
      window.location.reload();
      alert('Successfully logged in');
    } catch (err) {
      console.error('Error logging in:', err.message);
      alert('Error logging in. Email or Password Incorrect');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin();
    } catch (err) {
      console.error('Error handling login:', err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ height: '100vh', backgroundColor: '#9A616D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', width: { xs: '90%', md: '70%' }, maxWidth: 900 }}>
        <Grid container>
          <Grid item xs={12} md={5}>
            <Box component="img"
              src="https://s3.envato.com/files/477648983/655346060e3c4c426d902398_withmeta.jpg"
              alt="login"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={12} md={7} sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>Welcome</Typography>
            <Typography variant="subtitle1" gutterBottom>Sign into your account</Typography>

            <TextField
              type="email"
              label="Email address"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <TextField
              type="password"
              label="Password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ mt: 2 }}
            >
              Login
            </Button>

            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <MuiLink href="#" variant="body2" underline="hover">Forgot password?</MuiLink>
              <MuiLink href="#" variant="body2" underline="hover">Terms of use</MuiLink>
              <MuiLink href="#" variant="body2" underline="hover">Privacy policy</MuiLink>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}