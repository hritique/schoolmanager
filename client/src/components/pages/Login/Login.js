import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { login } from '../../../actions/auth';
import styled from 'styled-components';
import { InputText } from '../../Inputs';
import { Menu } from '../../Inputs/Select';

const Container = styled.div`
	position: relative;
	width: 450px;
	height: 550px;
	top: 20vh;
	left: 37vw;
	background-color: rgba(0, 0, 0, 0.5);
`;

const LoginBanner = styled.div`
	background-color: ${(props) => props.theme.gradient_simple_green};
	height: 55px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const LoginTitle = styled.h1`
	font-family: inherit;
	color: #fff;
	text-transform: uppercase;
	font-weight: 500;
`;

const FormContainer = styled.div`
	width: 100%;
	height: 495px;
	padding: 20px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const SignInButton = styled.button`
	width: 270px;
	height: 35px;
	margin-top: 15px;
	color: #fff;
	background: #219653;
	border-radius: 5px;
	border: none;
	font-family: inherit;
	text-transform: uppercase;
	color: #fff;
	font-size: 16px;
	font-weight: 500;
	cursor: pointer;
	transition: transform 0.2s;

	&:hover {
		transform: translateY(-2px);
		cursor: pointer;
	}
`;

const Login = (props) => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	const [roles, setRoles] = useState([]);

	const onUsernameChange = (event) =>
		setFormData({ ...formData, username: event.target.value });

	const onPasswordChange = (event) =>
		setFormData({ ...formData, password: event.target.value });

	const onSignIn = () => {
		const { username, password } = formData;
		props.login({ username, password });
		console.log(props.history);
		props.history.push('/');
	};

	const loginHandler = async (event) => {
		event.preventDefault();
		const { username, password } = formData;
		props.login({ username, password });
	};

	// Redirect if authenticated
	if (props.isAuthenticated) {
		return <Redirect to="/" />;
	}

	return (
		<Container>
			<LoginBanner>
				<LoginTitle>Login</LoginTitle>
			</LoginBanner>
			<FormContainer>
				<InputText
					type="text"
					value={formData.username}
					onChange={onUsernameChange}
				>
					Username
				</InputText>
				<InputText
					type="password"
					value={formData.password}
					onChange={onPasswordChange}
				>
					Password
				</InputText>
				<Menu value={roles} default="Select role">
					Role
				</Menu>
				<SignInButton onClick={onSignIn}>Sign In</SignInButton>
			</FormContainer>
		</Container>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

{
	/* <div className="row">
        <div className="col-md-6 col-sm-8 mx-auto">
          <div className="card">
            <div className="card-header">
              <h3>Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={loginHandler}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    className="form-control"
                    type="username"
                    name="username"
                    onChange={event => onChange(event)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    onChange={event => onChange(event)}
                  />
                </div>
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary btn-block"
                />
              </form>
              <br />
              <p>
                Don't have an account? <Link to="/register">Register Here</Link>
              </p>
            </div>
          </div>
        </div>
      </div> */
}
