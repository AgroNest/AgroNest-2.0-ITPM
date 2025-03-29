import React, { useState } from 'react';
import { TextField, Button, ToggleButton, ToggleButtonGroup, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FertilizerForm from './FormCntainer/FertilizerForm';
import TopFertilizerInputData from '../../pages/kande/DataInsertGraphs/TopFertilizerInputData';
import axios from 'axios';

const AddTopfertilizer = () => {
  const [name, setName] = useState('');
  const [sales, setSales] = useState('');
  const [page, setPage] = useState('add');
  const navigate = useNavigate();

  const handlePageChange = (event, newPage) => {
    if (newPage === 'add') {
      setPage('add');
    } else if (newPage === 'view') {
      navigate('/viewtopfertilizers');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isNaN(parseInt(name.trim()))) {
      alert('Name cannot be a number.');
    } else {
      try {
        const response = await axios.post(
          'http://localhost:8070/topfertilizercategory/add',
          {
            fertilizername: name,
            noofsales: sales,
          }
        );

        if (response.status === 200) {
          alert('Top Fertilizer Added Successfully');
          setName('');
          setSales('');
        } else {
          alert('Failed to add top fertilizer. Please try again.');
        }
      } catch (error) {
        console.error('Error adding top fertilizer:', error);
        alert('Failed to add top fertilizer. Please try again.');
      }
    }
  };

  return (
    <Box sx={{ mt: 5 }}>
      {/* Page switch */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <ToggleButtonGroup
          value={page}
          exclusive
          onChange={handlePageChange}
          aria-label="page switch"
        >
          <ToggleButton value="add">Add</ToggleButton>
          <ToggleButton value="view">View</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Chart */}
      <Box
        sx={{
          backgroundColor: 'rgba(224, 224, 224, 0.5)',
          backdropFilter: 'blur(10px)',
          p: 2,
          mt: 3,
          mx: 'auto',
          width: 700,
          borderRadius: 2,
        }}
      >
        <TopFertilizerInputData />
      </Box>

      {/* Form */}
      <FertilizerForm>
        <Typography variant="h5" gutterBottom>
          Add Top Fertilizer
        </Typography>

        <form onSubmit={submitHandler}>
          <TextField
            label="Fertilizer Name"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Number of Sales"
            fullWidth
            required
            type="number"
            inputProps={{ min: 1 }}
            value={sales}
            onChange={(e) => setSales(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ height: '50px' }}
          >
            Submit
          </Button>
        </form>
      </FertilizerForm>

      <br />
    </Box>
  );
};

export default AddTopfertilizer;