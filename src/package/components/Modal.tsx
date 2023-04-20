import { FC } from "react";
import styled from "styled-components";

import { StepType } from "~/types";

const SBaseModal = styled.div`
  padding: 20px;
  border-radius: 12px;
  overflow: hidden;
  overflow-y: auto;
  margin: 32px;
  color: white;
  position: relative;
  pointer-events: all;
  z-index: 10;
  width: 652px;
  height: 512px;
  max-width: 85%;
  max-height: 85%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-items: start;
  align-items: start;
`;

const ModalHeader = styled.div`
  color: #121212;
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
    <SBaseModal className={className} {...props}>
      {closeButton}
      <ModalHeader>{header}</ModalHeader>

      {children}
    </SBaseModal>
  );
};
