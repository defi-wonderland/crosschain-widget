import styled from "styled-components";

import { BaseModal, Button, Text } from "~/components";
import { ModalProps, PropTheme, StepType } from "~/types";
import { useDataContext, useNavigationContext } from "~/providers";
import { getConstants } from "~/config";

export const IntructionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 24px 0;
`;

export const ExternalLink = styled.a.attrs({
  target: "_blank",
})`
  color: ${({ theme }: PropTheme) => theme.buttonBackground};
  text-decoration: none;
  font-weight: bold;
  border-bottom: 1px solid ${({ theme }: PropTheme) => theme.buttonBackground};
`;

export const ModuleStep = ({ ...props }: ModalProps) => {
  const { setType } = useNavigationContext();
  const { Chains } = getConstants();
  const { safeAddress, destinyChain } = useDataContext();

  return (
    <BaseModal
      {...props}
      onBack={() => setType(StepType.START)}
      header="Safe module setup"
    >
      <Text>
        Before continuing, you will need to deploy and enable the Connext Module
        in your Safe.
      </Text>
      <IntructionsContainer>
        <Text>
          1. Go to:{" "}
          <ExternalLink
            href={`https://app.safe.global/apps/open?safe=${Chains[destinyChain].safeIdentifier}:${safeAddress}&appUrl=https%3A%2F%2Fzodiac.gnosisguild.org%2F`}
          >
            Zodiac Application
          </ExternalLink>
        </Text>

        <Text>
          2. Select &quot;Connext Module&quot; and follow the instructions
        </Text>
        <Text>3. In origin chain add: 0x00000000000000000</Text>
        <Text>4. In origin address add: 0x00000000000000000</Text>
      </IntructionsContainer>
      <Button
        onClick={async () => {
          console.log("Checking setup...");
        }}
      >
        Verify setup
      </Button>
    </BaseModal>
  );
};
