import styled from 'styled-components';

const Button = styled.button`
  /*our styles goes here*/
  display: block;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  color: #fff;
  background-color: rgba(0, 119, 204, 0.75);
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  :active {
    background-color: #005fa3;
  }
`;

export default Button;
