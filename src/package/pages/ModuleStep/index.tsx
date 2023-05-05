import { BaseModal, Button, Text } from "~/components";
import { ModalProps, StepType } from "~/types";
import { useNavigationContext } from "~/providers";

export const ModuleStep = ({ ...props }: ModalProps) => {
  const { setType } = useNavigationContext();
  return (
    <BaseModal
      {...props}
      onBack={() => setType(StepType.START)}
      header="Safe Module Setup"
    >
      <Text>
        Before continuing, you will need to deploy and enable the Connext Module
        in your Safe.
      </Text>

      <Text>1. Go to:</Text>
      <Button>
        <a href="/" target="_blank">
          Zodiac Application
        </a>
      </Button>

      <Text>
        2. Select the &quot;Connect Module&quot; and follor the instructions
      </Text>
      <Text>3. In origin chain add: 0x00000000000000000</Text>
      <Text>4. In origin address add: 0x00000000000000000</Text>
      <Button
        onClick={async () => {
          console.log("Checking setup...");
        }}
      >
        Verify setup
      </Button>
      <Button
        onClick={async () => {
          setType(StepType.START);
        }}
      >
        Cancel
      </Button>
    </BaseModal>
  );
};
