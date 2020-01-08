import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 115px;
  height: 35px;
  background-color: ${props =>
    props.active ? props.theme.gradient_simple_red : props.theme.gradient_simple_green};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const NavTabLinks = props => {
  return (
    <Container active={props.active} onClick={props.onClick}>
      <Title>{props.children}</Title>
    </Container>
  );
};
