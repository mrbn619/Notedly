import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Navigation from './Navigation';

//component styles
const Wrapper = styled.div`
  top: 80px;

  /*we can media query styles within styled components*/
  /*this will apply the layout for screens above 700px width*/
  @media (min-width: 700px) {
    display: flex;
    position: relative;
    top: 80px;
    height: calc(100% - 80px);
    width: 100%;
    flex: auto;
    flex-direction: column;
  }
`;

const Main = styled.main`
  position: fixed;
  width: 100%;
  padding: 1em;
  overflow-y: auto;
  /*again apply media query styles for screens above 700 px*/
  @media (min-width: 700px) {
    flex: 1;
    margin-left: calc(180px + 1em);
    height: calc(100% - 80px);
    width: calc(100% - calc(180px + 1em));
  }

  @media (max-width: 700px) {
    top: 80px;
    height: calc(100% - 80px);
  }
`;

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <Wrapper>
        <Navigation disp={'none'} />
        <Main id="scroll">{children}</Main>
      </Wrapper>
    </React.Fragment>
  );
};

export default Layout;
