import React from 'react';

import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

const StyledNavLink = styled(Link)`
	width: 100%;
	padding: 0.6rem 1rem;
	color: #ffffff;
	font-size: 1rem;
	text-transform: capitalize;
	text-decoration: none;
	font-weight: 600;
	display: flex;
	align-items: center;
	cursor: pointer;
	transition: 0.1s;

	svg {
		font-size: 25px;
		color: #fff;
		margin-right: 1rem;
	}

	&.active {
		background-color: ${(props) => props.theme.gradient_simple_green};
	}

	&:not(.active) {
		&:hover {
			/* transform: translateX(4px); */
			border-left: 3px solid white;
		}
	}
`;

const NavLink = ({ to, icon, title }) => {
	return (
		<li>
			<StyledNavLink to={to} exact>
				{icon}
				{title}
			</StyledNavLink>
		</li>
	);
};

export default NavLink;
