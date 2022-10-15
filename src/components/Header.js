import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../img/logo.svg';
import { useQuery } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';
import ButtonAsLink from './ButtonAsLink';
import Navigation from './Navigation';

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
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),0 2px 6px 2px rgba(60, 64, 67, 0.15);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
`;

const StyledLink = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25em;
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

  @media(max-width: 700px) {
    margin-left: 1rem;
    height: 36px;
    width: 36px;
  }

  @media(min-width: 700px){
    display: none;
  }
`;

const Header = props => {
  //query hook for user logged in state
  const { data, client } = useQuery(IS_LOGGED_IN);
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
        <Link to="/"><img src={logo} alt="Notes Logo" height="40" /></Link>
        <LogoText><Link style={{ textDecoration: 'none', color: '#000000' }} to="/"><span style={{ color: "#0077cc" }}>N</span>otes</Link></LogoText>
        <UserState>
          {/*if logged in then dispplay a logout link, else display sign in options */}
          {data.isLoggedIn ? (
            <div>
              <ButtonAsLink
                onClick={() => {
                  //remove the token
                  localStorage.removeItem('token');
                  //clear the application cache
                  client.resetStore();
                  //update the local state
                  client.writeData({ data: { isLoggedIn: false } });
                  //redirect the user to homepage
                  props.history.push('/');
                }}
              >
                <StyledLink>
                  <span className="material-icons-outlined" style={{ fontSize: '1.5rem' }}>
                    logout
                  </span>
                  <p>Sign Out</p>
                </StyledLink>
              </ButtonAsLink>
            </div>
          ) : (
            <Link style={{ textDecoration: 'none' }} to="signin">
              <StyledLink>
                <span className="material-icons-outlined" style={{ fontSize: '1.5rem' }}>
                  login
                </span>
                <p>Sign In</p>
              </StyledLink>
            </Link>
          )}
        </UserState>
        <StyledButton onClick={toggleNav} disp={isShown}>
          {isShown === 'none' ? (
            <span className="material-icons-outlined" >
              menu
            </span>
          ) : (
            <span className="material-icons-outlined" >
              close
            </span>
          )
          }
        </StyledButton>
      </HeaderBar>
      <Navigation disp={isShown} />
    </div>
  );
};

export default withRouter(Header);
