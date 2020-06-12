import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import PropTypes from 'prop-types';
import moment from 'moment';

// Redux
import { connect } from 'react-redux';

import { logout } from '../../actions/auth';

const Container = styled.div`
	z-index: 1000;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 3rem;
	padding: 0 1.5rem;
	background: ${(props) => props.theme.primaryBackplate};
	box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
	display: flex;
	justify-content: space-between;
`;

const LogoBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		width: 19px;
		height: 16px;
		color: #fff;
		margin-right: 1rem;
	}
`;

const UserBox = styled.div`
	display: flex;
	align-items: center;
`;

const LogoTitle = styled.h1`
	font-weight: 600;
	font-size: 1rem;
	text-transform: uppercase;
	color: #fff;
`;

const UserText = styled.span`
	font-size: 0.8rem;
	color: white;
	margin-right: 1rem;
`;

const Logout = styled.a`
	font-weight: 600;
	font-size: 0.8rem;
	color: ${(props) => props.theme.primaryOrange};
	cursor: pointer;
`;

const Navbar = ({ logout, ...props }) => {
	const [greeting, setGreeting] = useState('');

	useEffect(() => {
		const currentHour = parseInt(moment().format('HH'));

		const getGreeting = (hour) => {
			if (hour >= 0 && hour < 12) {
				setGreeting('Good morning');
			} else if (hour >= 12 && hour < 17) {
				setGreeting('Good afternoon');
			} else if (hour >= 17 && hour < 20) {
				setGreeting('Good evening');
			} else {
				setGreeting('Good night');
			}
		};
		getGreeting(currentHour);
	}, []);

	return (
		<Container>
			<LogoBox>
				<FaBars />
				<LogoTitle>School Manager</LogoTitle>
			</LogoBox>
			<UserBox>
				<UserText>
					{greeting}, {(props.user && props.user.name) || 'Guest'}
				</UserText>
				<Logout onClick={logout}>LOGOUT</Logout>
			</UserBox>
		</Container>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	loading: state.auth.loading,
	user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
