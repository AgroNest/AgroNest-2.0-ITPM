import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';

const TopFertilizerInputData = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8070/order/displayAll');
        setFertilizers(response.data);
        setLoading(false);
        renderChart(response.data);
      } catch (error) {
        console.error('Error fetching top areas:', error);
      }
    };

    fetchData();
  }, []);

  const renderChart = (fertilizersData) => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx || !fertilizersData) return;

    const productMap = new Map();
    fertilizersData.forEach((fertilizer) => {
      const quantity = parseInt(fertilizer.quantity);
      const name = fertilizer.name;
      if (!isNaN(quantity)) {
        productMap.set(name, (productMap.get(name) || 0) + quantity);
      }
    });

    const labels = Array.from(productMap.keys());
    const data = labels.map((name) => productMap.get(name));

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Quantity',
            data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { mode: 'index', intersect: false },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Product Name',
              color: '#333',
              font: { weight: 600 },
            },
            ticks: { color: '#333' },
            grid: { color: 'rgba(0, 0, 0, 0.1)' },
          },
          y: {
            title: {
              display: true,
              text: 'Quantity',
              color: '#333',
              font: { weight: 600 },
            },
            ticks: { color: '#333' },
            grid: { color: 'rgba(0, 0, 0, 0.1)' },
          },
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart',
        },
      },
    });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mt={4}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Paper elevation={3} sx={{ p: 3, width: { xs: '90%', sm: '600px' } }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Fertilizer Categories & Sales
          </Typography>
          <canvas ref={chartRef} style={{ width: '100%', height: '300px' }}></canvas>
        </Paper>
      )}
    </Box>
  );
};

export default TopFertilizerInputData;