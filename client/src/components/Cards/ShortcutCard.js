import React from 'react';
import styled from 'styled-components';
import { FaUserGraduate, FaPlus } from 'react-icons/fa';

const Container = styled.div`
  width: 136px;
  height: 150px;
  background-color: ${props => props.theme.gradient_simple_green};
  border-radius: 10px 10px 0px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
  margin-bottom: 50px;
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  }

  > svg {
    font-size: 44px;
    color: #fff;
  }
`;

const Title = styled.h2`
  font-family: inherit;
  color: ${props => props.theme.primaryOrange};
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  margin: 20px 0 15px 0;
  text-transform: uppercase;
`;

const AddButton = styled.div`
  height: 28px;
  width: 100%;
  margin-top: auto;
  margin-bottom: 0;
  background-color: ${props => props.theme.gradient_simple_red};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.gradient_simple_red_hover};
  }
`;

export const ShortcutCard = props => {
  return (
    <Container>
      <Title>{props.children}</Title>
      <FaUserGraduate />
      <AddButton>
        <FaPlus />
      </AddButton>
    </Container>
  );
};
