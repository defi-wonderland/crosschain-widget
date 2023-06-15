import { FC } from "react";
import { providers } from "ethers";

import { NavigationProvider, DataProvider } from "~/providers";
import { Transitions, Themable } from "~/components";
import { WidgetButton } from "~/WidgetButton";
import { GlobalStyle } from "~/Widget.styles";

export interface WidgetProps {
  provider?: providers.JsonRpcProvider;
  signer?: providers.JsonRpcSigner;
  setTx: (tx: string) => void;
  originAddress: string;
  lightTheme?: boolean;
  userChainId: number;
  alchemyKey?: string;
  infuraKey?: string;
  className?: string;
  testnet?: boolean;
  modal?: boolean;
  text?: string;
}

export const ZodiacConnextWidget: FC<WidgetProps> = ({
  provider,
  signer,
  setTx,
  originAddress,
  lightTheme,
  userChainId,
  alchemyKey,
  infuraKey,
  className,
  testnet,
  modal = true,
  text,
}) => {
  return (
    <Themable lightTheme={lightTheme}>
      <DataProvider
        provider={provider}
        signer={signer}
        setTx={setTx}
        originAddress={originAddress}
        lightTheme={lightTheme}
        userChainId={userChainId}
        alchemyKey={alchemyKey}
        infuraKey={infuraKey}
        modal={modal}
        testnet={testnet}
      >
        <NavigationProvider>
          <>
            <GlobalStyle />
            <WidgetButton text={text} className={className} />
            <Transitions />
          </>
        </NavigationProvider>
      </DataProvider>
    </Themable>
  );
};
