import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 270px;
  display: flex;
  flex-direction: column;
  margin: 10px 0;

  &:focus-within {
    h2 {
      transform: translateY(0px);
    }
  }

  h2 {
    ${props => (props.empty ? `transform: translateY(34px) translateX(11px)` : ``)};
  }
`;

const Title = styled.h2`
  font-size: 15px;
  font-weight: 600;
  color: ${props => (props.disabled ? '#ccc' : props.theme.primaryOrange)};
  text-transform: uppercase;
  margin-bottom: 4px;

  transition: transform 0.2s, opacity 0.01s;
`;

const InputTextContainer = styled.div`
  border: 1px solid ${props => (props.disabled ? '#ccc' : props.theme.primaryOrange)};
  border-radius: 5px;
  height: 43px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 11px;
`;

const Select = styled.select`
  color: #fff;
  font-family: inherit;
  font-size: 15px;
  font-weight: normal;
  background: none;
  border: none;
  z-index: 10;
  margin-right: 10px;

  &:focus {
    outline: none;
  }
`;

const Option = styled.option`
  color: #000;
  font-family: inherit;
  font-size: 15px;
  font-weight: normal;
  background-color: transparent;
`;

export const Menu = props => {
  const values = props.value;
  return (
    <Container empty={props.value === ''}>
      <Title disabled={props.disabled}>{props.children}</Title>
      <InputTextContainer disabled={props.disabled}>
        <Select
          name={props.name}
          id={props.id}
          disabled={props.disabled}
          onChange={props.onChange}
          value={props.selected}
        >
          <Option value="">Select Class</Option>
          {values.map(grade => (
            <Option key={grade._id} value={grade._id}>
              {grade.name}
            </Option>
          ))}
        </Select>
      </InputTextContainer>
    </Container>
  );
};
