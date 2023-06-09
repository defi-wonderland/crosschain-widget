import styled from "styled-components";
import defaultImage from "~/assets/default.png";

interface TokenIconProps {
  chainName: string;
  alt?: string;
}

const Image = styled.img`
  height: 22px;
  width: 22px;
  border-radius: 100%;
  background-color: inherit;
  color: inherit;
  border-radius: inherit;
`;

export const TokenIcon = ({ chainName }: TokenIconProps) => {
  switch (chainName) {
    case "bnbChain":
      chainName = "binance";
      break;
    // add custom chain name here
  }

  return (
    <Image
      alt={chainName}
      src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chainName}/info/logo.png`}
      onError={(ev: any) => {
        ev.target.src = defaultImage;
      }}
    />
  );
};
