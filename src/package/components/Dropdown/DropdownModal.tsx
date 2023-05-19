import styled from "styled-components";

import { useDropdownContext } from "./Dropdown";
import { PropTheme } from "~/types";

const Modal = styled.section`
  border: ${({ theme }: PropTheme) => theme.borderPrimary};
  border-radius: ${({ theme }: PropTheme) => theme.borderRadius};
  background-color: ${({ theme }: PropTheme) => theme.background};
  color: ${({ theme }: PropTheme) => theme.textSecondary};
  font-weight: 600;
  position: absolute;
  text-align: center;
  white-space: nowrap;
  z-index: 100;
  max-height: 160px;
  width: 100%;

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
`;

export interface IDropdownModal {
  children: any;
}

export const DropdownModal = ({ children }: IDropdownModal) => {
  const { show } = useDropdownContext();

  if (!show) return <></>;

  return <Modal>{children}</Modal>;
};
