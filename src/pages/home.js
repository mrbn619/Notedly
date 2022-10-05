import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import NoteFeed from '../components/NoteFeed';
import ButtonAsLink from '../components/ButtonAsLink';
import Loading from '../components/Loading';
import styled from 'styled-components';

const ArrowWrapper = styled.div`
  border: 1px solid #f6f6f6;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ease 1s;

  :hover {
    box-shadow: 1px 5px 15px 5px rgba(0, 119, 204, 0.25);
  }

  @media (max-width: 700px) {
    :hover {
      box-shadow: none;
    }
  }
`;

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
        <ButtonAsLink id="link-btn"
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
        ><ArrowWrapper>
            <abbr title='Fetch more'>
              <span className="material-icons-outlined">
                south
              </span>
            </abbr>
          </ArrowWrapper>
        </ButtonAsLink>
      )}
    </React.Fragment>
  );
};

//export home module
export default Home;
