export enum StepType {
  None = "",
  START = "Start",
  SAFE_MODULE_CREATION = "SafeModuleCreation",
  MODULE_SETUP = "ModuleSetup",
  TRANSACTION = "Transaction",
  XCALLDATA_REVIEW = "xCallDataReview",
}

export interface ModalProps {
  onClose: (closeModal: StepType) => void;
}
