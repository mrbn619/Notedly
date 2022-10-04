import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Loading from './Loading';

import styled from 'styled-components';
import NoteUser from './NoteUser';

import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../gql/query';


//import the format utility from date-fns
import { format } from 'date-fns';

//keep notes from extending wider than 800px
const StyledNote = styled.article`
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 1em;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.25);
  border-radius: 1%;
  padding: 1em;
`;

//style the note metadata
const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: top;
  }
`;

//add some space between the avatar and meta info
const WrapMetaInfo = styled.div `
    border: 1px solid #f6f6f6;
    border-radius: 1%;
    transition: ease 1s;

    :hover { 
      box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.25);
    }
`;

const MetaInfo = styled.div`
  display: inline-block;
  padding-right: 1em;
  padding-bottom: 1em;
`;

//align UserActions to right on big screens
const UserActions = styled.div`
  margin-left: auto;
  border: 1px solid #f6f6f6;
  padding: 1em;
  border-radius: 5%;
  transition: ease 1s;

  :hover {
    box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.25);
  }

`;

//content wrapper
const ContentWrapper = styled.div `
  overflow: auto;
  transition: ease 1s;
`;

const Note = ({ note }) => {
  //IS_LOGGED_IN query
  const { loading, error, data } = useQuery(IS_LOGGED_IN);

  //if loading, display the loading message
  if (loading) return <Loading />;

  //if there was an error, display the error message
  if (error) return <p>Error!</p>;

  return (
    <StyledNote>
      <MetaData>
        <WrapMetaInfo>
            <MetaInfo>
              <img
                src={note.author.avatar}
                alt="{note.author.username} avatar"
                height="50px"
              />
            </MetaInfo>
            <MetaInfo>
              <em>by</em> {note.author.username} <br />
              {format(note.createdAt, 'MMM Do YYYY')}
            </MetaInfo>
        </WrapMetaInfo>
        {data.isLoggedIn ? (
          <UserActions>
            <NoteUser note={note} />
          </UserActions>
        ) : (
          <UserActions>
            <em>Favorites: </em>
            {note.favoriteCount}
          </UserActions>
        )}
      </MetaData>
      <ContentWrapper>
        <ReactMarkdown
          children={note.content} 
          remarkPlugins={[remarkGfm]}  
        />
      </ContentWrapper>
    </StyledNote>
  );
};

export default Note;
