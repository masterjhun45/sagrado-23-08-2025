import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import { Grid, Container } from '@mui/material';

// Import existing components
import ProfileCover from './ProfileCover';
import RecentActivity from './RecentActivity';
import Addresses from './Addresses';

// Import beneficiary-specific components
import PersonalDetails from './PersonalDetails';
import RSBSAStatus from './RSBSAStatus';
import ApplicationHistory from './ApplicationHistory';
import QuickActions from './QuickActions';

function ManagementUserProfile() {
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  
  const user = {
    savedCards: storedUser.savedCards || 0,
    name: storedUser.name || storedUser.username || storedUser.email || 'Unknown User',
    coverImg: '/static/images/placeholders/covers/5.jpg',
    avatar: '/static/images/avatars/4.jpg',
    description:
      storedUser.description ||
      'No description provided. You can update your profile to add more info.',
    jobtitle: storedUser.jobtitle || 'N/A',
    location: storedUser.location || 'N/A',
    followers: storedUser.followers || '0'
  };

  return (
    <>
      <Helmet>
        <title>User Profile - Beneficiary Details Management</title>
        <meta 
          name="description" 
          content="Manage your personal details and beneficiary profile information" 
        />
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          {/* Profile Cover Section */}
          <Grid item xs={12} md={8}>
            <ProfileCover user={user} />
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentActivity />
          </Grid>
          
          {/* Personal Details Section - Primary Focus */}
          <Grid item xs={12}>
            <PersonalDetails />
          </Grid>
          
          {/* RSBSA Status and Quick Actions */}
          <Grid item xs={12} md={8}>
            <RSBSAStatus />
          </Grid>
          <Grid item xs={12} md={4}>
            <QuickActions />
          </Grid>
          
          {/* Application History and Address Information */}
          <Grid item xs={12} md={7}>
            <ApplicationHistory />
          </Grid>
          <Grid item xs={12} md={5}>
            <Addresses />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUserProfile;