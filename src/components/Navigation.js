import React from 'react';
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
    display: ${props => props.disp};
    position: relative;
    width: 220px;
    top: 70px;
    background: #fff;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),0 2px 6px 2px rgba(60, 64, 67, 0.15);
    border-radius: 10px;
    margin-left: auto;
    margin-right: 1em;
    z-index: 1;
  }
`;

const NavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 2;
  
  /* we can nest styles in styled components */
  .li {
    display: flex;
    align-items: center;
    gap: 5px;
    transition: ease 0.3s;
  }

  .li:hover {
    color: #0077cc;
    padding-left: 1rem;
    border-left: 1px solid #0077cc;
  }

  /* the following styles will apply to links within NavList */
  .link {
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1em;
    color: #333;
  }
  
  .link:visited {
    color: #333;
  }

  .link:hover{
    color: #0077cc;
  }

  .link:focus {
    padding-left: 1rem;
    color: #0077cc;
  }
  
`;


const Navigation = ({disp}) => {

  return (
    <div>
      <Nav disp={disp}>
        <NavList>
          <li className='li'>
            <span className="material-icons-outlined">home</span>
            <Link className="link" to="/"> Home</Link>
          </li>
          <li className='li'>
            <span className="material-icons-outlined">feed</span>
            <Link className="link" to="/mynotes"> My Notes</Link>
          </li>
          <li className='li'>
            <span className="material-icons-outlined">star_border</span>
            <Link className="link" to="/favorites"> Favorites</Link>
          </li>
          <li className='li'>
            <span className="material-icons-outlined">add</span>
            <Link className="link" to="/new"> New</Link>
          </li>
        </NavList>
      </Nav>
    </div>
  );
};

export default Navigation;
