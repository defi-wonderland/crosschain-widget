import { Text } from "./Text";
import styled from "styled-components";

import LightLogo from "~/assets/connext_light.png";
import DarkLogo from "~/assets/connext_dark.png";

const STextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  height: 22px;
`;

const SText = styled(Text)`
  font-weight: bold;
`;

const ConnextLogo = styled.img`
  font-weight: bold;
  height: 22px;
`;

interface PoweredByConnextProps {
  lightTheme?: boolean;
}

export const PoweredByConnext = ({ lightTheme }: PoweredByConnextProps) => {
  return (
    <STextContainer>
      <SText>Powered by</SText>
      <ConnextLogo alt="Connext" src={lightTheme ? LightLogo : DarkLogo} />
    </STextContainer>
  );
};
