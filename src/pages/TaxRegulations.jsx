import React from 'react';
import TaxRegulationsComponent from '../components/TaxRegulations';
import { Box, Typography, Paper } from '@mui/material';

const TaxRegulationsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Tax & Duty Regulations Guide
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Understand import duties, taxes, and regulations for different countries to make informed decisions about your international business expansion.
        </Typography>
      </Paper>
      
      <TaxRegulationsComponent />
    </Box>
  );
};

export default TaxRegulationsPage;
