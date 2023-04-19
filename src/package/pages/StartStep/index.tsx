import { BaseModal, Button, Text } from "~/components";
import { ModalProps, StepType } from "~/types";
import { useNavigationContext } from "~/Context";

export const StartStep = ({ onClose, ...props }: ModalProps) => {
  const { address, setType, chainId } = useNavigationContext();

  const hasModule = false;
  return (
    <BaseModal {...props} onClose={onClose} header="Input Setup">
      <br />
      <Text>Sending as: {address}</Text>
      <Text>Origin chain: {chainId}</Text>
      <br />
      <br />
      <Text>Has Module: {hasModule.toString()}</Text>
      <br />
      <div>
        <Text>Select destination chain:</Text>
        <select name="Chains">
          <option value="Ethereum">Ethereum</option>
          <option value="Optimism">Optimism</option>
          <option value="Arbitrum">Arbitrum</option>
        </select>
      </div>
      <br />
      <div>
        <Text>Select destination safe:</Text>
        <select name="SafeAlias">
          <option value="0x1234...abcd">0x1234...abcd</option>
          <option value="0x1234...abcd">0x1234...abcd</option>
          <option value="0x1234...abcd">0x1234...ffff</option>
        </select>
      </div>
      <br />
      <br />
      <Button
        onClick={async () => {
          if (hasModule) {
            setType(StepType.TRANSACTION);
          } else {
            setType(StepType.MODULE_SETUP);
          }
        }}
      >
        Next
      </Button>

      <Button
        onClick={async () => {
          setType(StepType.SAFE_MODULE_CREATION);
        }}
      >
        Create New Safe
      </Button>
    </BaseModal>
  );
};
