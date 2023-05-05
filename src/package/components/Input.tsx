import styled from "styled-components";
import { PropTheme } from "~/types";
import { FONT_SIZE_16, FONT_SIZE_12 } from "./Variables";

const Input = styled.input`
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

  &:disabled {
    user-select: none;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 12px 0;
`;

export const InputTitle = styled.p`
  position: absolute;
  text-align: start;
  font-size: ${FONT_SIZE_12};
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textPrimary};
  top: -6px;
  left: 14px;
  line-height: 1;
  margin: 0px;
  padding: 0 4px;
`;

interface InputProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder?: string | undefined;
  title?: string;
  value?: string;
  disabled?: boolean;
}

export const SInput = ({
  onChange,
  title,
  placeholder,
  value,
  disabled,
}: InputProps) => {
  return (
    <InputContainer>
      <InputTitle>{title}</InputTitle>
      <Input
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
      />
    </InputContainer>
  );
};
