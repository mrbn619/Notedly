import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Navigation from "./Navigation";

//component styles
const Wrapper = styled.div`
  /*we can media query styles within styled components*/
  /*this will apply the layout for screens above 700px width*/

  @media (min-width: 700px) {
    display: flex;
    top: 80px;
    position: relative;
    height: calc(100% - 80px);
    width: 100%;
    flex: auto;
    flex-direction: column;
  }
`;

const Main = styled.main`
  position: fixed;
  height: calc(100% - 300px);
  width: 100%;
  padding: 1em;
  overflow-y: auto;
  /*again apply media query styles for screens above 700 px*/
  @media (min-width: 700px) {
    flex: 1;
    margin-left: 220px;
    height: calc(100% - 80px);
    width: calc(100% - 220px);
  }
`;

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <Wrapper>
        <Navigation />
        <Main id="scroll" >{children}</Main>
      </Wrapper>
    </React.Fragment>
  );
};

export default Layout;
