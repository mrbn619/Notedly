import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import NoteFeed from '../components/NoteFeed';

//import the favorites query
import { GET_MY_FAVORITES } from '../gql/query';

const Favorites = () => {
  useEffect(() => {
    //update the document title
    document.title = 'Favorites';
  });

  //quer hook
  const { loading, error, data } = useQuery(GET_MY_FAVORITES);
  //if loading, display the loading message
  if (loading) return 'Loading...';
  //if there was an error, display the error message
  if (error) return `Error! ${error.message}`;
  //if query is successful and there are no notes, display a message
  //if there are notes display them
  if (data.me.favorites.length !== 0) {
    return <NoteFeed notes={data.me.favorites} />;
  } else {
    return <p>No favorites yet</p>;
  }
};

export default Favorites;
