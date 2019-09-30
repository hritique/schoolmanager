import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  let links;
  if (localStorage.getItem('token')) {
    links = (
      <Fragment>
        <li className='nav-item dropdown'>
          <a
            className='nav-link dropdown-toggle'
            id='student-menu'
            role='button'
            href='#!'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'>
            Student
          </a>
          <div className='dropdown-menu' aria-labelledby='student-menu'>
            <Link to='/addStudent' className='dropdown-item'>
              Add Student
            </Link>

            <a href='#!' className='dropdown-item'>
              Show Student by SID
            </a>

            <a href='#!' className='dropdown-item'>
              Show all the Students
            </a>
          </div>
        </li>
        <li className='nav-item dropdown'>
          <a
            className='nav-link dropdown-toggle'
            id='fee-menu'
            role='button'
            href='#!'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'>
            Fee
          </a>
          <div className='dropdown-menu' aria-labelledby='fee-menu'>
            <a href='#!' className='dropdown-item'>
              Add Fee
            </a>

            <a href='#!' className='dropdown-item'>
              Show Fee by SID
            </a>

            <a href='#!' className='dropdown-item'>
              Show all the Fees
            </a>
          </div>
        </li>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <nav
        className='navbar navbar-expand-lg navbar-dark bg-dark'
        style={{ marginBottom: '40px' }}>
        <div className='container'>
          <Link to='/dashboard' className='navbar-brand'>
            SCHOOL <strong>MANAGER</strong>
          </Link>
          <ul className='navbar-nav'>{links}</ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
