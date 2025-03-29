import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Box, Typography, CircularProgress } from '@mui/material';

const TopSellerChart = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8070/topdealer/');
        setTopSellers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching top dealers:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && topSellers.length > 0) {
      renderChart(topSellers);
    }
  }, [loading, topSellers]);

  const renderChart = (dealers) => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dealers.map((dealer) => dealer.dealername),
        datasets: [
          {
            label: 'Number of Sales',
            data: dealers.map((dealer) => dealer.noofsales),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <Box sx={{ width: '600px', height: '400px' }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Top Sellers
          </Typography>
          <canvas ref={chartRef} id="Sellerlinechart" />
        </>
      )}
    </Box>
  );
};

export default TopSellerChart;
