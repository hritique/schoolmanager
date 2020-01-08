import React from 'react';
import styled from 'styled-components';
import { FaPencilAlt, FaEdit, FaTrash } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.gradient_simple_green};
  padding: 11px 13px;
  border-radius: 5px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60px;
  font-size: 20px;
`;

const Title = styled.h2`
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
`;

export const ListItem = props => {
  return (
    <Container>
      <Title>{props.children}</Title>
      <IconContainer>
        <FaEdit color="#fff" />
        <FaTrash color="red" />
      </IconContainer>
    </Container>
  );
};
