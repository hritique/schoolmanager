import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Content from './Content';

const Layout = props => {
  return (
    <Fragment>
      {!props.isAuthenticated ? (
        ''
      ) : (
        <Fragment>
          <Navbar />
          <Sidebar />
        </Fragment>
      )}
      <Content />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Layout);
