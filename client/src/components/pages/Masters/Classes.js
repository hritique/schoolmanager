import React, { useState } from 'react';
import styled from 'styled-components';
import { Primary, Secondary } from '../../Buttons';
import { InputText } from '../../InputTextBox';
import { ListItem } from '../../ListItem';

const TabContainer = styled.div`
  width: 100%;
  margin: 50px 0;
`;

const TabHeader = styled.div`
  width: 100%;
  height: 45px;
  background-color: ${props => props.theme.secondary};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabHeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
`;

const TabContent = styled.div`
  display: flex;
  width: 100%;
  padding: 30px 0 30px 50px;
  background-color: ${props => props.theme.gradient_simple_primary};
`;

const TabContent_Main = styled.div`
  width: 40vw;
`;

const TabContent_Side = styled.div`
  width: 20vw;
  border-left: 2px solid ${props => props.theme.secondary};

  & > h2 {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }
`;

const ButtonContainer = styled.div`
  width: 250px;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
`;

const SideListContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px auto;

  & > div {
    margin-bottom: 10px;
  }
`;

export const Classes = () => {
  const [value, setValue] = useState('');

  const onChangeHandler = e => {
    setValue(e.target.value);
  };
  return (
    <div>
      <TabContainer>
        <TabHeader>
          <TabHeaderTitle>CLASSES</TabHeaderTitle>
        </TabHeader>
        <TabContent>
          <TabContent_Main>
            <InputText type="text" value={value} onChange={onChangeHandler}>
              Class
            </InputText>
            <InputText type="text" value={value}>
              Teacher Incharge
            </InputText>
            <ButtonContainer>
              <Primary type="sucess">Create</Primary>
              <Primary type="cancel">Cancel</Primary>
            </ButtonContainer>
          </TabContent_Main>
          <TabContent_Side>
            <h2>Class List</h2>
            <SideListContainer>
              <ListItem>Nursery</ListItem>
              <ListItem>Nursery</ListItem>
              <ListItem>Nursery</ListItem>
              <ListItem>Nursery</ListItem>
              <ListItem>Nursery</ListItem>
              <ListItem>Nursery</ListItem>
            </SideListContainer>
          </TabContent_Side>
        </TabContent>
      </TabContainer>
    </div>
  );
};
