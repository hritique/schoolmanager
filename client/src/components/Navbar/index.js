import React from 'react';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

import { logout } from '../../actions/auth';

const Container = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 59px;
  background: ${props => props.theme.primaryBackplate};
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
`;

const LogoBox = styled.div`
  width: 242px;
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    width: 19px;
    height: 16px;
    color: #fff;
    transform: translateY(-1px);
    margin-right: 15px;
  }
`;

const UserBox = styled.div`
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 35px;
`;

const LogoTitle = styled.h1`
  font-family: inherit;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-transform: uppercase;
  color: #fff;
`;

const UserText = styled.h2`
  font-size: 12px;
  line-height: 15px;
  color: ${props => props.theme.primaryGreen};
  text-transform: capitalize;
  font-weight: normal;
`;

const Logout = styled.a`
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-transform: uppercase;
  color: ${props => props.theme.primaryOrange};
  cursor: pointer;
`;

const index = ({ logout }) => {
  return (
    <Container>
      <LogoBox>
        <FaBars />
        <LogoTitle>School Manager</LogoTitle>
      </LogoBox>
      <UserBox>
        <UserText>Good morning, hritique rungta</UserText>
        <Logout onClick={logout}>Logout</Logout>
      </UserBox>
    </Container>
  );
};

index.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps, { logout })(index);
