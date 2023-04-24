import styled from "styled-components";
import { PropTheme } from "~/types";
import { FONT_SIZE_20 } from "./Variables";

const SButton = styled.button`
  border: none;
  border-radius: ${({ theme }: PropTheme) => theme.borderRadius};
  background-color: ${({ theme }: PropTheme) => theme.buttonBackground};
  color: inherit;
  padding: 0.75rem;
  cursor: pointer;
  height: 56px;
  width: 100%;
  margin: 5px 0;
  opacity: 1;
  font-size: ${FONT_SIZE_20};

  &:hover {
    opacity: 0.9;
    transition: opacity 200ms;
  }
`;

interface ButtonProps {
  children: any;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return <SButton onClick={onClick}>{children}</SButton>;
};
