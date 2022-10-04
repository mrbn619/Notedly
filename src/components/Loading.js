import React from 'react';
import styled from 'styled-components';

const Loader = styled.div `

.container {
    margin: auto;
    width: 100%;
    height: 100%;
    position: relative;
} 

.loader {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border-top: 2px solid #6c7378;
    position: absolute;
    top: 50%;
    left: 45%;
    animation: spinner 1.5s linear infinite;
}

@keyframes spinner {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
}

`;


const Loading = () => {
    return (
        <Loader className="container">
            <Loader className="loader" />
        </Loader>
    );
};

export default Loading;
