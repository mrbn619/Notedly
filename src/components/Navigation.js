import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  padding: 1em;
  background: #f5f4f0;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.25);

  @media (max-width: 700px) {
    padding-top: 64px;
    background: #fff;
  }

  @media (min-width: 700px) {
    position: fixed;
    width: 220px;
    height: calc(100% - 64px);
    overflow-y: auto;
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


const Navigation = () => {
  return (
    <Nav>
      <NavList>
        <li>
          <span className="material-icons-sharp">house</span>
          <Link to="/"> Home</Link>
        </li>
        <li>
          <span className="material-icons-sharp">feed</span>
          <Link to="/mynotes"> My Notes</Link>
        </li>
        <li>
          <span className="material-icons-sharp">star</span>
          <Link to="/favorites"> Favorites</Link>
        </li>
        <li>
          <span className="material-icons-sharp">add</span>
          <Link to="/new"> New</Link>
        </li>
      </NavList>
    </Nav>
  );
};

export default Navigation;
