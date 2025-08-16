import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Chip,
  Typography,
  Box,
  Button,
  Divider
} from '@mui/material';
import { 
  Agriculture, 
  Water, 
  LocalFlorist, 
  Build,
  CheckCircle,
  Schedule,
  Pending,
  Add
} from '@mui/icons-material';

function SubsidyPrograms() {
  const programs = [
    {
      id: 1,
      name: 'Rice Production Support',
      category: 'Seeds & Fertilizer',
      status: 'approved',
      appliedDate: '2024-08-10',
      expectedRelease: '2024-08-20',
      icon: <Agriculture />,
      description: 'Certified rice seeds and NPK fertilizer package',
      coverage: '2.5 hectares'
    },
    {
      id: 2,
      name: 'Farm Equipment Assistance',
      category: 'Equipment',
      status: 'under_review',
      appliedDate: '2024-08-05',
      expectedRelease: 'TBD',
      icon: <Build />,
      description: 'Water pump and irrigation equipment',
      coverage: 'Farm-wide'
    },
    {
      id: 3,
      name: 'Crop Insurance Program',
      category: 'Insurance',
      status: 'pending_documents',
      appliedDate: '2024-07-28',
      expectedRelease: 'TBD',
      icon: <LocalFlorist />,
      description: 'Weather-indexed crop insurance coverage',
      coverage: '2.5 hectares'
    },
    {
      id: 4,
      name: 'Organic Farming Transition',
      category: 'Training & Support',
      status: 'completed',
      appliedDate: '2024-07-15',
      expectedRelease: 'Released',
      icon: <Water />,
      description: 'Training materials and organic inputs',
      coverage: '1 hectare pilot'
    }
  ];

  const getStatusInfo = (status) => {
    switch (status) {
      case 'approved': 
        return { 
          color: 'success', 
          icon: <CheckCircle />, 
          label: 'Approved',
          bgColor: '#e8f5e8'
        };
      case 'under_review': 
        return { 
          color: 'warning', 
          icon: <Schedule />, 
          label: 'Under Review',
          bgColor: '#fff4e6'
        };
      case 'pending_documents': 
        return { 
          color: 'error', 
          icon: <Pending />, 
          label: 'Pending Documents',
          bgColor: '#ffebee'
        };
      case 'completed': 
        return { 
          color: 'primary', 
          icon: <CheckCircle />, 
          label: 'Completed',
          bgColor: '#e3f2fd'
        };
      default: 
        return { 
          color: 'default', 
          icon: <Schedule />, 
          label: 'Unknown',
          bgColor: '#f5f5f5'
        };
    }
  };

  return (
    <Card>
      <CardHeader 
        title="My Subsidy Applications" 
        subheader="Track your agricultural support programs"
        action={
          <Button 
            variant="contained" 
            startIcon={<Add />}
            size="small"
          >
            Apply New
          </Button>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <List>
          {programs.map((program, index) => {
            const statusInfo = getStatusInfo(program.status);
            return (
              <React.Fragment key={program.id}>
                <ListItem 
                  sx={{ 
                    borderRadius: 2, 
                    mb: 1,
                    backgroundColor: statusInfo.bgColor,
                    '&:hover': {
                      backgroundColor: statusInfo.bgColor,
                      opacity: 0.8
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {program.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <Box>
                          <Typography variant="subtitle1" fontWeight="medium">
                            {program.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {program.category} • Coverage: {program.coverage}
                          </Typography>
                        </Box>
                        <Chip
                          icon={statusInfo.icon}
                          label={statusInfo.label}
                          color={statusInfo.color}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    }
                    secondary={
                      <Box mt={1}>
                        <Typography variant="body2" color="text.secondary">
                          {program.description}
                        </Typography>
                        <Box display="flex" justifyContent="space-between" mt={1}>
                          <Typography variant="caption">
                            Applied: {program.appliedDate}
                          </Typography>
                          <Typography variant="caption">
                            Expected Release: {program.expectedRelease}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                {index < programs.length - 1 && <Divider variant="middle" />}
              </React.Fragment>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}

export default SubsidyPrograms;