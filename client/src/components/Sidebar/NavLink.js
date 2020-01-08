import React from 'react';
import {
  FaHome,
  FaPuzzlePiece,
  FaUserGraduate,
  FaEnvelope,
  FaRupeeSign,
  FaChartBar,
  FaDownload,
  FaSearch,
  FaTools
} from 'react-icons/fa';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 45px;
  color: #ffffff;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  padding: 5px 20px;
  display: flex;
  align-items: center;
  background: ${props => (props.active ? props.theme.gradient_simple_green : '')};
  cursor: pointer;
  transition: transform 0.2s;

  ${props =>
    props.active
      ? ''
      : `&:hover {
      transform: translateY(-4px);
    }`}

  > svg {
    /* margin-top: 5px; */
    font-size: 25px;
    color: #fff;
    margin-right: 20px;
  }
`;

const NavLink = props => {
  const getIcon = () => {
    switch (props.children) {
      case 'Dashboard':
        return <FaHome />;
      case 'Masters':
        return <FaPuzzlePiece />;
      case 'Student':
        return <FaUserGraduate />;
      case 'SMS':
        return <FaEnvelope />;
      case 'Fees':
        return <FaRupeeSign />;
      case 'Examination':
        return <FaChartBar />;
      case 'Downloads':
        return <FaDownload />;
      case 'Enquiry':
        return <FaSearch />;
      case 'Settings':
        return <FaTools />;
      default:
        break;
    }
  };

  return (
    <li onClick={props.onClick}>
      <Link style={{ textDecoration: 'none' }} to={props.to}>
        <Container active={props.active}>
          {getIcon()}
          {props.children}
        </Container>
      </Link>
    </li>
  );
};

export default NavLink;
