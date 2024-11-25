import React, { useState } from 'react';
import { Box, Typography, TextField, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Button, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { countryRegulations } from '../data/taxRegulations';

const TaxRegulations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredRegulations = countryRegulations.filter(reg => {
    const matchesSearch = reg.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || reg.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'import duties', 'vat', 'customs', 'restricted items'];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Global Tax & Duty Regulations
      </Typography>
      
      <Card sx={{ mb: 3, p: 2, backgroundColor: '#f5f5f5' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Search Regulations
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by country or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'contained' : 'outlined'}
                    onClick={() => setSelectedCategory(category)}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {category}
                  </Button>
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {filteredRegulations.map((regulation, index) => (
        <Accordion key={index} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 2 }}>
              <Typography variant="h6">{regulation.country}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Last Updated: {regulation.lastUpdated}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>{regulation.summary}</Typography>
            
            {regulation.details.map((detail, idx) => (
              <Box key={idx} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {detail.title}
                </Typography>
                <Typography paragraph>{detail.content}</Typography>
                {detail.rates && (
                  <Box sx={{ pl: 2 }}>
                    {detail.rates.map((rate, rateIdx) => (
                      <Typography key={rateIdx}>• {rate}</Typography>
                    ))}
                  </Box>
                )}
              </Box>
            ))}

            {regulation.links && (
              <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #eee' }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Official Resources
                </Typography>
                {regulation.links.map((link, linkIdx) => (
                  <Typography key={linkIdx} component="a" href={link.url} target="_blank" rel="noopener noreferrer"
                    sx={{ display: 'block', color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                    • {link.title}
                  </Typography>
                ))}
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default TaxRegulations;
