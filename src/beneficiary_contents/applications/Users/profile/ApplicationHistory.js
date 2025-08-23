import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Chip,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Paper,
  Tooltip
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Description as DocumentIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
  CloudUpload as UploadIcon,
  Agriculture as AgricultureIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 'bold',
  ...(status === 'approved' && {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark
  }),
  ...(status === 'pending' && {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.dark
  }),
  ...(status === 'rejected' && {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.dark
  })
}));

const ApplicationCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)'
  }
}));

function ApplicationHistory() {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Sample data - would come from API in real app
  const applications = [
    {
      id: 'APP-2024-001',
      type: 'RSBSA Registration',
      description: 'Initial RSBSA beneficiary registration',
      status: 'approved',
      submitted_date: '2024-01-15',
      processed_date: '2024-01-22',
      documents: [
        { name: 'Personal Information Form', status: 'submitted', type: 'pdf' },
        { name: 'Farm Details Form', status: 'submitted', type: 'pdf' },
        { name: 'Valid ID Copy', status: 'submitted', type: 'image' }
      ],
      notes: 'Application approved. RSBSA number generated.'
    },
    {
      id: 'APP-2024-002',
      type: 'Agricultural Support Program',
      description: 'Application for seed subsidy program',
      status: 'pending',
      submitted_date: '2024-02-10',
      processed_date: null,
      documents: [
        { name: 'Farm Area Certificate', status: 'submitted', type: 'pdf' },
        { name: 'Crop Production Plan', status: 'pending', type: 'pdf' }
      ],
      notes: 'Under review by agricultural technician.'
    },
    {
      id: 'APP-2024-003',
      type: 'Training Program',
      description: 'Sustainable Farming Techniques Workshop',
      status: 'approved',
      submitted_date: '2024-03-05',
      processed_date: '2024-03-08',
      documents: [
        { name: 'Training Application Form', status: 'submitted', type: 'pdf' }
      ],
      notes: 'Enrolled for training scheduled on March 20, 2024.'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon color="success" />;
      case 'pending':
        return <PendingIcon color="warning" />;
      case 'rejected':
        return <CancelIcon color="error" />;
      default:
        return <ScheduleIcon />;
    }
  };

  const getTypeIcon = (type) => {
    if (type.includes('RSBSA')) return <AssignmentIcon />;
    if (type.includes('Agricultural') || type.includes('Seed')) return <AgricultureIcon />;
    if (type.includes('Training')) return <DocumentIcon />;
    return <DocumentIcon />;
  };

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedApplication(null);
  };

  const handleDownloadDocument = (docName) => {
    // Implement document download logic
    console.log('Downloading:', docName);
  };

  return (
    <>
      <Card>
        <CardHeader 
          avatar={
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <AssignmentIcon />
            </Avatar>
          }
          title="Application History" 
          subheader="Track your applications and submitted documents"
          action={
            <Button
              variant="outlined"
              startIcon={<UploadIcon />}
              size="small"
            >
              New Application
            </Button>
          }
        />
        <Divider />
        
        <CardContent>
          {applications.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No Applications Yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Submit your first application to get started
              </Typography>
              <Button variant="contained" startIcon={<UploadIcon />}>
                Start Application
              </Button>
            </Box>
          ) : (
            <Stack spacing={2}>
              {applications.map((application) => (
                <ApplicationCard key={application.id}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Avatar sx={{ bgcolor: 'primary.light' }}>
                        {getTypeIcon(application.type)}
                      </Avatar>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {application.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {application.description}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                        <StatusChip 
                          label={application.status.toUpperCase()}
                          status={application.status}
                          size="small"
                        />
                        <Typography variant="caption" color="text.secondary">
                          Submitted: {new Date(application.submitted_date).toLocaleDateString()}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="View Details">
                          <IconButton 
                            onClick={() => handleViewApplication(application)}
                            color="primary"
                          >
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download Documents">
                          <IconButton color="primary">
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Grid>
                  </Grid>
                </ApplicationCard>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>

      {/* Application Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedApplication && (
          <>
            <DialogTitle>
              <Stack direction="row" alignItems="center" spacing={2}>
                {getStatusIcon(selectedApplication.status)}
                <Box>
                  <Typography variant="h6">
                    {selectedApplication.type}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Application ID: {selectedApplication.id}
                  </Typography>
                </Box>
              </Stack>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedApplication.description}
                  </Typography>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Status
                  </Typography>
                  <StatusChip 
                    label={selectedApplication.status.toUpperCase()}
                    status={selectedApplication.status}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Timeline
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="Submitted"
                        secondary={new Date(selectedApplication.submitted_date).toLocaleDateString()}
                      />
                    </ListItem>
                    {selectedApplication.processed_date && (
                      <ListItem>
                        <ListItemText 
                          primary="Processed"
                          secondary={new Date(selectedApplication.processed_date).toLocaleDateString()}
                        />
                      </ListItem>
                    )}
                  </List>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Documents
                  </Typography>
                  <List>
                    {selectedApplication.documents.map((doc, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar>
                            <DocumentIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={doc.name}
                          secondary={`Status: ${doc.status}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton 
                            onClick={() => handleDownloadDocument(doc.name)}
                            color="primary"
                          >
                            <DownloadIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                
                {selectedApplication.notes && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>
                      Notes
                    </Typography>
                    <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                      <Typography variant="body2">
                        {selectedApplication.notes}
                      </Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={handleCloseDialog}>
                Close
              </Button>
              <Button variant="contained" startIcon={<DownloadIcon />}>
                Download All Documents
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}

export default ApplicationHistory;