import styled from "styled-components";

import { PropTheme } from "~/types";
import { FONT_SIZE_16 } from "./Variables";

export const STextArea = styled.textarea`
  border: ${({ theme }: PropTheme) => theme.borderPrimary};
  border-radius: ${({ theme }: PropTheme) => theme.borderRadius};
  background-color: ${({ theme }: PropTheme) => theme.background};
  color: ${({ theme }: PropTheme) => theme.textPrimary};
  padding: 8px 8px;
  font-size: ${FONT_SIZE_16};
  cursor: pointer;
  line-height: 1.1;
  min-height: 200px;
  width: 100%;
  height: 200px;
  resize: none;
  margin: 5px 0;

  &::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #373737;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #b3b3b3;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb:active {
    background-color: #999999;
  }

  &:disabled {
    opacity: 0.4;
  }
`;
