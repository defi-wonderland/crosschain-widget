import { FC } from "react";
import { createGlobalStyle } from "styled-components";

import { Navigator, Themable, FONT_SIZE_16 } from "~/components";
import { WidgetButton } from "~/WidgetButton";
import { NavigationProvider } from "~/Context";
import { PropTheme } from "~/types";

const GlobalStyle = createGlobalStyle<PropTheme>`
  .modal p,.modal h1,.modal span,.modal strong {
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
`;

export interface ModalProps {
  originAddress: string;
  originChainId: number;
  text?: string;
}

export const ZodiacConnextWidget: FC<ModalProps> = ({
  originAddress,
  originChainId,
  text,
}) => {
  return (
    <Themable>
      <NavigationProvider
        originAddress={originAddress}
        originChainId={originChainId}
      >
        <>
          <GlobalStyle />
          <WidgetButton text={text} />
          <Navigator />
        </>
      </NavigationProvider>
    </Themable>
  );
};
