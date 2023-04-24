import styled from "styled-components";
import { PropTheme } from "~/types";

const SSelector = styled.select`
  width: 100%;
  border: ${({ theme }: PropTheme) => theme.borderPrimary};
  border-radius: ${({ theme }: PropTheme) => theme.borderRadius};
  padding: 0.25rem 1rem;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.5;
  color: inherit;
  margin: 5px 0;

  & option {
    background-color: ${({ theme }: PropTheme) => theme.background};
    color: ${({ theme }: PropTheme) => theme.textPrimary};
  }
`;

interface DropDownProps {
  name: string;
  children: any;
}

export const Dropdown = ({ children, name }: DropDownProps) => {
  return <SSelector name={name}>{children}</SSelector>;
};
