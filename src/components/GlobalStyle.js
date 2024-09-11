//import createGlobalStyle and normailze
import { createGlobalStyle } from 'styled-components';
import normalize from 'normalize.css';

//we can write css as a js template literal
export default createGlobalStyle`

    ${normalize}
    *, *:before, *:after {
        box-sizing: border-box;
    }
    
    /* width */
    ::-webkit-scrollbar {
      width: 6px;
      height: 4px;
    }

    @media(max-width: 700px) {
        ::-webkit-scrollbar {
            width: 4px;
            height: 4px;
        }
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1; 
      border-radius: 10px;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: rgba(51, 51, 51, 0.5); 
      border-radius: 10px;
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 119, 204, 0.6); 
    }

    body,
    html {
        height: 100%;
        margin: 0;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans,
        Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
        background-color: #fff;
        line-height: 1.4;
        background: #EEF0F3;
    }

    a:link,
    a:visited {
        color: rgba(0, 119, 204, 0.75);
    }

    a:hover,
    a:focus {
        color: #004499;
    }

    code,
    pre {
        max-width: 100%;
        overflow: auto;
        margin: 0 auto;
    }
`;
