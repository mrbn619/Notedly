import React from 'react';
import NoteForm from '../components/NoteForm';
import { useQuery, useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';

//import GET_NOTE and GET_ME query
import { GET_NOTE, GET_ME } from '../gql/query';

//import EDIT_NOTE mutation
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {
  //store thhe in the url as a variable
  const id = props.match.params.id;

  //query hook, passing the id as a variable
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  //query to fetch current user data
  const { data: userdata } = useQuery(GET_ME);

  //define our mutation
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id
    },
    onCompleted: () => {
      props.history.push(`/note/${id}`);
    }
  });

  //if loading the data,
  if (loading) return <Loading />;

  //if error in fetching data
  if (error) return <p>Error! Note not found</p>;

  //check to see if current user and the author of the note doesnot match
  if (userdata.me.id !== data.note.author.id) {
    return (
      //redirect the user to user notes page, which the user has access to edit
      <Redirect to={{ pathname: '/mynotes' }} />
    );
  }

  //if data is fetched successfully
  return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;
