import { useState, useCallback, useEffect } from 'react';

const usePersonalDetails = (userId = null) => {
  // Initialize form data with default values from the migration schema
  const [formData, setFormData] = useState({
    // RSBSA INFORMATION & VERIFICATION
    system_generated_rsbsa_number: '',
    manual_rsbsa_number: '',
    rsbsa_verification_status: 'not_verified',
    rsbsa_verification_notes: '',
    
    // LOCATION INFORMATION
    barangay: '',
    municipality: 'Opol',
    province: 'Misamis Oriental',
    region: 'Region X (Northern Mindanao)',
    
    // CONTACT INFORMATION
    contact_number: '',
    emergency_contact_number: '',
    
    // PERSONAL INFORMATION
    birth_date: '',
    place_of_birth: '',
    sex: '',
    civil_status: '',
    name_of_spouse: '',
    
    // EDUCATIONAL & DEMOGRAPHIC INFORMATION
    highest_education: '',
    religion: '',
    is_pwd: false,
    
    // GOVERNMENT ID INFORMATION
    has_government_id: 'no',
    gov_id_type: '',
    gov_id_number: '',
    
    // ASSOCIATION & ORGANIZATION MEMBERSHIP
    is_association_member: 'no',
    association_name: '',
    
    // HOUSEHOLD INFORMATION
    mothers_maiden_name: '',
    is_household_head: false,
    household_head_name: '',
    
    // PROFILE COMPLETION & VERIFICATION SYSTEM
    profile_completion_status: 'pending',
    is_profile_verified: false,
    verification_notes: '',
    
    // DATA SOURCE & AUDIT TRACKING
    data_source: 'self_registration',
    completion_tracking: {}
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Barangay options for Opol, Misamis Oriental
  const barangayOptions = [
    'Bagocboc', 'Barra', 'Bonbon', 'Buruanga', 'Cabadiangan', 'Camaman-an',
    'Gotokan', 'Igpit', 'Limbaybay', 'Lower Olave', 'Lumbia', 'Malitbog',
    'Mapayag', 'Napaliran', 'Opol Poblacion', 'Patag', 'Pontod', 'San Vicente',
    'Tingalan', 'Taboc', 'Talakag', 'Upper Olave'
  ];

  // Civil status options from enum
  const civilStatusOptions = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'widowed', label: 'Widowed' },
    { value: 'separated', label: 'Separated' },
    { value: 'divorced', label: 'Divorced' }
  ];

  // Education options from enum
  const educationOptions = [
    { value: 'None', label: 'None' },
    { value: 'Pre-school', label: 'Pre-school' },
    { value: 'Elementary', label: 'Elementary' },
    { value: 'Junior High School', label: 'Junior High School' },
    { value: 'Senior High School', label: 'Senior High School' },
    { value: 'Vocational', label: 'Vocational' },
    { value: 'College', label: 'College' },
    { value: 'Post Graduate', label: 'Post Graduate' }
  ];

  const yesNoOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  // Update field function
  const updateField = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Handle conditional fields
    if (field === 'civil_status' && value !== 'married') {
      setFormData(prev => ({
        ...prev,
        name_of_spouse: ''
      }));
    }

    if (field === 'has_government_id' && value === 'no') {
      setFormData(prev => ({
        ...prev,
        gov_id_type: '',
        gov_id_number: ''
      }));
    }

    if (field === 'is_association_member' && value === 'no') {
      setFormData(prev => ({
        ...prev,
        association_name: ''
      }));
    }

    if (field === 'is_household_head' && value === true) {
      setFormData(prev => ({
        ...prev,
        household_head_name: ''
      }));
    }
  }, [errors]);

  // Validation function
  const validateForm = useCallback(() => {
    const newErrors = {};

    // Required fields validation
    if (!formData.barangay) newErrors.barangay = 'Barangay is required';
    if (!formData.contact_number) newErrors.contact_number = 'Contact number is required';
    if (!formData.birth_date) newErrors.birth_date = 'Birth date is required';
    if (!formData.sex) newErrors.sex = 'Sex is required';

    // Contact number format validation
    if (formData.contact_number && !/^09\d{9}$/.test(formData.contact_number)) {
      newErrors.contact_number = 'Contact number must be in format 09XXXXXXXXX';
    }

    // Emergency contact format validation (if provided)
    if (formData.emergency_contact_number && !/^09\d{9}$/.test(formData.emergency_contact_number)) {
      newErrors.emergency_contact_number = 'Emergency contact must be in format 09XXXXXXXXX';
    }

    // Conditional validations
    if (formData.civil_status === 'married' && !formData.name_of_spouse) {
      newErrors.name_of_spouse = 'Spouse name is required for married status';
    }

    if (formData.has_government_id === 'yes') {
      if (!formData.gov_id_type) newErrors.gov_id_type = 'Government ID type is required';
      if (!formData.gov_id_number) newErrors.gov_id_number = 'Government ID number is required';
    }

    if (formData.is_association_member === 'yes' && !formData.association_name) {
      newErrors.association_name = 'Association name is required';
    }

    if (!formData.is_household_head && !formData.household_head_name) {
      newErrors.household_head_name = 'Household head name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Load data function (placeholder for API call)
  const loadPersonalDetails = useCallback(async (id) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await api.get(`/beneficiary-details/${id}`);
      // setFormData(response.data);
      
      // For now, load from localStorage if available
      const savedData = localStorage.getItem(`personal_details_${id}`);
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Error loading personal details:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save data function (placeholder for API call)
  const savePersonalDetails = useCallback(async () => {
    if (!validateForm()) {
      return false;
    }

    setSaving(true);
    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/beneficiary-details', formData);
      
      // For now, save to localStorage
      if (userId) {
        localStorage.setItem(`personal_details_${userId}`, JSON.stringify(formData));
      }

      // Update completion tracking
      const completedFields = Object.keys(formData).filter(key => {
        const value = formData[key];
        return value !== '' && value !== null && value !== undefined;
      });

      updateField('completion_tracking', {
        completed_fields: completedFields,
        completion_percentage: Math.round((completedFields.length / Object.keys(formData).length) * 100),
        last_updated: new Date().toISOString()
      });

      return true;
    } catch (error) {
      console.error('Error saving personal details:', error);
      return false;
    } finally {
      setSaving(false);
    }
  }, [formData, userId, validateForm, updateField]);

  // Calculate completion percentage
  const getCompletionPercentage = useCallback(() => {
    const totalFields = Object.keys(formData).length;
    const completedFields = Object.keys(formData).filter(key => {
      const value = formData[key];
      return value !== '' && value !== null && value !== undefined && value !== false;
    }).length;

    return Math.round((completedFields / totalFields) * 100);
  }, [formData]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData({
      system_generated_rsbsa_number: '',
      manual_rsbsa_number: '',
      rsbsa_verification_status: 'not_verified',
      rsbsa_verification_notes: '',
      barangay: '',
      municipality: 'Opol',
      province: 'Misamis Oriental',
      region: 'Region X (Northern Mindanao)',
      contact_number: '',
      emergency_contact_number: '',
      birth_date: '',
      place_of_birth: '',
      sex: '',
      civil_status: '',
      name_of_spouse: '',
      highest_education: '',
      religion: '',
      is_pwd: false,
      has_government_id: 'no',
      gov_id_type: '',
      gov_id_number: '',
      is_association_member: 'no',
      association_name: '',
      mothers_maiden_name: '',
      is_household_head: false,
      household_head_name: '',
      profile_completion_status: 'pending',
      is_profile_verified: false,
      verification_notes: '',
      data_source: 'self_registration',
      completion_tracking: {}
    });
    setErrors({});
  }, []);

  // Load data on mount if userId is provided
  useEffect(() => {
    if (userId) {
      loadPersonalDetails(userId);
    }
  }, [userId, loadPersonalDetails]);

  return {
    formData,
    errors,
    loading,
    saving,
    barangayOptions,
    civilStatusOptions,
    educationOptions,
    yesNoOptions,
    updateField,
    validateForm,
    loadPersonalDetails,
    savePersonalDetails,
    getCompletionPercentage,
    resetForm
  };
};

export default usePersonalDetails;