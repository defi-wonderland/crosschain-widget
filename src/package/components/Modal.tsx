import { FC } from "react";
import styled from "styled-components";

import { StepType } from "~/types";

const SBaseModal = styled.div`
  padding: 20px;
  border-radius: 12px;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
  pointer-events: all;
  z-index: 10;
  width: 652px;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: start;

  box-sizing: border-box;

  font-size: 18px;
  font-weight: 400;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textPrimary};

  scroll-behavior: unset;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
`;

const ModalHeader = styled.div`
  color: ${(props) => props.theme.textPrimary};
  font-weight: bold;
  font-size: 28px;
  text-align: start;
  margin: 0;
  padding: 0;
`;

const CloseModal = styled.button`
  padding: 1px;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  transition: opacity 200ms ease-in-out;
  line-height: 1;

  &:hover {
    opacity: 0.8;
  }
`;

export interface ModalProps {
  className?: string;
  header?: string;
  children?: any;
  onClose?: (modal: StepType) => void;
}

export const BaseModal: FC<ModalProps> = ({
  className,
  header,
  onClose,
  children,
  ...props
}) => {
  let closeButton;

  if (onClose) {
    closeButton = (
      <CloseModal onClick={() => onClose(StepType.None)}>✖</CloseModal>
    );
  }
  return (
    <SBaseModal className={className + " modal"} {...props}>
      {closeButton}
      <ModalHeader>{header}</ModalHeader>

      {children}
    </SBaseModal>
  );
};
