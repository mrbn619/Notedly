import React from 'react';
import Note from '../components/Note';
import { useQuery } from '@apollo/client';
import Loading from '../components/Loading';

//import GET_NOTE query
import { GET_NOTE } from '../gql/query';

const NotePage = props => {
  //store thhe in the url as a variable
  const id = props.match.params.id;

  //quer hook, passing the id as a variable
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  //if loading the data,
  if (loading) return <Loading />;

  //if error in fetching data
  if (error) return <p>Error!</p>;

  //if data is fetched successfully
  return <Note note={data.note} />;
};

export default NotePage;
