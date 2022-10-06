import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  padding: 1em;
  background: #f5f4f0;
  border: 2px solid #f6f6f6;

  @media (min-width: 700px) {
    position: fixed;
    width: 220px;
    height: calc(100% - 80px);
    overflow-y: auto;
  }

  @media(max-width: 700px){
    position: relative;
    display: ${props => props.disp};
    background: #fff;
    border: 2px solid #333;
    border-radius: 2%;
    margin: 0.5rem 1.5rem 0.5rem 1rem;
    z-index: 1;
  }
`;

const NavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 2;
  /* we can nest styles in styled components */
  /* the following styles will apply to links within NavList */
  a {
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1em;
    color: #333;
    transition: ease 1.5s;
  }
  a:visited {
    color: #333;
  }
  a:hover,
  a:focus {
    color: #0077cc;
  }
  
  li {
    display: flex;
    align-items: center;
    gap: 5px;
    transition: ease 1.5s;
  }

  li:hover,
  li:focus {
    color: #0077cc;
    padding-left: 1em;
  }
`;

const StyledButton = styled.button`
  position: relative;
  background: transparent;
  border: 2px solid #333;
  border-radius: 10%;

  :hover {
    border: none;
    background: #0077cc;
    color: #fff;
  }

  @media(max-width: 700px) {
    margin-top: calc(80px + 0.5rem);
    margin-left: 1rem;
    height: 30px;
    width: 30px;
  }

  @media(min-width: 700px){
    display: none;
  }
`;


const Navigation = () => {

  const [isShown, setIsShown] = useState('none');

  const toggleNav = () => {
    if (isShown == 'none') {
      setIsShown('inherit');
    } else {
      setIsShown('none');
    }
  };

  return (
    <div>
      <StyledButton onClick={toggleNav}>
        {isShown === 'none' ? (
          <span className="material-icons-outlined" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            menu
          </span>
        ) : (
          <span className="material-icons-outlined" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            close
          </span>
        )
        }
      </StyledButton>
      <Nav disp={isShown}>
        <NavList>
          <li>
            <span className="material-icons-outlined">home</span>
            <Link to="/"> Home</Link>
          </li>
          <li>
            <span className="material-icons-outlined">feed</span>
            <Link to="/mynotes"> My Notes</Link>
          </li>
          <li>
            <span className="material-icons-outlined">star_border</span>
            <Link to="/favorites"> Favorites</Link>
          </li>
          <li>
            <span className="material-icons-outlined">add</span>
            <Link to="/new"> New</Link>
          </li>
        </NavList>
      </Nav>

    </div>
  );
};

export default Navigation;
