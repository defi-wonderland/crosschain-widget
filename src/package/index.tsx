import { FC } from "react";
import { createGlobalStyle } from "styled-components";

import { Navigator, Themable, FONT_SIZE_16 } from "~/components";
import { WidgetButton } from "~/WidgetButton";
import { NavigationProvider, DataProvider } from "~/providers";
import { PropTheme } from "~/types";

const GlobalStyle = createGlobalStyle<PropTheme>`
  .modal h1,.modal span,.modal strong {
    padding: 0;
    margin: 0;
    font-size: ${FONT_SIZE_16};
  }

  .modal * {
    box-sizing: border-box;
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
  originChainId: number;
  text?: string;
}

export const ZodiacConnextWidget: FC<WidgetProps> = ({
  originAddress,
  originChainId,
  text,
}) => {
  return (
    <Themable>
      <DataProvider originAddress={originAddress} originChainId={originChainId}>
        <NavigationProvider>
          <>
            <GlobalStyle />
            <WidgetButton text={text} />
            <Navigator />
          </>
        </NavigationProvider>
      </DataProvider>
    </Themable>
  );
};
