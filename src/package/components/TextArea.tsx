import styled from "styled-components";

import { Container, InputContainer, InputTitle } from "./Input";
import { PropTheme } from "~/types";
import { ErrorText } from "./Text";

const TextArea = styled.textarea.attrs({ spellcheck: false })<{
  error?: boolean;
}>`
  width: 100%;
  border: ${({ theme }: PropTheme) => theme.borderPrimary};
  ${({ error }) => error && `border-color: #FF3F3F;`}
  border-radius: ${({ theme }: PropTheme) => theme.borderRadius};
  background-color: ${({ theme }: PropTheme) => theme.background};
  color: ${({ theme }: PropTheme) => theme.textPrimary};
  padding: 15px 14px;
  font-size: 14px;
  cursor: text;
  font-weight: 400;
  line-height: 19px;
  display: flex;
  align-items: center;
  min-height: 160px;
  width: 100%;
  height: 160px;
  resize: none;

  &:disabled {
    color: ${({ theme }: PropTheme) => theme.textSecondary};
  }

  &:focus-visible {
    outline: none;
  }

  overflow-y: overlay;
  overflow-x: hidden; /* Hide scrollbars */

  &::-webkit-scrollbar {
    width: 4px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }: PropTheme) => theme.actionDisabled};
    border-radius: 4px;
  }

  &:disabled {
    opacity: 1;
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
  dataTestId?: string;
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
  dataTestId,
}: TAProps) => {
  return (
    <Container>
      <InputContainer>
        <InputTitle error={error}>{title}</InputTitle>
        <TextArea
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          wrap={wrap}
          error={error}
          data-testid={dataTestId}
        />
      </InputContainer>
      {error && <ErrorText>{errorMsg}</ErrorText>}
    </Container>
  );
};
