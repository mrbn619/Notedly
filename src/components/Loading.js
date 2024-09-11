import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const Loader = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border-top: 2px solid rgba(0, 119, 204, 0.75);
  animation: spinner 1.5s linear infinite;

  @media (max-width: 700px) {
    height: 30px;
    width: 30px;
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => {
  return (
    <Wrapper>
      <Loader />
    </Wrapper>
  );
};

export default Loading;
