import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div
      className='container'
      style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>Welcome To School Manager</h2>
      <p>Full Fledged School Management Software</p>
      <Link
        to='/login'
        className='btn btn-primary'
        style={{ marginRight: '20px' }}>
        Log In
      </Link>
      <Link to='/register' className='btn btn-danger'>
        Sign Up
      </Link>
    </div>
  );
};

export default Landing;
