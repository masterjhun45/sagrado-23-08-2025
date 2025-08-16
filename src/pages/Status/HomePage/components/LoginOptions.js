import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Person, AdminPanelSettings, Agriculture } from '@mui/icons-material';

const LoginOptions = () => {
  const navigate = useNavigate();

  const loginOptions = [
    {
      title: 'Beneficiary Portal',
      description: 'Access your agricultural benefits, subsidies, and program updates',
      icon: <Person sx={{ fontSize: 48 }} />,
      color: 'primary',
      buttons: [
        { label: 'Login', path: '/beneficiary-login', variant: 'contained' },
        { label: 'Register', path: '/beneficiary-register', variant: 'outlined' }
      ]
    },
    {
      title: 'Coordinator Access',
      description: 'Manage programs, track beneficiary, and coordinate activities',
      icon: <Agriculture sx={{ fontSize: 48 }} />,
      color: 'secondary',
      buttons: [
        { label: 'Login', path: '/coordinator-login', variant: 'outlined' }
      ]
    },
    {
      title: 'Administrator',
      description: 'System administration and program oversight',
      icon: <AdminPanelSettings sx={{ fontSize: 48 }} />,
      color: 'warning',
      buttons: [
        { label: 'Login', path: '/login', variant: 'text' }
      ]
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h3" textAlign="center" gutterBottom fontWeight={600}>
          Access Your Portal
        </Typography>
        
        <Typography 
          variant="body1" 
          textAlign="center" 
          color="text.secondary" 
          sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}
        >
          Choose your role to access the appropriate portal and manage your agricultural programs.
        </Typography>

        <Grid container spacing={4}>
          {loginOptions.map((option, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  border: `2px solid transparent`,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                    borderColor: `${option.color}.main`
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ color: `${option.color}.main`, mb: 3 }}>
                    {option.icon}
                  </Box>
                  
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    {option.title}
                  </Typography>
                  
                  <Typography color="text.secondary" paragraph sx={{ minHeight: '60px' }}>
                    {option.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
                    {option.buttons.map((button, btnIndex) => (
                      <Button
                        key={btnIndex}
                        variant={button.variant}
                        color={option.color}
                        size="large"
                        onClick={() => navigate(button.path)}
                        sx={{ py: 1.5 }}
                      >
                        {button.label}
                      </Button>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default LoginOptions;