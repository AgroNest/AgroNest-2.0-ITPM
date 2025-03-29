import React from 'react';
import { Button, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TopSellerChart from '../../pages/kande/TopSellerChart';
import FertilizerAnalysisChart from '../../pages/kande/TopFertilizerChart.js';
import TopAreasChart from '../../pages/kande/TopAreaChart.js';
import Sidebar from './Sidebar/Sidebar.js';

const SysManagerDashboard = () => {
    const navigate = useNavigate();

    return (
        <Box display="flex">
            <Sidebar />

            <Box
                sx={{
                    backgroundColor: '#f7f7f7',
                    minHeight: '100vh',
                    flexGrow: 1,
                    padding: '20px',
                    ml: '240px', // leave space for sidebar
                }}
            >
                <Grid container spacing={2} justifyContent="center" sx={{ mt: 5 }}>
                    <Grid item>
                        <Button
                            variant="contained"
                            sx={{ width: 250, height: 100 }}
                            onClick={() => navigate('/addtopfertilizers')}
                        >
                            Add Top Performing Fertilizer Category
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            sx={{ width: 250, height: 100 }}
                            onClick={() => navigate('/addtopsellingfertilizers')}
                        >
                            Add Top Selling Dealer
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            sx={{ width: 250, height: 100 }}
                            onClick={() => navigate('/addtopareas')}
                        >
                            Add Areas With Highest Registrations
                        </Button>
                    </Grid>
                </Grid>

                <Grid container spacing={2} justifyContent="center" sx={{ mt: 5 }}>
                    <Grid item xs={12} md={8}>
                        <Box sx={{ backgroundColor: '#e0e0e0', padding: 2 }}>
                            <TopSellerChart />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Box sx={{ backgroundColor: '#e0e0e0', padding: 2 }}>
                            <FertilizerAnalysisChart />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Box sx={{ backgroundColor: '#e0e0e0', padding: 2 }}>
                            <TopAreasChart />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default SysManagerDashboard;
