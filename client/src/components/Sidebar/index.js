import React from 'react';
import styled from 'styled-components';
import NavLink from './NavLink';

import {
  FaHome,
  FaPuzzlePiece,
  FaUserGraduate,
  FaEnvelope,
  FaRupeeSign,
  FaChartBar,
  FaDownload,
  FaSearch,
} from 'react-icons/fa';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 15rem;
  height: 100%;
  padding-top: 3rem;
  background: ${(props) => props.theme.primaryBackplate};
`;

const Nav = styled.ul`
  list-style: none;
  padding: 1rem 0;
`;

const Sidebar = () => {
  return (
    <Container>
      <Nav>
        <NavLink to="/" exact icon={<FaHome />} title="Dashboard" />
        <NavLink to="/masters" icon={<FaPuzzlePiece />} title="Masters" />
        <NavLink to="/student" icon={<FaUserGraduate />} title="Student" />
        <NavLink to="/sms" icon={<FaEnvelope />} title="SMS" />
        <NavLink to="/fees" icon={<FaRupeeSign />} title="Fees" />
        <NavLink to="/exam" icon={<FaChartBar />} title="Examination" />
        <NavLink to="/downloads" icon={<FaDownload />} title="Downloads" />
        <NavLink to="/enquiry" icon={<FaSearch />} title="Enquiry" />
      </Nav>
    </Container>
  );
};

export default Sidebar;
