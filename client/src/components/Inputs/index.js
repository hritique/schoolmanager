import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Title = styled.h2`
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => (props.disabled ? '#ccc' : props.theme.primaryOrange)};
  text-transform: uppercase;
  margin-bottom: 4px;

  transition: transform 0.2s, opacity 0.01s;
`;

const InputTextContainer = styled.div`
  border: 1px solid
    ${(props) => (props.disabled ? '#ccc' : props.theme.primaryOrange)};
  border-radius: 5px;
  height: 43px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 11px;
`;

const Input = styled.input`
  color: #fff;
  height: 100%;
  font-family: inherit;
  font-size: 15px;
  font-weight: normal;
  background: none;
  border: none;
  z-index: 10;

  &:focus {
    outline: none;
  }
`;

export const InputText = (props) => {
  return (
    <Container empty={props.value === ''}>
      <Title disabled={props.disabled}>{props.children}</Title>
      <InputTextContainer disabled={props.disabled}>
        <Input
          type={props.type}
          name={props.name}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
          autoFocus={props.autoFocus}
        />
      </InputTextContainer>
    </Container>
  );
};
