import React from 'react';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  Chip,
  Stack,
  Button,
  Grid,
  Paper
} from '@mui/material';
import {
  Agriculture as AgricultureIcon,
  Assignment as AssignmentIcon,
  School as SchoolIcon,
  LocalHospital as HealthIcon,
  AttachMoney as MoneyIcon,
  Group as GroupIcon,
  Phone as PhoneIcon,
  Info as InfoIcon,
  CloudUpload as UploadIcon,
  Download as DownloadIcon,
  Notifications as NotificationsIcon,
  Support as SupportIcon,
  ChevronRight as ChevronRightIcon,
  NewReleases as NewIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const ActionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.2s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)',
    borderColor: theme.palette.primary.main
  }
}));

const ServiceIcon = styled(Avatar)(({ theme, serviceType }) => {
  const getColor = () => {
    switch (serviceType) {
      case 'agricultural': return theme.palette.success.main;
      case 'financial': return theme.palette.warning.main;
      case 'training': return theme.palette.info.main;
      case 'health': return theme.palette.error.main;
      case 'support': return theme.palette.primary.main;
      default: return theme.palette.grey[500];
    }
  };
  
  return {
    backgroundColor: getColor(),
    width: 40,
    height: 40
  };
});

function QuickActions() {
  // Quick action items relevant to beneficiaries
  const quickActions = [
    {
      id: 'rsbsa-application',
      title: 'RSBSA Application',
      description: 'Apply for or update RSBSA registration',
      icon: <AssignmentIcon />,
      serviceType: 'agricultural',
      urgent: false,
      action: () => console.log('Navigate to RSBSA application')
    },
    {
      id: 'seed-subsidy',
      title: 'Seed Subsidy Program',
      description: 'Apply for free seeds and fertilizers',
      icon: <AgricultureIcon />,
      serviceType: 'agricultural',
      urgent: true,
      action: () => console.log('Navigate to seed subsidy')
    },
    {
      id: 'training-enrollment',
      title: 'Training Programs',
      description: 'Enroll in agricultural training courses',
      icon: <SchoolIcon />,
      serviceType: 'training',
      urgent: false,
      action: () => console.log('Navigate to training programs')
    },
    {
      id: 'financial-assistance',
      title: 'Financial Assistance',
      description: 'Apply for loans and grants',
      icon: <MoneyIcon />,
      serviceType: 'financial',
      urgent: false,
      action: () => console.log('Navigate to financial assistance')
    }
  ];

  // Available services/information
  const services = [
    {
      id: 'weather-info',
      title: 'Weather Updates',
      description: 'Get local weather forecasts',
      icon: <InfoIcon />,
      isNew: true
    },
    {
      id: 'price-monitoring',
      title: 'Crop Price Monitor',
      description: 'Check current market prices',
      icon: <MoneyIcon />,
      isNew: false
    },
    {
      id: 'health-programs',
      title: 'Health Services',
      description: 'Access healthcare programs',
      icon: <HealthIcon />,
      isNew: false
    },
    {
      id: 'farmer-groups',
      title: 'Farmer Associations',
      description: 'Join local farmer groups',
      icon: <GroupIcon />,
      isNew: false
    },
    {
      id: 'helpdesk',
      title: 'Contact Support',
      description: 'Get help and assistance',
      icon: <SupportIcon />,
      isNew: false
    }
  ];

  // Document shortcuts
  const documentActions = [
    {
      title: 'Upload Documents',
      icon: <UploadIcon />,
      action: () => console.log('Upload documents')
    },
    {
      title: 'Download Forms',
      icon: <DownloadIcon />,
      action: () => console.log('Download forms')
    },
    {
      title: 'View Notifications',
      icon: <NotificationsIcon />,
      action: () => console.log('View notifications')
    }
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader 
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <AgricultureIcon />
          </Avatar>
        }
        title="Quick Actions & Services" 
        subheader="Access agricultural programs and services"
      />
      <Divider />
      
      <CardContent>
        {/* Priority Actions */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Priority Actions
          </Typography>
          <Grid container spacing={2}>
            {quickActions.map((action) => (
              <Grid item xs={12} key={action.id}>
                <ActionCard onClick={action.action}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <ServiceIcon serviceType={action.serviceType}>
                      {action.icon}
                    </ServiceIcon>
                    <Box sx={{ flexGrow: 1 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="subtitle1" fontWeight="bold">
                          {action.title}
                        </Typography>
                        {action.urgent && (
                          <Chip 
                            label="Urgent" 
                            size="small" 
                            color="error" 
                            variant="outlined"
                          />
                        )}
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {action.description}
                      </Typography>
                    </Box>
                    <ChevronRightIcon color="action" />
                  </Stack>
                </ActionCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Document Actions */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Document Actions
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {documentActions.map((doc, index) => (
              <Button
                key={index}
                variant="outlined"
                size="small"
                startIcon={doc.icon}
                onClick={doc.action}
                sx={{ minWidth: 'auto' }}
              >
                {doc.title}
              </Button>
            ))}
          </Stack>
        </Box>

        {/* Available Services */}
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Services & Information
          </Typography>
          <List disablePadding>
            {services.map((service) => (
              <ListItem key={service.id} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light' }}>
                      {service.icon}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body1">
                          {service.title}
                        </Typography>
                        {service.isNew && (
                          <Chip 
                            label="New" 
                            size="small" 
                            color="primary" 
                            icon={<NewIcon />}
                            sx={{ height: 20 }}
                          />
                        )}
                      </Stack>
                    }
                    secondary={service.description}
                  />
                  <ChevronRightIcon color="action" />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Emergency Contact */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: 'error.main' }}>
              <PhoneIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle2" fontWeight="bold">
                Emergency Agricultural Hotline
              </Typography>
              <Typography variant="body2">
                📞 (088) 123-4567 | 24/7 Support
              </Typography>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default QuickActions;