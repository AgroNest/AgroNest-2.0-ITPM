import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Box, Typography } from '@mui/material';

const FertilizerAnalysisChart = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8070/topfertilizercategory/');
        setFertilizers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching fertilizer analysis:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && fertilizers.length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: fertilizers.map((item) => item.fertilizername),
          datasets: [
            {
              label: 'Number of Sales',
              data: fertilizers.map((item) => item.noofsales),
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
            y: { beginAtZero: true },
          },
        },
      });
    }
  }, [fertilizers, loading]);

  return (
    <Box sx={{ width: 600, height: 400 }}>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Fertilizer Analysis
          </Typography>
          <canvas ref={chartRef}></canvas>
        </>
      )}
    </Box>
  );
};

export default FertilizerAnalysisChart;
