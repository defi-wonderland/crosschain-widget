import styled from "styled-components";

import { useDropdownContext } from "./Dropdown";
import { PropTheme } from "~/types";

const Modal = styled.section`
  border: ${({ theme }: PropTheme) => theme.borderPrimary};
  background-color: ${({ theme }: PropTheme) => theme.background};
  color: ${({ theme }: PropTheme) => theme.textSecondary};
  font-weight: normal;
  position: absolute;
  text-align: center;
  white-space: nowrap;
  border-radius: 6px;
  max-height: 166px;
  z-index: 100;
  width: 100%;

  overflow-y: overlay;
  overflow-x: hidden; /* Hide scrollbars */

  &::-webkit-scrollbar {
    width: 2px;
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
