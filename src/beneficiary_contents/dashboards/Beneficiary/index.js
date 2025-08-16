// BeneficiaryDashboard.js - Updated imports and component usage
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import SubsidyStatus from './SubsidyStatus';           // Renamed from AccountBalance
import SubsidyPrograms from './SubsidyPrograms';       // Renamed from Wallets  
import BeneficiaryProfile from './BeneficiaryProfile'; // Renamed from AccountSecurity
import SubsidyNotifications from './SubsidyNotifications'; // Renamed from WatchList

function BeneficiaryDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    console.log('BeneficiaryDashboard - Auth check:', { hasToken: !!token, hasUser: !!userStr });
    
    if (!token || !userStr) {
      console.log('BeneficiaryDashboard - No auth found, redirecting to login');
      navigate('/beneficiary-login', { replace: true });
      return;
    }
    
    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'beneficiary') {
        console.log('BeneficiaryDashboard - User is not beneficiary:', user.role);
        navigate('/beneficiary-login', { replace: true });
        return;
      }
      console.log('BeneficiaryDashboard - Access granted for beneficiary');
    } catch (error) {
      console.error('BeneficiaryDashboard - Error parsing user:', error);
      navigate('/beneficiary-login', { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>AGRICULTURAL BENEFICIARY DASHBOARD</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <SubsidyStatus />
          </Grid>
          <Grid item lg={8} xs={12}>
            <SubsidyPrograms />
          </Grid>
          <Grid item lg={4} xs={12}>
            <BeneficiaryProfile />
          </Grid>
          <Grid item xs={12}>
            <SubsidyNotifications />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default BeneficiaryDashboard;