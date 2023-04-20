import { FC } from "react";
import { createGlobalStyle } from "styled-components";

import { Pages } from "~/pages";
import { WidgetButton } from "~/WidgetButton";
import { NavigationProvider } from "~/Context";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-size: 18px;
    font-weight: 400;
    background-color: white;
    color: #121212;

    scroll-behavior: unset;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  select {
    /* A reset of styles, including removing the default dropdown arrow */
    appearance: none;
    /* Additional resets for further consistency */
    background-color: transparent;
    border: none;
    padding: 0 1em 0 0;
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
    <NavigationProvider
      originAddress={originAddress}
      originChainId={originChainId}
    >
      <>
        <GlobalStyle />
        <WidgetButton text={text} />
        <Pages />
      </>
    </NavigationProvider>
  );
};
