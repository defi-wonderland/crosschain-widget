import styled from "styled-components";

import { PropTheme } from "~/types";
import { ArrowDown, ErrorText, InputTitle } from "~/components";
import { useDropdownContext } from "./Dropdown";
import { useDataContext } from "~/providers";

export const SDropdownButton = styled.button<{ error?: boolean }>`
  border: ${({ theme }: PropTheme) => theme.borderPrimary};
  border-radius: ${({ theme }: PropTheme) => theme.borderRadius};
  background-color: ${({ theme }: PropTheme) => theme.background};
  color: ${({ theme }: PropTheme) => theme.textSecondary};
  ${({ error }) => error && `border-color: #FF3F3F;`}
  margin: 12px 0;
  z-index: 0;
  padding: 14px;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 184px;

  &:hover {
    opacity: 0.87;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 12px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export interface IDropdownButton {
  children: any;
  title?: string;
  icon?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorMsg?: string;
}
export const DropdownButton = ({
  children,
  title,
  icon,
  disabled,
  error,
  errorMsg,
}: IDropdownButton) => {
  const { show, setShow } = useDropdownContext();
  const { lightTheme } = useDataContext();

  const handleClick = () => {
    if (!disabled) setShow(!show);
  };

  return (
    <>
      <SDropdownButton onClick={handleClick} error={error}>
        <TextContainer>
          <InputTitle error={error}>{title}</InputTitle>
          {children}
        </TextContainer>
        {icon && <ArrowDown lightTheme={lightTheme} />}
      </SDropdownButton>
      {error && <ErrorText>{errorMsg}</ErrorText>}
    </>
  );
};
