import styled from "styled-components";
import { PropTheme } from "~/types";
import { FONT_SIZE_16 } from "./Variables";
import { BasicSpinner } from "./BasicSpinner";

const SButton = styled.button`
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
  height: 50px;
  transition: color 400ms, background-color 400ms;

  &:hover {
    transform: scale(1.01);
    transition: transform 400ms;
  }

  &:disabled {
    background-color: ${({ theme }: PropTheme) =>
      theme.actionDisabledBackground};
    color: ${({ theme }: PropTheme) => theme.actionDisabled};
    border: ${({ theme }: PropTheme) => theme.borderPrimary};
    cursor: default;
  }
`;

interface ButtonProps {
  children: any;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const Button = ({
  children,
  onClick,
  disabled,
  loading,
}: ButtonProps) => {
  return (
    <SButton onClick={onClick} disabled={disabled}>
      {loading && <BasicSpinner />}
      {!loading && children}
    </SButton>
  );
};
