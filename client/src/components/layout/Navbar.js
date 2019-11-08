import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ logout, isAuthenticated, loading }) => {
  const guestLinks = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul className="navbar-nav">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          id="student-menu"
          role="button"
          href="#!"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Student
        </a>
        <div className="dropdown-menu" aria-labelledby="student-menu">
          <Link to="/addStudent" className="dropdown-item">
            Add Student
          </Link>

          <a href="#!" className="dropdown-item">
            Show Student by SID
          </a>

          <Link to="/students" className="dropdown-item">
            Show all the Students
          </Link>
        </div>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          id="fee-menu"
          role="button"
          href="#!"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Fee
        </a>
        <div className="dropdown-menu" aria-labelledby="fee-menu">
          <a href="#!" className="dropdown-item">
            Add Fee
          </a>

          <a href="#!" className="dropdown-item">
            Show Fee by SID
          </a>

          <a href="#!" className="dropdown-item">
            Show all the Fees
          </a>
        </div>
      </li>
      <li className="nav-item">
        <a onClick={logout} className="nav-link" href="#!">
          Logout
        </a>
      </li>
    </ul>
  );

  return (
    <Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{ marginBottom: '40px' }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand">
            SCHOOL <strong>MANAGER</strong>
          </Link>
          {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
        </div>
      </nav>
    </Fragment>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
