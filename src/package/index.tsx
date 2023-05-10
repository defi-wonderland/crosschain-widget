import { FC } from "react";
import { createGlobalStyle } from "styled-components";
import { providers } from "ethers";

import {
  Transitions,
  Themable,
  FONT_SIZE_16,
  FONT_SIZE_20,
} from "~/components";
import { WidgetButton } from "~/WidgetButton";
import { NavigationProvider, DataProvider } from "~/providers";
import { PropTheme } from "~/types";

const GlobalStyle = createGlobalStyle<PropTheme>`

  /* Rubik */
  @font-face {
    font-family: 'Rubik';
    src: url('./fonts/Rubik-Regular.ttf') format('truetype'); 
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: 'Rubik';
    src: url('./fonts/Rubik-Medium.ttf') format('truetype'); 
    font-style: normal;
    font-weight: 500;
  }

  .modal span,.modal strong {
    padding: 0;
    margin: 0;
    font-size: ${FONT_SIZE_16};
  }

  .modal h1 {
    font-size: ${FONT_SIZE_20};
    padding: 0;
    margin: 0;
    line-height: 1.125;
  }

  .modal * {
    box-sizing: border-box;
    font-family: Rubik, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }
  
  select {
    /* A reset of styles, including removing the default dropdown arrow */
    appearance: none;
    /* Additional resets for further consistency */
    background-color: transparent;
    border: none;
    padding: 0 1rem 0 0;
    margin: 0;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
  }

  .modal::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  .modal::-webkit-scrollbar-thumb {
    background: #373737;
    border-radius: 4px;
  }

  .modal::-webkit-scrollbar-thumb:hover {
    background: #b3b3b3;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
  }

  .modal::-webkit-scrollbar-thumb:active {
    background-color: #999999;
  }
`;

export interface WidgetProps {
  originAddress: string;
  userChainId: number;
  setTx: (tx: string) => void;
  text?: string;
  modal?: boolean;
  provider?: providers.JsonRpcProvider;
  lightTheme?: boolean;
}

export const ZodiacConnextWidget: FC<WidgetProps> = ({
  originAddress,
  userChainId,
  text,
  modal = true,
  setTx,
  provider,
  lightTheme,
}) => {
  return (
    <Themable lightTheme={lightTheme}>
      <DataProvider
        originAddress={originAddress}
        userChainId={userChainId}
        setTx={setTx}
        provider={provider}
        lightTheme={lightTheme}
      >
        <NavigationProvider>
          <>
            <GlobalStyle />
            <WidgetButton text={text} modal={modal} />
            <Transitions modal={modal} />
          </>
        </NavigationProvider>
      </DataProvider>
    </Themable>
  );
};
