import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../img/logo.svg';
import { useQuery } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';
import ButtonAsLink from './ButtonAsLink';
import Navigation from './Navigation';
import PresentToAllOutlinedIcon from '@material-ui/icons/PresentToAllOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import DehazeOutlinedIcon from '@material-ui/icons/DehazeOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

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

const RightCorner = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1em;
`;

const StyledLink = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-size: 1.1rem;
`;

const StyledButton = styled.button`
  display: block;
  padding: 6px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  background: #0077cc;
  color: #fff;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    background-color: #005fa3;
  }

  @media (max-width: 700px) {
    height: 36px;
    width: 36px;
  }

  @media (min-width: 700px) {
    display: none;
  }
`;

const Header = props => {
  if (props.match.params.id) {
    console.log(props.match.params.id);
  }
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
            <span style={{ color: '#0077cc' }}>N</span>otes
          </Link>
        </LogoText>
        <RightCorner>
          {!data.isLoggedIn && (
            <Link
              style={{
                textDecoration: 'none',
                fontSize: '1.1rem',
                marginLeft: 'auto'
              }}
              to="/signup"
            >
              Sign Up
            </Link>
          )}
          <StyledButton onClick={toggleNav} disp={isShown}>
            {isShown === 'none' ? (
              <DehazeOutlinedIcon />
            ) : (
              <CloseOutlinedIcon />
            )}
          </StyledButton>
        </RightCorner>
      </HeaderBar>
      <Navigation disp={isShown} />
    </div>
  );
};

export default withRouter(Header);
