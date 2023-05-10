import styled from "styled-components";

import { PropTheme } from "~/types";
import { InputTitle } from "~/components";
import { useDropdownContext } from "./Dropdown";

export const SDropdownButton = styled.button`
  border: ${({ theme }: PropTheme) => theme.borderPrimary};
  border-radius: ${({ theme }: PropTheme) => theme.borderRadius};
  background-color: ${({ theme }: PropTheme) => theme.background};
  color: ${({ theme }: PropTheme) => theme.textSecondary};
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

const ArrowIcon = styled.div`
  width: 0;
  height: 0;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  border-top: 6px solid white;
`;

export interface IDropdownButton {
  children: any;
  title?: string;
  icon?: boolean;
  disabled?: boolean;
}
export const DropdownButton = ({
  children,
  title,
  icon,
  disabled,
}: IDropdownButton) => {
  const { show, setShow } = useDropdownContext();

  const handleClick = () => {
    if (!disabled) setShow(!show);
  };

  return (
    <SDropdownButton onClick={handleClick}>
      <TextContainer>
        <InputTitle>{title}</InputTitle>
        {children}
      </TextContainer>
      {icon && <ArrowIcon />}
    </SDropdownButton>
  );
};
