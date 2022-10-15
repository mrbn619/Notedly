import React, { useState } from 'react';
import Button from './Button';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),0 2px 6px 2px rgba(60, 64, 67, 0.15);
  border-radius: 10px;
  max-width: 500px;
  padding: 1em;
  margin: auto;
`;

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }

  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;

const UserForm = props => {
  //set the default values of state
  const [values, setValues] = useState();
  //update the state when the user types in the form
  const onChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


  return (
    <Wrapper>
      {/*display the appropriate form header*/}
      {props.formType === 'signup' ? <h2>Sign Up</h2> : <h2>Sign In</h2>}

      {/*perform a mutation when user submits a form*/}
      <Form
        onSubmit={event => {
          event.preventDefault();
          props.action({
            variables: {
              ...values
            }
          });
        }}
      >
        {props.formType === 'signup' && (
          <React.Fragment>
            <label htmlFor="username">Username:</label>
            <input
              required
              type="text"
              name="username"
              id="username"
              onChange={onChange}
              placeholder="username"
            />
          </React.Fragment>
        )}
        <label htmlFor="email">Email:</label>
        <input
          required
          type="email"
          name="email"
          id="email"
          onChange={onChange}
          placeholder="Email"
        />
        <label htmlFor="password">Password:</label>
        <input
          required
          type="password"
          name="password"
          id="password"
          onChange={onChange}
          placeholder="Password"
        />
        {props.formType === 'signin' && (
          <React.Fragment>
            <em>not a member?{' '}</em>
            <Link style={{ textDecoration: 'none', fontSize: '1.1rem' }} to="/signup">Sign Up</Link>
          </React.Fragment>
        )}
        <p> </p>
        <Button type="submit">Submit</Button>
      </Form>
    </Wrapper>
  );
};

export default UserForm;
