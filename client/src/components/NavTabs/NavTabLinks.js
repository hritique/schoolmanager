import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Container = styled(NavLink)`
	height: 100%;
	padding: 0.5rem 0;
	margin-right: 1rem;
	border-bottom: 3px solid transparent;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	color: #fff;
	text-decoration: none;
	transition: 0.2s;

	&.active {
		color: ${(props) => props.theme.primaryOrange};
		border-bottom: 3px solid ${(props) => props.theme.primaryOrange};
	}
`;

const Title = styled.h1`
	font-size: 12px;
	font-weight: 600;
	text-transform: uppercase;
`;

export const NavTabLinks = (props) => {
	return (
		<Container to={props.to}>
			<Title>{props.children}</Title>
		</Container>
	);
};
