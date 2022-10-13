import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import DeleteNote from './DeleteNote';
import FavoriteNote from './FavoriteNote';
import Loading from './Loading'; 

//import GET_ME user query
import { GET_ME } from '../gql/query';

const NoteUser = props => {
  const { loading, error, data } = useQuery(GET_ME);
  //if data is loading, display the loading message
  if (loading) return <Loading style={{width: '60px', height: '60px'}}/>;
  //if there was an error, display the error message
  if (error) return <p>Please Reload!</p>;

  return (
    <React.Fragment>
      <FavoriteNote
        me={data.me}
        noteId={props.note.id}
        favoriteCount={props.note.favoriteCount}
      />
      <br />
      {data.me.id === props.note.author.id && (
        <React.Fragment>
          <Link
            style={{ textDecoration: 'none' }}
            to={`/edit/${props.note.id}`}
          >
            <abbr title="Edit Note">
              <span className="material-icons-outlined">edit</span>
            </abbr>
          </Link>
          <br />
          <DeleteNote noteId={props.note.id} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default NoteUser;
