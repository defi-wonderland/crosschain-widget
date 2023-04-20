import { BaseModal, Button } from "~/components";
import { ModalProps, StepType } from "~/types";
import { useNavigationContext } from "~/Context";

export const TransactionStep = ({ onClose, ...props }: ModalProps) => {
  const { setType } = useNavigationContext();
  return (
    <BaseModal {...props} onClose={onClose} header="Transaction Input Setup">
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
