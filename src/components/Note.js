import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Loading from './Loading';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

import styled from 'styled-components';
import NoteUser from './NoteUser';

import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../gql/query';

//import the format utility from date-fns
import { format } from 'date-fns';

//keep notes from extending wider than 800px
const StyledNote = styled.article`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 1em;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
  border-radius: 10px;
  padding: 1em;
  background: #fff;

  @media (max-width: 700px) {
    box-shadow: none;
    border: 1px solid #d9dcdc;
  }
`;

//style the note metadata
const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: top;
  }
`;

const MetaInfo = styled.div`
  display: inline-block;
  padding-right: 1em;
  padding-bottom: 1em;

  img {
    border: 1px solid #333;
    border-radius: 10px;
    padding: 5px;

    @media (max-width: 700px) {
      border-radius: 5px;
    }
  }
`;

//align UserActions to right on big screens
const UserActions = styled.div`
  margin-left: auto;
  padding: 0.5em;
  border: 1px solid #d9dcdc;
  border-radius: 10px;

  @media (max-width: 700px) {
    border-radius: 5px;
  }

  @media (max-width: 500px) {
    display: flex;
    align-items: top;
    gap: 0.5em;
  }
`;

//content wrapper
const ContentWrapper = styled.div`
  overflow: auto;
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
        <MetaInfo>
          <img
            src={note.author.avatar}
            alt="{note.author.username} avatar"
            height="50px"
            width="50px"
          />
        </MetaInfo>
        <MetaInfo>
          <em>by</em> {note.author.username} <br />
          {format(note.createdAt, 'MMM Do YYYY')}
        </MetaInfo>
        {data.isLoggedIn ? (
          <UserActions>
            <NoteUser note={note} />
          </UserActions>
        ) : (
          <UserActions>
            {note.favoriteCount > 0 ? (
              <abbr title="Likes">
                <FavoriteOutlinedIcon style={{ color: '#ff0000' }} />
              </abbr>
            ) : (
              <abbr title="Likes">
                <FavoriteBorderOutlinedIcon style={{ color: '#ff0000' }} />
              </abbr>
            )}
            {note.favoriteCount}
          </UserActions>
        )}
      </MetaData>
      <ContentWrapper>
        <ReactMarkdown children={note.content} remarkPlugins={[remarkGfm]} />
      </ContentWrapper>
    </StyledNote>
  );
};

export default Note;
