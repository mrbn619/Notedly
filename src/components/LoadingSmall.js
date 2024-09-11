import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div `
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`;

const Loader = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border-top: 2px solid rgba(0, 119, 204, 0.75);
    animation: spinner 1.5s linear infinite;

    @media(max-width: 700px){
        height: 20px;
        width: 20px;
    }
    
    @keyframes spinner {
        0% {transform: rotate(0deg);}
        100% {transform: rotate(360deg);}
    }
`;


const LoadingSmall = () => {
    return (
        <Wrapper>
            <Loader />
        </Wrapper>
    );
};

export default LoadingSmall;
