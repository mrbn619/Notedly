import React from 'react';
import Note from './Note';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NoteWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding: 1em;
  border-radius: 2%;
  padding-bottom: 2em;
`;

const NoteFeed = ({ notes }) => {
  return (
    <div>
      {notes.map(note => (
        <NoteWrapper key={note.id}>
          <Note note={note} />
          <Link to={`note/${note.id}`}>Permalink</Link>
        </NoteWrapper>
      ))}
    </div>
  );
};

export default NoteFeed;
