import React from 'react';
import AddTopfertilizer from '../../Component/kande/AddTopfertilizer';
import backgroundImage from '../../images/common/background.avif';
import { Box } from '@mui/material';

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
      <header />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 3,
        }}
      >
        <AddTopfertilizer />
      </Box>
    </Box>
  );
};

export default Topfertilizer;
