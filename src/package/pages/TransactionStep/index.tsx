import {
  BaseModal,
  Button,
  Dropdown,
  SInput,
  Text,
  STextArea,
} from "~/components";
import { ModalProps, StepType } from "~/types";
import { useNavigationContext } from "~/Context";

export const TransactionStep = ({ onClose, ...props }: ModalProps) => {
  const { setType } = useNavigationContext();
  return (
    <BaseModal {...props} onClose={onClose} header="Transaction Input Setup">
      <Text>Enter Address</Text>
      <SInput placeholder="target contract address" />
      <Text>Enter ABI</Text>
      <STextArea />
      <br />
      <h1>Transaction Information</h1>
      <Text>Contract Method Selector</Text>
      <Dropdown name={"method"}>
        <option value="approve">approve</option>
        <option value="transfer">transfer</option>
      </Dropdown>
      <SInput placeholder="param 1" />
      <SInput placeholder="param 2" />
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
