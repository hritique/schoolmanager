import React, { useState } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { setAlert } from '../../../actions/alert';
import { login } from '../../../actions/auth';

const Login = props => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const onChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const loginHandler = async event => {
    event.preventDefault();
    const { username, password } = formData;
    props.login({ username, password });
  };
  return (
    <div className='row'>
      <div className='col-md-6 col-sm-8 mx-auto'>
        <div className='card'>
          <div className='card-header'>
            <h3>Login</h3>
          </div>
          <div className='card-body'>
            <form onSubmit={loginHandler}>
              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input
                  className='form-control'
                  type='username'
                  name='username'
                  onChange={event => onChange(event)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  className='form-control'
                  type='password'
                  name='password'
                  onChange={event => onChange(event)}
                />
              </div>
              <input
                type='submit'
                value='Login'
                className='btn btn-primary btn-block'
              />
            </form>
            <br />
            <p>
              Don't have an account? <Link to='/register'>Register Here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  { setAlert, login }
)(Login);
