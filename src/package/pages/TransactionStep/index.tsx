import { BaseModal, Button } from "~/components";
import { ModalProps, StepType } from "~/types";
import { useModalContext } from "~/Context";

export const TransactionStep = ({ onClose, ...props }: ModalProps) => {
  const { setType } = useModalContext();
  return (
    <BaseModal {...props} onClose={onClose} header="Transaction Input Setup">
      <br />
      <br />
      <br />
      <Button
        onClick={async () => {
          setType(StepType.XCALLDATA_REVIEW);
        }}
      >
        Continue
      </Button>
    </BaseModal>
  );
};
