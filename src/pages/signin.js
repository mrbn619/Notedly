import React, { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import UserForm from '../components/UserForm';

//import SIGNIN_USER mutation
import { SIGNIN_USER } from '../gql/mutation';

const SignIn = props => {
  useEffect(() => {
    document.title = 'Sign In - Notedly';
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
      {/*if the data is loading, display the loading message */}
      {loading && <p>Loading...</p>}
      {/*if error signing in, display the error message */}
      {error && <p>Error Signin In!</p>}
    </React.Fragment>
  );
};

export default SignIn;
