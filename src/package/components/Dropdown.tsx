import styled from "styled-components";
import { PropTheme } from "~/types";
import { InputContainer, InputTitle } from "./Input";
import { FONT_SIZE_16 } from "./Variables";

const SDropdown = styled.select`
  width: 100%;
  border: ${({ theme }: PropTheme) => theme.borderPrimary};
  border-radius: ${({ theme }: PropTheme) => theme.borderRadius};
  background-color: ${({ theme }: PropTheme) => theme.background};
  color: ${({ theme }: PropTheme) => theme.textSecondary};
  padding: 12.5px 14px;
  font-size: ${FONT_SIZE_16};
  cursor: pointer;
  font-weight: 400;
  line-height: 19px;
  display: flex;
  align-items: center;

  & option {
    background-color: ${({ theme }: PropTheme) => theme.background};
    color: ${({ theme }: PropTheme) => theme.textPrimary};
  }
`;

interface TAProps {
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  title: string;
  children?: any;
  disabled?: boolean;
}

export const Dropdown = ({ onChange, title, children, disabled }: TAProps) => {
  return (
    <InputContainer>
      <InputTitle>{title}</InputTitle>
      <SDropdown onChange={onChange} disabled={disabled}>
        {children}
      </SDropdown>
    </InputContainer>
  );
};
