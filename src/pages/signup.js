import React, { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import UserForm from '../components/UserForm';
import Loading from '../components/Loading';

//import SIGNUP_USER mutation
import { SIGNUP_USER } from '../gql/mutation';

const SignUp = props => {
  useEffect(() => {
    //update the document title
    document.title = 'Sign Up';
  });

  //apollo client
  const client = useApolloClient();

  //mutation hook
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      //store the JWT on localStorsge
      localStorage.setItem('token', data.signUp);

      //update the local cache
      client.writeData({ data: { isLoggedIn: true } });

      //redirect the user to the home page
      props.history.push('/');
    }
  });

  return (
    <React.Fragment>
      <UserForm action={signUp} formType="signup" />
      {/*if data is loading, display the loading message */}
      {loading && <Loading />}
      {/*if there is an error, display the error message */}
      {error && <p>Error creating an account!</p>}
    </React.Fragment>
  );
};

export default SignUp;
