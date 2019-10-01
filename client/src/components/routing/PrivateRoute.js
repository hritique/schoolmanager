import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setAlert } from '../../actions/alert';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  setAlert,
  ...rest
}) => {
  if (!isAuthenticated && !loading) {
    setAlert('You must login first', 'warning');
    return <Route {...rest} render={props => <Redirect to="/login" />} />;
  } else {
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setAlert }
)(PrivateRoute);
