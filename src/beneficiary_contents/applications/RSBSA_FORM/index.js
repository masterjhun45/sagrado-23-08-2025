import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import { Grid, Container } from '@mui/material';

// 🌾 RSBSA Form Components - Based on Database Schema
import BeneficiaryProfile from './BeneficiaryProfile';          // beneficiary_profiles table
import FarmProfile from './FarmProfile';                        // farm_profiles table
import LivelihoodCategory from './LivelihoodCategory';          // livelihood_categories table
import FarmParcels from './FarmParcels';                        // farm_parcels table
import FarmerDetails from './FarmerDetails';                    // farmer_details table
import RSBSAEnrollment from './RSBSAEnrollment';                // rsbsa_enrollments table

function RSBSAForm() {
  // 💾 Get stored form data from localStorage (mimics database structure)
  const storedFormData = JSON.parse(localStorage.getItem('rsbsaFormData')) || {};
  
  // 🗂️ Form data structure matching database relationships
  const formData = {
    // Main beneficiary information (beneficiary_profiles table)
    beneficiaryProfile: storedFormData.beneficiaryProfile || {
      RSBSA_NUMBER: null,
      barangay: '',
      municipality: 'Opol',
      province: 'Misamis Oriental',
      region: 'X',
      contact_number: '',
      birth_date: null,
      place_of_birth: '',
      sex: '',
      civil_status: null,
      name_of_spouse: null,
      highest_education: null,
      religion: null,
      is_pwd: false,
      has_government_id: 'no',
      gov_id_type: null,
      gov_id_number: null,
      is_association_member: 'no',
      association_name: null,
      mothers_maiden_name: null,
      is_household_head: false,
      household_head_name: null,
      emergency_contact_number: null
    },
    
    // Farm profile information (farm_profiles table)
    farmProfile: storedFormData.farmProfile || {
      livelihood_category_id: null
    },
    
    // Livelihood categories (livelihood_categories table)
    livelihoods: storedFormData.livelihoods || [],
    
    // Farm parcels information (farm_parcels table)
    farmParcels: storedFormData.farmParcels || [],
    
    // Farmer specific details (farmer_details table)
    farmerDetails: storedFormData.farmerDetails || {
      is_rice: false,
      is_corn: false,
      is_other_crops: false,
      other_crops_description: null,
      is_livestock: false,
      livestock_description: null,
      is_poultry: false,
      poultry_description: null
    },
    
    // RSBSA enrollment information (rsbsa_enrollments table)
    enrollment: storedFormData.enrollment || {
      reference_code: '',
      status: 'pending',
      submitted_at: null,
      verified_at: null,
      rejection_reason: null
    }
  };

  return (
    <>
      <Helmet>
        <title>RSBSA Registration Form - Registry System for Basic Sectors in Agriculture</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          {/* 👤 Primary beneficiary information section */}
          <Grid item xs={12} md={8}>
            <BeneficiaryProfile formData={formData.beneficiaryProfile} />
          </Grid>
          
          {/* 🏠 Farm profile and livelihood category */}
          <Grid item xs={12} md={4}>
            <FarmProfile formData={formData.farmProfile} />
          </Grid>
          
          {/* 🌱 Livelihood categories selection */}
          <Grid item xs={12} md={8}>
            <LivelihoodCategory formData={formData.livelihoods} />
          </Grid>
          
          {/* 🚜 Farmer specific activities and details */}
          <Grid item xs={12} md={4}>
            <FarmerDetails formData={formData.farmerDetails} />
          </Grid>
          
          {/* 🗺️ Farm parcels information */}
          <Grid item xs={12} md={7}>
            <FarmParcels formData={formData.farmParcels} />
          </Grid>
          
          {/* 📝 RSBSA enrollment status and submission */}
          <Grid item xs={12} md={5}>
            <RSBSAEnrollment formData={formData.enrollment} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default RSBSAForm;