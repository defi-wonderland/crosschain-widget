import { createGlobalStyle } from "styled-components";

import { FONT_SIZE_16, FONT_SIZE_20 } from "~/components";
import { PropTheme } from "~/types";

export const GlobalStyle = createGlobalStyle<PropTheme>`

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
    color: inherit;
    background-color: inherit;
    border-radius: inherit;
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

  /* Works for Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

  /* Works for Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`;
