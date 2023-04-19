import { BaseModal, Button, Text } from "~/components";
import { ModalProps, StepType } from "~/types";
import { useModalContext } from "~/Context";

export const FinishStep = ({ onClose, ...props }: ModalProps) => {
  const { setType } = useModalContext();
  return (
    <BaseModal {...props} onClose={onClose} header="xCallData Review Step">
      <h2>Croos-chain Action</h2>
      <br />
      <br />
      <h2>Success!</h2>
      <br />
      <Text>Data...</Text>
      <Button>Copy Data</Button>
      <br />
      <br />
      <Text>Origin Chain: Ethereum</Text>
      <Text>Origin sender: 0x0000000000000000000000</Text>
      <Text>Destination Chain: Optimism</Text>
      <Text>Destination Safe: 0x111111111111111111111111111</Text>
      <br />
      <Text>Transactions batch...</Text>
      <br />
      <Button
        onClick={async () => {
          setType(StepType.None);
        }}
      >
        Confirm
      </Button>
    </BaseModal>
  );
};
