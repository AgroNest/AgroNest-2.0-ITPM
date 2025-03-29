import React, { useState } from 'react';
import { TextField, Button, ToggleButton, ToggleButtonGroup, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FertilizerForm from './FormCntainer/FertilizerForm';
import backgroundImage from '../../images/common/background.avif';
import axios from 'axios';
import TopareasInput from '../../pages/kande/DataInsertGraphs/TopareasInput';

const AddTopAreas = () => {
  const [area, setArea] = useState('');
  const [noofRegistrations, setnoofRegistrations] = useState('');
  const [page, setPage] = useState('add');
  const navigate = useNavigate();

  const handlePageChange = (event, newPage) => {
    if (newPage === 'add') {
      setPage('add');
    } else if (newPage === 'view') {
      navigate('/ViewTopRegisterdArea');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isNaN(parseInt(area.trim()))) {
      alert('Name cannot be a number.');
    } else {
      try {
        const response = await axios.post('http://localhost:8070/toparea/add', {
          area: area,
          noofRegistrations: noofRegistrations,
        });
        if (response.status === 200) {
          alert('Highest registration area added Successfully');
          setArea('');
          setnoofRegistrations('');
        } else {
          alert('Failed to add Highest registration area. Please try again.');
        }
      } catch (error) {
        console.error('Error adding top registration area:', error);
        alert('Failed to add top registration area. Please try again.');
      }
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        py: 5,
      }}
    >
      {/* Page Switch */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <ToggleButtonGroup
          value={page}
          exclusive
          onChange={handlePageChange}
          aria-label="page switch"
        >
          <ToggleButton value="add" aria-label="add page">
            Add
          </ToggleButton>
          <ToggleButton value="view" aria-label="view page">
            View
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Chart */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <TopareasInput />
      </Box>

      {/* Form */}
      <FertilizerForm>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Areas with Highest Dealer Registrations
        </Typography>
        <form onSubmit={submitHandler}>
          <TextField
            label="Area"
            fullWidth
            required
            value={area}
            onChange={(e) => setArea(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Number Of Registrations"
            fullWidth
            required
            type="number"
            value={noofRegistrations}
            onChange={(e) => setnoofRegistrations(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ height: '50px' }}>
            Submit
          </Button>
        </form>
      </FertilizerForm>
    </Box>
  );
};

export default AddTopAreas;