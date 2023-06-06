import { FC } from "react";
import { providers } from "ethers";

import { NavigationProvider, DataProvider } from "~/providers";
import { Transitions, Themable } from "~/components";
import { WidgetButton } from "~/WidgetButton";
import { GlobalStyle } from "~/Widget.styles";

export interface WidgetProps {
  provider?: providers.JsonRpcProvider;
  setTx: (tx: string) => void;
  originAddress: string;
  lightTheme?: boolean;
  userChainId: number;
  alchemyKey?: string;
  infuraKey?: string;
  modal?: boolean;
  text?: string;
}

export const ZodiacConnextWidget: FC<WidgetProps> = ({
  provider,
  setTx,
  originAddress,
  lightTheme,
  userChainId,
  alchemyKey = "",
  infuraKey = "",
  modal = true,
  text,
}) => {
  return (
    <Themable lightTheme={lightTheme}>
      <DataProvider
        provider={provider}
        setTx={setTx}
        originAddress={originAddress}
        lightTheme={lightTheme}
        userChainId={userChainId}
        alchemyKey={alchemyKey}
        infuraKey={infuraKey}
        modal={modal}
      >
        <NavigationProvider>
          <>
            <GlobalStyle />
            <WidgetButton text={text} />
            <Transitions />
          </>
        </NavigationProvider>
      </DataProvider>
    </Themable>
  );
};
