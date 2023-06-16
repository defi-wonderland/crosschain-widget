import styled from "styled-components";
import { PropTheme } from "~/types";
import { FONT_SIZE_16 } from "./Variables";
import { BasicSpinner } from "./BasicSpinner";

const SButton = styled.button<{ error?: boolean }>`
  border: none;
  border-radius: ${({ theme }: PropTheme) => theme.borderRadius};
  background-color: ${({ theme }: PropTheme) => theme.buttonBackground};
  color: ${({ theme }: PropTheme) => theme.actionActive};
  cursor: pointer;
  height: 56px;
  width: 100%;
  margin: 5px 0;
  opacity: 1;
  font-size: ${FONT_SIZE_16};
  letter-spacing: 0.25px;
  padding: 14px;
  line-height: 19px;
  min-height: 50px;
  transition: color 400ms, background-color 400ms;

  &:not(:disabled):hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${({ theme }: PropTheme) =>
      theme.actionDisabledBackground};
    color: ${({ theme }: PropTheme) => theme.actionDisabled};
    border: ${({ theme }: PropTheme) => theme.border};
    cursor: default;
  }

  ${({ error, theme }) =>
    error &&
    `
      &:disabled {
        background-color: inherit;
        color: ${theme.error};
        border: ${theme.borderError};
        cursor: default;
      }
    `}
`;

interface ButtonProps {
  children: any;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  dataTestId?: string;
}

export const Button = ({
  children,
  onClick,
  disabled,
  loading,
  error,
  dataTestId,
}: ButtonProps) => {
  return (
    <SButton
      onClick={onClick}
      disabled={disabled || error}
      error={error}
      data-testid={dataTestId}
    >
      {loading && <BasicSpinner />}
      {!loading && children}
    </SButton>
  );
};
