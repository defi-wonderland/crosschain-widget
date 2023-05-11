import styled from "styled-components";

import { PropTheme } from "~/types";
import { FONT_SIZE_14 } from "./Variables";
import { InputContainer, InputTitle } from "./Input";
import { ErrorText } from "./Text";

const TextArea = styled.textarea.attrs({ spellcheck: false })<{
  error?: boolean;
}>`
  width: 100%;
  border: ${({ theme }: PropTheme) => theme.borderPrimary};
  ${({ error }) => error && `border-color: #FF3F3F;`}
  border-radius: ${({ theme }: PropTheme) => theme.borderRadius};
  background-color: ${({ theme }: PropTheme) => theme.background};
  color: ${({ theme }: PropTheme) => theme.textSecondary};
  padding: 15px 14px;
  font-size: ${FONT_SIZE_14};
  cursor: pointer;
  font-weight: 400;
  line-height: 19px;
  display: flex;
  align-items: center;
  min-height: 160px;
  width: 100%;
  height: 160px;
  resize: none;

  &:focus-visible {
    outline: none;
  }

  &::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #373737;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #b3b3b3;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb:active {
    background-color: #999999;
  }

  &:disabled {
    opacity: 0.4;
  }
`;

interface TAProps {
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  placeholder?: string | undefined;
  title: string;
  value?: string;
  disabled?: boolean;
  wrap?: string;
  error?: boolean;
  errorMsg?: string;
}

export const STextArea = ({
  onChange,
  title,
  placeholder,
  value,
  disabled,
  wrap,
  error,
  errorMsg,
}: TAProps) => {
  return (
    <>
      <InputContainer>
        <InputTitle error={error}>{title}</InputTitle>
        <TextArea
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          wrap={wrap}
          error={error}
        />
      </InputContainer>
      {error && <ErrorText>{errorMsg}</ErrorText>}
    </>
  );
};
