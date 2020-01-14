import React, { useState } from 'react';
import { NavTabs } from '../../NavTabs';
import styled from 'styled-components';
import Classes from './Classes';
import Subjects from './Subjects';

const Container = styled.div``;

const Masters = () => {
  const [tabLinks, setTabLinks] = useState({
    1: { value: 'Classes', active: false },
    2: { value: 'Subjects', active: true },
    3: { value: 'Fees', active: false },
    4: { value: 'Assessments', active: false }
  });

  const onClickTab = async key => {
    const prevKey = Object.entries(tabLinks).filter(
      objEntry => objEntry[1].active === true
    )[0][0];
    setTabLinks({
      ...tabLinks,
      [prevKey]: { ...tabLinks[prevKey], active: false },
      [key]: { ...tabLinks[key], active: true }
    });
  };

  return (
    <Container>
      <NavTabs links={tabLinks} onClick={key => onClickTab(key)} />
      <Subjects />
    </Container>
  );
};

export default Masters;
