import styled from "styled-components";

const SSelector = styled.select`
  width: 100%;
  min-width: 15ch;
  max-width: 30ch;
  border: 1px solid #777;
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;

  &::after {
    content: "";
    width: 0.8em;
    height: 0.5em;
    background-color: #777;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }

  &::-ms-expand {
    display: none;
  }
`;

interface DropDownProps {
  name: string;
  children: any;
}

export const Dropdown = ({ children, name }: DropDownProps) => {
  return <SSelector name={name}>{children}</SSelector>;
};
