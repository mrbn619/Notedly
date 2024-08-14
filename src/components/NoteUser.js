import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import DeleteNote from './DeleteNote';
import FavoriteNote from './FavoriteNote';
import LoadingSmall from './LoadingSmall';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

//import GET_ME user query
import { GET_ME } from '../gql/query';

const NoteUser = props => {
  const { loading, error, data } = useQuery(GET_ME);
  //if data is loading, display the loading message
  if (loading) return <LoadingSmall/>;
  //if there was an error, display the error message
  //if (error) return <p>Please Reload!</p>;
  if (error)
    return (
      <LoadingSmall/>
    );

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
              <CreateOutlinedIcon />
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
