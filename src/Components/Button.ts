import styled from "styled-components";
export const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: palevioletred;
  color: white;

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
  :disabled {
    opacity: 0.5;
  }
`;
