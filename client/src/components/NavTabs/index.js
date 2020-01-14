import React from 'react';
import styled from 'styled-components';
import { NavTabLinks } from './NavTabLinks';

const Container = styled.div`
  display: flex;
  border-radius: 5px;
  overflow: hidden;
`;

export const NavTabs = props => {
  return (
    <Container>
      {Object.keys(props.links).map(key => {
        return (
          <NavTabLinks
            key={key}
            active={props.links[key].active}
            onClick={() => props.onClick(key)}
          >
            {props.links[key].value}
          </NavTabLinks>
        );
      })}
    </Container>
  );
};
