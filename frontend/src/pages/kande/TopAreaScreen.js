import React from 'react';
import AddTopAreas from '../../Component/kande/AddTopAreas';
import backgroundImage from '../../images/common/background.avif';
import { Box } from '@mui/material';

const TopAreas = () => {
    return (
        <Box
            sx={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
            }}
        >
            <AddTopAreas />
        </Box>
    );
};

export default TopAreas;
