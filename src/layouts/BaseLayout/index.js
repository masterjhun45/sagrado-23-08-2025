import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const BaseLayout = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user?.role) {
      switch (user.role) {
        case 'admin':
          navigate('/dashboards/Admin');
          break;
        case 'coordinator':
          navigate('/coordinator/dashboard');
          break;
        case 'beneficiary':
          navigate('/beneficiary/dashboard');
          break;
        default:
          navigate('/login'); // fallback if role is unknown
      }
    } else {
      navigate('/login'); // no token or user
    }
  }, [navigate]);

  return (
    <Box sx={{ flex: 1, height: '100%' }}>
      {children || <Outlet />}
    </Box>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
