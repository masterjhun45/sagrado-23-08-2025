import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Grid
} from '@mui/material';
import { 
  Assignment
} from '@mui/icons-material';

function SubsidyStatus() {
  const subsidyData = {
    approved: 3,
    pending: 2,
    completed: 1,
    total: 6
  };

  return (
    <Card sx={{ background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)', color: 'white' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Assignment sx={{ mr: 1, fontSize: 28 }} />
          <Typography variant="h5" fontWeight="bold">
            My Subsidy Applications
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={6} md={3}>
            <Box textAlign="center">
              <Typography variant="h3" fontWeight="bold">
                {subsidyData.approved}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Approved
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={3}>
            <Box textAlign="center">
              <Typography variant="h3" fontWeight="bold" color="warning.light">
                {subsidyData.pending}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Under Review
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={3}>
            <Box textAlign="center">
              <Typography variant="h3" fontWeight="bold" color="info.light">
                {subsidyData.completed}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Completed
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={3}>
            <Box textAlign="center">
              <Typography variant="h3" fontWeight="bold">
                {subsidyData.total}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Total Applied
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
          Last application: August 10, 2024 • Rice Production Support Program
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SubsidyStatus;