import React from 'react';
import Note from './Note';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ZoomOutMapOutlinedIcon from '@material-ui/icons/ZoomOutMapOutlined';

const NoteWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 1em;
  padding: 1em;

  @media (max-width: 700px) {
    padding: 0px;
    margin-top: 0.5em;
  }
`;

const LinkBox = styled.div`
  border: 1px solid #d9dcdc;
  height: 40px;
  width: 40px;
  background: #fff;
  border-radius: 50%;
  display: block;
  padding: 7px;

  :hover {
    box-shadow: 0 1px 2px 0 rgba(0, 119, 204, 0.3),
      0 2px 6px 2px rgba(0, 119, 204, 0.15);
  }

  @media (max-width: 700px) {
    height: 40px;
    width: 40px;
    padding: 7px;
    border: 1px solid #d9dcdc;

    :hover {
      box-shadow: none;
    }
  }
`;

const NoteFeed = ({ notes }) => {
  return (
    <div>
      {notes.map(note => (
        <NoteWrapper key={note.id}>
          <Note note={note} />
          <LinkBox>
            <Link id="link" to={`note/${note.id}`}>
              <abbr title="Open in full">
                <ZoomOutMapOutlinedIcon />
              </abbr>
            </Link>
          </LinkBox>
        </NoteWrapper>
      ))}
    </div>
  );
};

export default NoteFeed;
