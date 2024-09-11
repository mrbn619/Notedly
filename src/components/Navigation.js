import React, { useState } from 'react';
import 'regenerator-runtime/runtime';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/client';
import ButtonAsLink from './ButtonAsLink';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import PresentToAllOutlinedIcon from '@material-ui/icons/PresentToAllOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

//import IS_LOGGED_IN query
import { IS_LOGGED_IN, GET_NOTES } from '../gql/query';

const Nav = styled.nav`
  background: #fff;
  margin-left: 1em;
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    position: fixed;
    width: 180px;
    top: calc(80px + 2em);
    border-radius: 10px;
    height: calc(100% - calc(80px + 4em));
    border: 1px solid #d9dcdc;
    overflow-y: auto;
  }

  @media (max-width: 700px) {
    display: ${props => props.disp};
    position: relative;
    width: 100%;
    top: 80px;
    border-bottom: 1px solid #d9dcdc;
    margin: auto;
    z-index: 1;
  }
`;

const TopList = styled.ul`
  margin: 0;
  padding: 1em;
  list-style: none;
  line-height: 2;
  flex-grow: 1;

  /* we can nest styles in styled components */
  .li {
    display: flex;
    align-items: center;
    justify-content: left;
    border-left: 3px solid #fff;
    padding-left: 5px;
    gap: 10px;
  }

  .li:hover {
    color: rgba(0, 119, 204, 0.75);
    background: #f6f8fb;
    border-left: 3px solid rgba(0, 119, 204, 0.75);
    border-radius: 5px;
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

  .link:hover {
    color: rgba(0, 119, 204, 0.75);
  }

  .link:focus {
    color: rgba(0, 119, 204, 0.75);
  }
`;

const BottomList = styled.ul`
  margin: 0;
  padding: 1em;
  line-height: 2;
  list-style: none;

  .li {
    display: flex;
    align-items: center;
    color: rgba(0, 119, 204, 0.75);
    justify-content: left;
    padding-left: 10px;
    gap: 5px;
  }

  .link {
    text-decoration: none;
    font-size: 1.1em;
  }
`;

const Navigation = ({ disp, ...props }) => {
  // for styling the Favorite icon on nav bar
  const [isHover, setIsHover] = useState(false);
  const FavoriteStyle = {
    color: isHover ? '#ff0000' : 'initial'
  };

  //query for user logged in state
  const { data } = useQuery(IS_LOGGED_IN);
  const client = useApolloClient();

  const refetchQueries = async () => {
    await client.query({
      query: GET_NOTES
    });
  };

  return (
    <div>
      <Nav disp={disp}>
        <TopList>
          <li className="li">
            <HomeOutlinedIcon />
            <Link className="link" to="/">
              {' '}
              Home
            </Link>
          </li>
          <li className="li">
            <EventNoteOutlinedIcon />
            <Link className="link" to="/mynotes">
              {' '}
              My Notes
            </Link>
          </li>
          <li
            className="li"
            style={FavoriteStyle}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <FavoriteBorderOutlinedIcon />
            <Link className="link" to="/favorites">
              {' '}
              Favorites
            </Link>
          </li>
          <li className="li">
            <AddOutlinedIcon />
            <Link className="link" to="/new">
              {' '}
              New
            </Link>
          </li>
        </TopList>
        <BottomList>
          {/*if logged in then display a logout link, else display sign in options */}
          {data.isLoggedIn ? (
            <li className="li">
              <PresentToAllOutlinedIcon />
              <ButtonAsLink
                style={{ fontSize: '1.1em' }}
                onClick={() => {
                  //remove the token
                  localStorage.removeItem('token');
                  //clear the application cache
                  client.cache.reset();
                  //update the local state
                  client.writeData({ data: { isLoggedIn: false } });
                  //refetch notefeed
                  refetchQueries();
                  //redirect the user to homepage
                  props.history.push('/');
                }}
              >
                {' '}
                Sign Out
              </ButtonAsLink>
            </li>
          ) : (
            <li className="li">
              <ExitToAppOutlinedIcon />
              <Link className="link" to="signin">
                {' '}
                Sign In
              </Link>
            </li>
          )}
        </BottomList>
      </Nav>
    </div>
  );
};

export default withRouter(Navigation);
