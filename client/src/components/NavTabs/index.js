import React from 'react';
import styled from 'styled-components';
import { NavTabLinks } from './NavTabLinks';

const Container = styled.div`
	display: flex;
	overflow: hidden;
`;

export const NavTabs = (props) => {
	return (
		<Container>
			{Object.keys(props.links).map((key) => {
				return (
					<NavTabLinks key={key} to={props.links[key].value}>
						{props.links[key].name}
					</NavTabLinks>
				);
			})}
		</Container>
	);
};
