import React from 'react';
import Note from './Note';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NoteWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding: 1em;

  @media (max-width: 700px) {
    border-bottom: 1px solid #333;
    padding: 0px;
    padding-bottom: 2em;
    margin-bottom: 2em;
    margin-top: 0.5em;
  }

`;

const LinkBox = styled.div`
  border: 1px solid #f6f6f6;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: block;
  padding: 12px;

  :hover {
    box-shadow: 0 1px 2px 0 rgba(0, 119, 204, 0.3),0 2px 6px 2px rgba(0, 119, 204, 0.15);
  }

  @media (max-width: 700px) {
    height: 40px;
    width: 40px;
    padding: 7px;
    border: 1px solid #333;

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
            <Link id='link' to={`note/${note.id}`}>
              <abbr title="Open in full">
                <span className="material-icons-outlined">
                  open_in_full
                </span>
              </abbr>
            </Link>
          </LinkBox>
        </NoteWrapper>
      ))}
    </div>
  );
};

export default NoteFeed;
