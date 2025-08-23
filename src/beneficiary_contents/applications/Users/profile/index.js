import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import { Grid, Container } from '@mui/material';

// Import existing components
import ProfileCover from './ProfileCover';
import Addresses from './Addresses';

// Import beneficiary-specific components
import PersonalDetails from './PersonalDetails';
import RSBSAStatus from './RSBSAStatus';
import ApplicationHistory from './ApplicationHistory';
import QuickActions from './QuickActions';
import BeneficiarySummary from './BeneficiarySummary';

function ManagementUserProfile() {
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  
  // Get verification status from localStorage or default to not verified
  const profileData = JSON.parse(localStorage.getItem(`personal_details_${storedUser.id}`)) || {};
  const isVerified = profileData.is_profile_verified || false;
  const rsbsaNumber = profileData.system_generated_rsbsa_number || profileData.manual_rsbsa_number;
  
  const user = {
    savedCards: storedUser.savedCards || 0,
    name: storedUser.name || storedUser.username || storedUser.email || 'Unknown User',
    coverImg: '/static/images/placeholders/covers/5.jpg',
    avatar: '/static/images/avatars/4.jpg',
    description: isVerified 
      ? `Verified RSBSA beneficiary${rsbsaNumber ? ` - ${rsbsaNumber}` : ''}. Access agricultural programs and services through your dashboard.`
      : 'RSBSA registration not yet verified. Complete your profile and submit required documents to access agricultural programs.',
    jobtitle: isVerified ? 'Verified RSBSA Beneficiary' : 'Pending RSBSA Verification',
    location: profileData.municipality && profileData.province 
      ? `${profileData.municipality}, ${profileData.province}` 
      : storedUser.location || 'Opol, Misamis Oriental',
    followers: isVerified ? 'Verified' : 'Unverified'
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
            <BeneficiarySummary />
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