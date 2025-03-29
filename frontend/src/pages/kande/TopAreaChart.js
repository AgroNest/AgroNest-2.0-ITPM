import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Box, Typography, CircularProgress } from '@mui/material';

const TopAreasChart = () => {
    const [topAreas, setTopAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8070/toparea/');
                setTopAreas(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching top areas:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!loading) {
            renderChart();
        }
    }, [loading, topAreas]);

    const renderChart = () => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: topAreas.map((area) => area.area),
                datasets: [
                    {
                        label: 'Number of Registrations',
                        data: topAreas.map((area) => area.noofRegistrations),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Registrations',
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Area',
                        },
                    },
                },
            },
        });
    };

    return (
        <Box sx={{ width: 600, height: 400, margin: '0 auto' }}>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <Typography variant="h5" align="center" fontWeight={700} gutterBottom>
                        Top Areas
                    </Typography>
                    <canvas ref={chartRef}></canvas>
                </>
            )}
        </Box>
    );
};

export default TopAreasChart;
