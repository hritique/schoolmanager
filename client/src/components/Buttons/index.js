import React from 'react';
import styled from 'styled-components';

const ButtonPrimary = styled.button`
  width: 110px;
  height: 35px;
  border-radius: 5px;
  background: ${props => {
    switch (props.type) {
      case 'sucess':
        return '#219653';
      case 'danger':
        return '#EB5757';
      case 'cancel':
        return '#828282';
      default:
        break;
    }
  }};
  border: none;
  font-family: inherit;
  text-transform: uppercase;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    cursor: pointer;
  }
`;

const ButttonSecondary = styled.button`
  width: 110px;
  height: 35px;
  border-radius: 5px;
  background: none;
  border: 2px solid
    ${props => {
      switch (props.type) {
        case 'sucess':
          return '#219653';
        case 'danger':
          return '#EB5757';
        case 'cancel':
          return '#828282';
        default:
          break;
      }
    }};
  font-family: inherit;
  text-transform: uppercase;
  color: ${props => {
    switch (props.type) {
      case 'sucess':
        return '#219653';
      case 'danger':
        return '#EB5757';
      case 'cancel':
        return '#828282';
      default:
        return `${props.theme.primaryOrange}`;
    }
  }};
  font-size: 16px;
  font-weight: 500;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    cursor: pointer;
  }
`;

export const Primary = props => {
  return <ButtonPrimary type={props.type}>{props.children}</ButtonPrimary>;
};

export const Secondary = props => {
  return <ButttonSecondary type={props.type}>{props.children}</ButttonSecondary>;
};
