import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import useLoginCoordinator from '../../hooks-auth/hooks-auth-coordinator/useLogin';

function LoginCoordinator() {
  const [, setIsLoggedIn] = useState(false);
  const [, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    formData,
    error,
    isLoading,
    handleChange,
    handleLogin
  } = useLoginCoordinator(setIsLoggedIn, setUser);

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
            Hello, Coordinator! <br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>Sign in to manage your tasks</span>
          </h1>
          <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
            Access your coordinator dashboard, track farmer data, and manage sector operations with your login.
          </p>
        </MDBCol>

        <MDBCol md='6' className='position-relative d-flex justify-content-center'>
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong" />
          <div id="radius-shape-2" className="position-absolute shadow-5-strong" />

          <MDBCard className='my-5 bg-glass login-card'>
            <MDBCardBody className='p-5'>
              <h3 className="text-center mb-4">Sign in as Coordinator</h3>

              {error && <div className="alert alert-danger text-center py-2">{error}</div>}

              {/* Email or Username Input */}
              <MDBInput
                className="floating-label-input mb-4"
                label='Email or Username'
                id='emailOrUsername'
                type='text'
                name='emailOrUsername'
                value={formData.emailOrUsername}
                onChange={handleChange}
              />

              {/* Password with toggle */}
              <div className="position-relative mb-4">
                <MDBInput
                  className="floating-label-input"
                  label='Password'
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  style={{ paddingRight: '2.5rem' }}
                />
                <span
                  role="button"
                  tabIndex={0}
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setShowPassword(!showPassword);
                    }
                  }}
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className='d-flex justify-content-between mb-4'>
                <MDBCheckbox name='rememberMe' value='' id='rememberMe' label='Remember me' />
                <a href="#!">Forgot password?</a>
              </div>

              {/* Submit Button */}
              <button
                className='btn btn-primary w-100 mb-4'
                type='button'
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>

              {/* Register Link */}
              <div className="text-center">
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginCoordinator;