import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import NoteFeed from '../components/NoteFeed';
import ButtonAsLink from '../components/ButtonAsLink';
import Loading from '../components/Loading';

//import GET_NOTES query
import { GET_NOTES } from '../gql/query';

const Home = () => {
  //use effect hook
  useEffect(() => {
    document.title = 'Notes';
  });

  //query hook
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  //if data is loading, display a loading message
  if (loading) return <Loading />;

  //if ther is an error fetching data, display error message
  if (error) return <p>Error!!</p>;

  //if the data is fetched successfully, display the data in our UI
  return (
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes} />
      {/* only display Load more button if hasNextPage is true*/}
      {data.noteFeed.hasNextPage && (
        <ButtonAsLink
          onClick={() =>
            fetchMore({
              variables: {
                cursor: data.noteFeed.cursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    //combine the new result and the old
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes
                    ],
                    _typename: 'noteFeed'
                  }
                };
              }
            })
          }
        >
          <strong>Load more</strong>
        </ButtonAsLink>
      )} 
    </React.Fragment>
  );
};

//export home module
export default Home;
