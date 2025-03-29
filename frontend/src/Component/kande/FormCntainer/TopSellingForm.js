import React from 'react';
import { Box, Container, Paper } from '@mui/material';

const FormContainer = ({ children }) => {
  return (
    <Box sx={{ mt: 5, mb: 5 }}>
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            color: 'black',
            fontWeight: 500,
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  );
};

export default FormContainer;