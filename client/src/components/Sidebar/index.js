import React, { useState } from 'react';
import styled from 'styled-components';
import NavLink from './NavLink';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 242px;
  height: 100vh;
  background: ${props => props.theme.primaryBackplate};
`;

const Nav = styled.ul`
  list-style: none;
  padding-top: 80px;
`;

const Sidebar = () => {
  const [navLinks, setNavLinks] = useState({
    1: { name: 'Dashboard', active: true, to: '/' },
    2: { name: 'Masters', active: false, to: '/masters' },
    3: { name: 'Student', active: false, to: '/student' },
    4: { name: 'SMS', active: false, to: '/sms' },
    5: { name: 'Fees', active: false, to: '/fee' },
    6: { name: 'Examination', active: false, to: '/exam' },
    7: { name: 'Downloads', active: false, to: '/downloads' },
    8: { name: 'Enquiry', active: false, to: '/enquiry' }
  });

  const onClickNav = async key => {
    const prevKey = Object.entries(navLinks).filter(
      objEntry => objEntry[1].active === true
    )[0][0];
    setNavLinks({
      ...navLinks,
      [prevKey]: { ...navLinks[prevKey], active: false },
      [key]: { ...navLinks[key], active: true }
    });
  };

  return (
    <Container>
      <Nav>
        {Object.keys(navLinks).map(key => {
          return (
            <NavLink
              key={key}
              active={navLinks[key].active}
              onClick={() => onClickNav(key)}
              to={navLinks[key].to}
            >
              {navLinks[key].name}
            </NavLink>
          );
        })}
      </Nav>
    </Container>
  );
};

export default Sidebar;
