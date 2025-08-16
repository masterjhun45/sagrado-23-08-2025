import React, { useEffect, useState } from 'react';
import { 
  Card, CardHeader, CardContent, Typography, Box, Avatar, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, Button
} from '@mui/material';
import { LocationOn, Agriculture, Phone, Email, Badge, CalendarToday, Edit } from '@mui/icons-material';

function BeneficiaryProfile() {
  const [beneficiary, setBeneficiary] = useState(null);

  useEffect(() => {
    // Try localStorage first, fallback to sessionStorage
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setBeneficiary({
          name: user.name || 'N/A',
          farmerId: user.farmerId || 'N/A',
          location: user.location || 'N/A',
          barangay: user.barangay || 'N/A',
          farmSize: user.farmSize || 'N/A',
          cropTypes: user.cropTypes || [],
          phone: user.phone || 'N/A',
          email: user.email || 'N/A',
          status: user.status || 'Active Beneficiary',
          memberSince: user.memberSince || 'N/A',
          lastUpdate: user.lastUpdate || 'N/A'
        });
      } catch (error) {
        console.error('Error parsing beneficiary from storage', error);
      }
    }
  }, []);

  if (!beneficiary) return <Typography>Loading beneficiary profile...</Typography>;

  return (
    <Card>
      <CardHeader 
        title="Beneficiary Profile"
        action={
          <Button variant="outlined" startIcon={<Edit />} size="small">
            Update
          </Button>
        }
      />
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar 
            sx={{ bgcolor: 'primary.main', mr: 2, width: 64, height: 64, fontSize: '1.5rem' }}
          >
            {beneficiary.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>{beneficiary.name}</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Farmer ID: {beneficiary.farmerId}
            </Typography>
            <Chip label={beneficiary.status} color="success" size="small" />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" gutterBottom color="primary">Contact Information</Typography>
        <List dense sx={{ mb: 2 }}>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 36 }}><LocationOn color="action" fontSize="small" /></ListItemIcon>
            <ListItemText primary={beneficiary.location} secondary="Farm Location" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 36 }}><Phone color="action" fontSize="small" /></ListItemIcon>
            <ListItemText primary={beneficiary.phone} secondary="Mobile Number" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 36 }}><Email color="action" fontSize="small" /></ListItemIcon>
            <ListItemText primary={beneficiary.email} secondary="Email Address" />
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" gutterBottom color="primary">Farm Details</Typography>
        <List dense sx={{ mb: 2 }}>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 36 }}><Agriculture color="action" fontSize="small" /></ListItemIcon>
            <ListItemText primary={beneficiary.farmSize} secondary="Total Farm Area" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 36 }}><Badge color="action" fontSize="small" /></ListItemIcon>
            <ListItemText primary={beneficiary.cropTypes.join(', ')} secondary="Primary Crops" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 36 }}><CalendarToday color="action" fontSize="small" /></ListItemIcon>
            <ListItemText primary={`Member since ${beneficiary.memberSince}`} secondary="Program Participation" />
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="caption" color="text.secondary">
          Profile last updated: {beneficiary.lastUpdate}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BeneficiaryProfile;
