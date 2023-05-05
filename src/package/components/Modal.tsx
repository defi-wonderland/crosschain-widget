import { FC } from "react";
import styled from "styled-components";

import { StepType } from "~/types";
import { FONT_SIZE_20 } from "./Variables";

const SBaseModal = styled.div`
  letter-spacing: 0.25px;
  padding: 20px;
  border-radius: 12px;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
  pointer-events: all;
  z-index: 10;
  width: 518px;
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

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
`;

const ModalHeader = styled.div`
  color: ${(props) => props.theme.textPrimary};
  font-weight: bold;
  letter-spacing: 0.5px;
  font-size: ${FONT_SIZE_20};
  text-align: start;
  margin: 12px 0;
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
