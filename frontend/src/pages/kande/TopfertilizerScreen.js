import React from 'react';
import { Box } from '@mui/material';
import AddTopfertilizer from '../../Component/kande/AddTopfertilizer';
import backgroundImage from '../../images/common/background.avif';

const Topfertilizer = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <AddTopfertilizer />
      </Box>
    </Box>
  );
};

export default Topfertilizer;