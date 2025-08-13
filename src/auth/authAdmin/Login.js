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
import useLogin from 'src/hooks-auth/hooks-auth-admin/useLogin'; // Ensure correct path

function Login() {
  const [, setIsLoggedIn] = useState(false); // only using setter
  const [, setUser] = useState(null);        // only using setter

  const {
    formData,
    error,
    isLoading,
    handleChange,
    handleLogin
  } = useLogin(setIsLoggedIn, setUser, 'admin'); // 👈 Admin role specified

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
            Welcome! <br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>Login to your account</span>
          </h1>
          <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
            Access your dashboard, manage projects, and explore new features with your login credentials.
          </p>
        </MDBCol>

        <MDBCol md='6' className='position-relative'>
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong" />
          <div id="radius-shape-2" className="position-absolute shadow-5-strong" />

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              <h3 className="text-center mb-4">Login </h3>

              {error && <div className="alert alert-danger text-center py-2">{error}</div>}

              <MDBInput
                wrapperClass="mb-4"
                label='Email or Username'
                id='emailOrUsername'
                type='text'
                name='emailOrUsername'
                value={formData.emailOrUsername}
                onChange={handleChange}
              />
              <MDBInput
                wrapperClass="mb-4"
                label='Password'
                id='password'
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
              />

              <div className='d-flex justify-content-between mb-4'>
                <MDBCheckbox name='rememberMe' value='' id='rememberMe' label='Remember me' />
                <a href="#!">Forgot password?</a>
              </div>

              <button
                className='btn btn-primary w-100 mb-4'
                type='button'
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>

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

export default Login;
