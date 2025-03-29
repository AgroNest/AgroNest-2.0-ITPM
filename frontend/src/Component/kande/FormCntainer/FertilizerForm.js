import React from 'react';
import { Container, Box, Grid, Paper } from '@mui/material';

const FormContainer = ({ children }) => {
  return (
    <Box mt={5} mb={5}>
      <Container>
        <Grid container justifyContent="center" mt={2} className="formlog">
          <Grid item xs={12} md={7}>
            <Paper
              elevation={3}
              sx={{
                p: 5,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                color: 'black',
                fontWeight: 500,
              }}
            >
              {children}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FormContainer;