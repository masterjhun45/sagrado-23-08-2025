import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

const useLoginBeneficiary = () => {
  const [formData, setFormData] = useState({ username: '', password: '', rememberMe: false });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Prevent access to login form if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.role === 'beneficiary') {
          // Redirect to dashboard
          navigate('/beneficiary/dashboard', { replace: true });
        }
      } catch (err) {
        console.error('Error parsing user from localStorage', err);
        // If invalid, clear storage just in case
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
      }
    }
  }, [navigate]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
    setSuccess('');
  }, []);

  const storeAuth = useCallback((token, user) => {
    try {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userRole', user.role);
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('userRole');
    } catch (err) {
      console.error('Error storing auth:', err);
    }
  }, []);

  const handleLogin = useCallback(async () => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const { username, password } = formData;
      if (!username || !password) {
        setError('Username and password are required.');
        return;
      }

      const response = await axiosInstance.post('/api/beneficiary/login', { emailOrUsername: username, password });
      const { token, data: user } = response.data;

      if (!token || !user || user.role !== 'beneficiary') {
        throw new Error('Invalid login or role.');
      }

      storeAuth(token, user);
      setSuccess('Login successful! Redirecting...');

      setTimeout(() => {
        navigate('/beneficiary/dashboard', { replace: true });
      }, 1500);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  }, [formData, storeAuth, navigate]);

  return {
    formData,
    setFormData,
    handleChange,
    handleLogin,
    error,
    success,
    isLoading
  };
};

export default useLoginBeneficiary;
