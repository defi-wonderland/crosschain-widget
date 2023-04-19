export enum StepType {
  None = "",
  START = "Start",
  SAFE_MODULE_CREATION = "SafeModuleCreation",
  TRANSACTION = "Transaction",
  XCALLDATA_REVIEW = "xCallDataReview",

  MODULE_SETUP = "ModuleSetup",
  MODULE_SETUP_CONFIRMATION = "SafeModuleSetupLandingPage",
}

export interface ModalProps {
  onClose: (closeModal: StepType) => void;
}
