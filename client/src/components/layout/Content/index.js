import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

// Pages
import Dashboard from '../../pages/Dashboard';
import Masters from '../../pages/Masters';

// Private Routing
//import PrivateRoute from './components/routing/PrivateRoute';

const Container = styled.div`
  position: absolute;
  left: 242px;
  top: 60px;
  padding: 50px 0 0 50px;
`;

const Content = () => {
  return (
    <Container>
      <Switch>
        <Route path="/masters" component={Masters} />
        <Route path="/" exact component={Dashboard} />
      </Switch>
    </Container>
  );
};

export default Content;
