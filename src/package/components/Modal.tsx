import { FC } from "react";
import styled from "styled-components";

import { StepType } from "~/types";
import { FONT_SIZE_20 } from "./Variables";
import { useDataContext } from "~/providers";
import { ArrowLeft } from "./ArrowIcons";

const SBaseModal = styled.div`
  padding: 38px;
  letter-spacing: 0.25px;
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
  justify-items: start;
  align-items: start;

  box-sizing: border-box;

  font-weight: 400;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textPrimary};
  border: ${({ theme }) => theme.borderPrimary};

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
  margin-bottom: 12px;
  padding: 0;
`;

const CloseModal = styled.button`
  padding: 0 20px 20px 0;
  right: 10px;
  top: 10px;
  cursor: pointer;
  transition: opacity 200ms ease-in-out;
  line-height: 1;
  border: none;
  background-color: transparent;
  color: inherit;

  &:hover {
    opacity: 0.8;
  }
`;

export interface ModalProps {
  className?: string;
  header?: string;
  children?: any;
  onBack?: (modal: StepType) => void;
}

export const BaseModal: FC<ModalProps> = ({
  className,
  header,
  onBack,
  children,
  ...props
}) => {
  let closeButton;
  const { lightTheme } = useDataContext();

  if (onBack) {
    closeButton = (
      <CloseModal onClick={() => onBack(StepType.None)}>
        <ArrowLeft lightTheme={lightTheme} />
      </CloseModal>
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
