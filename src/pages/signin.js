import React, { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import UserForm from '../components/UserForm';
import LoadingSmall from '../components/LoadingSmall';
import Styled from 'styled-components';

const Wrapper = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 30px;
    margin-top: 1em;
`;

//import SIGNIN_USER mutation
import { SIGNIN_USER } from '../gql/mutation';

const SignIn = props => {
  useEffect(() => {
    document.title = 'Sign In';
  });

  //apollo client
  const client = useApolloClient();

  //mutation hook
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      //store the token
      localStorage.setItem('token', data.signIn);
      //update the local cache
      client.writeData({ data: { isLoggedIn: true } });
      //redirect user to the homepage for initial signin, or navigate to requested page
      if (props.location.state)
        props.history.push(`${props.location.state.from.pathname}`);
      else props.history.push('/');
    }
  });
  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signin" />
      <Wrapper>
        {/*if the data is loading, display the loading message */}
        {loading && <LoadingSmall />}
        {/*if error signing in, display the error message */}
        {error && (
          <p>
            <b>Invalid</b> Credentials... Try Again!
          </p>
        )}
      </Wrapper>
    </React.Fragment>
  );
};

export default SignIn;
