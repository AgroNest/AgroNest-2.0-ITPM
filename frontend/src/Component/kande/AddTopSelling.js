import React, { useState } from 'react';
import { TextField, Button, ToggleButton, ToggleButtonGroup, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FertilizerForm from './FormCntainer/FertilizerForm';
import axios from 'axios';
import TopFertilizerInputData from '../../pages/kande/DataInsertGraphs/TopSellerInputGraphs';

const AddTopSelling = () => {
  const [name, setName] = useState('');
  const [sales, setSales] = useState('');
  const [page, setPage] = useState('add');
  const navigate = useNavigate();

  const handlePageChange = (event, newPage) => {
    if (newPage === 'add') {
      setPage('add');
    } else if (newPage === 'view') {
      navigate('/TopSellers');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isNaN(parseInt(name.trim()))) {
      alert('Name cannot be a number.');
    } else {
      try {
        const response = await axios.post(
          'http://localhost:8070/topdealer/add',
          {
            dealername: name,
            noofsales: sales,
          }
        );

        if (response.status === 200) {
          alert('Top Dealer Added Successfully');
          setName('');
          setSales('');
        } else {
          alert('Failed to add top dealer. Please try again.');
        }
      } catch (error) {
        console.error('Error adding top dealer:', error);
        alert('Failed to add top dealer. Please try again.');
      }
    }
  };

  return (
    <>
      {/* Page Switch */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
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
          Add Top Rated Dealers
        </Typography>

        <form onSubmit={submitHandler}>
          <TextField
            label="Dealer Name"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Rating"
            fullWidth
            required
            type="number"
            inputProps={{ min: 0 }}
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
    </>
  );
};

export default AddTopSelling;