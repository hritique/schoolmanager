import styled from 'styled-components';

export const TabContainer = styled.div`
  width: 100%;
  max-width: 50rem;
  margin: 50px 0;
`;

export const TabHeader = styled.div`
  width: 100%;
  height: 45px;
  background-color: ${(props) => props.theme.secondary};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TabHeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
`;

export const TabContent = styled.div`
  display: flex;
  width: 100%;
  min-height: 40vh;
  padding: 30px 0 30px 50px;
  background-color: ${(props) => props.theme.gradient_simple_primary};
`;

export const TabContent_Main = styled.div`
  width: 40vw;
`;

export const TabContent_Side = styled.div`
  width: 20vw;
  border-left: 2px solid ${(props) => props.theme.secondary};

  & > h2 {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }
`;

export const ButtonContainer = styled.div`
  width: 250px;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
`;

export const SideListContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px auto;

  & > div {
    margin-bottom: 10px;
  }
`;
