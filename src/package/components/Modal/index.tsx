import { FC } from "react";
import { StepType } from "~/types";
import "./Modal.css";

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
      <button className="close-modal" onClick={() => onClose(StepType.None)}>
        ✖
      </button>
    );
  }
  return (
    <div className={className + " modal"} {...props}>
      {closeButton}
      <h2 className="modal-header">{header}</h2>

      {children}
    </div>
  );
};
