import styled from "styled-components";
import { PropTheme } from "~/types";
import { FONT_SIZE_16 } from "./Variables";

export const SInput = styled.input`
  width: 100%;
  border: ${({ theme }: PropTheme) => theme.borderPrimary};
  border-radius: ${({ theme }: PropTheme) => theme.borderRadius};
  background-color: ${({ theme }: PropTheme) => theme.background};
  color: ${({ theme }: PropTheme) => theme.textPrimary};
  padding: 8px 16px;
  font-size: ${FONT_SIZE_16};
  cursor: pointer;
  line-height: 1.5;
  margin: 5px 0;
`;
