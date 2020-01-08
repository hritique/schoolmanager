import React, { useState } from 'react';
import styled from 'styled-components';
import { NavTabLinks } from './NavTabLinks';

const Container = styled.div`
  display: flex;
  border-radius: 5px;
  overflow: hidden;
`;

export const NavTabs = props => {
  // const onClickNav = key => {
  //   const prevKey = Object.entries(links).filter(
  //     objEntry => objEntry[1].active === true
  //   )[0][0];
  //   setLinks({
  //     ...links,
  //     [prevKey]: { ...links[prevKey], active: false },
  //     [key]: { ...links[key], active: true }
  //   });
  // };

  return (
    <Container>
      {Object.keys(props.links).map(key => {
        return (
          <NavTabLinks key={key} active={props.links[key].active} onClick>
            {props.links[key].value}
          </NavTabLinks>
        );
      })}
    </Container>
  );
};
