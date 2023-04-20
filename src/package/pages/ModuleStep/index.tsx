import { BaseModal, Button, Text } from "~/components";
import { ModalProps, StepType } from "~/types";
import { useNavigationContext } from "~/Context";

export const ModuleStep = ({ onClose, ...props }: ModalProps) => {
  const { setType } = useNavigationContext();
  return (
    <BaseModal {...props} onClose={onClose} header="Off-Chain Module Setup">
      <h2>Safe Module Setup</h2>

      <Text>
        Go to external site to deploy the module and setup the module on your
        safe.
      </Text>

      <Text>Then come back to this tab/widget and click check setup.</Text>
      <Button
        onClick={async () => {
          setType(StepType.MODULE_SETUP_CONFIRMATION);
        }}
      >
        Go to Module Setup and Safe Onboarding
      </Button>
      <Button
        onClick={async () => {
          setType(StepType.START);
        }}
      >
        Go back
      </Button>
      <Button
        onClick={async () => {
          console.log("Checking setup...");
        }}
      >
        Check Setup
      </Button>
    </BaseModal>
  );
};
