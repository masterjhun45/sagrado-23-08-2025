import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance'; // Adjust the path as needed

const useLoginCoordinator = (setIsLoggedIn, setUser) => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (error) {
      setError('');
    }
  };

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);

    const { emailOrUsername, password } = formData;

    if (!emailOrUsername || !password) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post(
        '/api/coordinator/login',
        { emailOrUsername, password },
        {
          withCredentials: true,
          timeout: 10000,
        }
      );

      if (!response || !response.data) {
        throw new Error('Invalid response from server.');
      }

      const { token, data: user } = response.data;

      if (token && user) {
       
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

 
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        if (setIsLoggedIn) setIsLoggedIn(true);
        if (setUser) setUser(user);
    
        if (user.role === 'coordinator') {
          navigate('/coordinator/dashboard');
        } else {
          navigate('/error');
        }
      } else {
        throw new Error('Login failed. Missing token or user data.');
      }
    } catch (err) {
      console.error('Login error:', err);

      if (err.code === 'ECONNABORTED') {
        setError('Request timed out. Please try again.');
      } else if (err.response) {
        const { status, data } = err.response;

        if (status === 401 || status === 422) {
          setError('Invalid email/username or password.');
        } else if (status === 403) {
          setError('Access denied. You are not authorized to log in.');
        } else {
          setError(data?.message || `Unexpected error: ${status}`);
        }
      } else {
        setError('Unable to reach the server. Please check your connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleLogin,
    error,
    isLoading,
  };
};

export default useLoginCoordinator;
