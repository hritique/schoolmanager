import React, { useState } from 'react';
import { NavTabs } from '../../NavTabs';
import styled from 'styled-components';
import { Classes } from './Classes';

const Container = styled.div``;

const Masters = () => {
  const links = {
    1: { value: 'Classes', active: true },
    2: { value: 'Masters', active: false },
    3: { value: 'Fee Slabs', active: false },
    4: { value: 'Assessments', active: false }
  };
  return (
    <Container>
      <NavTabs links={links} />
      <Classes />
    </Container>
  );
};

export default Masters;
