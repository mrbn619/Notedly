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
  }

`;

const LinkBox = styled.div`
  border: 2px solid #f6f6f6;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background: #0077cc;
  }

  #link: hover {
    color: #fff;
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
              <abbr title="Permalink">
                <span className="material-icons-sharp">
                  north_east
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
