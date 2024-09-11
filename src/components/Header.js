import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../img/logo.svg';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import RightCorner from './RightCorner';

//import IS_LOGGED_IN query
import { IS_LOGGED_IN } from '../gql/query';

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 80px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #d9dcdc;
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const Header = props => {
  //query hook for user logged in state
  const { data } = useQuery(IS_LOGGED_IN);

  //change the state for toggling navigation bar
  const [isShown, setIsShown] = useState('none');

  //toggle nav
  const toggleNav = () => {
    if (isShown == 'none') {
      setIsShown('inherit');
    } else {
      setIsShown('none');
    }
  };

  return (
    <div>
      <HeaderBar>
        <Link to="/">
          <img src={logo} alt="Notes Logo" height="40" />
        </Link>
        <LogoText>
          <Link style={{ textDecoration: 'none', color: '#000000' }} to="/">
            <span style={{ color: 'rgba(0, 119, 204, 0.75)' }}>N</span>otes
          </Link>
        </LogoText>
        <RightCorner
          logged={data.isLoggedIn}
          toggleNav={toggleNav}
          isShown={isShown}
        />
      </HeaderBar>
      <Navigation disp={isShown} />
    </div>
  );
};

export default Header;
