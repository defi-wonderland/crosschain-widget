import styled from "styled-components";
import { PropTheme } from "~/types";
import { FONT_SIZE_16, FONT_SIZE_12 } from "./Variables";
import { ErrorText } from "./Text";

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 12px 0;
  z-index: 0;
`;

const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  border: ${({ theme }: PropTheme) => theme.borderPrimary};
  border-radius: ${({ theme }: PropTheme) => theme.borderRadius};
  background-color: ${({ theme }: PropTheme) => theme.background};
  color: ${({ theme }: PropTheme) => theme.textSecondary};
  ${({ error }) => error && `border-color: #FF3F3F;`}
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

  &:focus-visible {
    outline: none;
  }
`;

export const InputTitle = styled.p<{ error?: boolean }>`
  position: absolute;
  text-align: start;
  font-size: ${FONT_SIZE_12};
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textPrimary};
  ${({ error }) => error && "color: #FF3F3F;"};
  top: -6px;
  left: 12px;
  line-height: 1;
  margin: 0px;
  padding: 0 4px;
  z-index: 1;
`;

interface InputProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder?: string | undefined;
  title?: string;
  value?: string;
  disabled?: boolean;
  error?: boolean;
  errorMsg?: string;
}

export const SInput = ({
  onChange,
  title,
  placeholder,
  value,
  disabled,
  error,
  errorMsg,
}: InputProps) => {
  return (
    <>
      <InputContainer>
        <InputTitle error={error}>{title}</InputTitle>
        <Input
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          error={error}
        />
      </InputContainer>
      {error && <ErrorText>{errorMsg}</ErrorText>}
    </>
  );
};
