import styled from 'styled-components';

const ButtonAsLink = styled.button`
  background: none;
  color: rgba(0, 119, 204, 0.75);
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  :hover,
  :active {
    color: #004499;
  }
`;

export default ButtonAsLink;
