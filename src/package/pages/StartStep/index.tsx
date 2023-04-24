import { BaseModal, Button, Text, Dropdown } from "~/components";
import { ModalProps, StepType } from "~/types";
import { useNavigationContext } from "~/Context";

export const StartStep = ({ onClose, ...props }: ModalProps) => {
  const { address, setType, chainId } = useNavigationContext();

  const hasModule = true;
  return (
    <BaseModal {...props} onClose={onClose} header="Cross chain action">
      <Text>Sending as: {address}</Text>
      <Text>Origin chain: {chainId}</Text>

      <div>
        <Text>Select destination chain:</Text>
        <Dropdown name="Chains">
          <option value="Ethereum">Ethereum</option>
          <option value="Optimism">Optimism</option>
          <option value="Arbitrum">Arbitrum</option>
        </Dropdown>
      </div>

      <div>
        <Text>Select destination safe:</Text>
        <Dropdown name="SafeAlias">
          <option value="0x1234...abcd">0x1234...abcd</option>
          <option value="0x1234...abcd">0x1234...abcd</option>
          <option value="0x1234...abcd">0x1234...ffff</option>
        </Dropdown>
      </div>

      <Button
        onClick={async () => {
          if (hasModule) {
            setType(StepType.TRANSACTION);
          } else {
            setType(StepType.MODULE_SETUP);
          }
        }}
      >
        Use existent Safe
      </Button>

      <Button
        onClick={async () => {
          setType(StepType.SAFE_MODULE_CREATION);
        }}
      >
        Create a new Safe
      </Button>
    </BaseModal>
  );
};
