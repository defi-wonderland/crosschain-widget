import styled from "styled-components";
import { PropTheme } from "~/types";
import { FONT_SIZE_16 } from "./Variables";

export const SInput = styled.input`
  width: 100%;
  border: ${({ theme }: PropTheme) => theme.border};
  border-radius: ${({ theme }: PropTheme) => theme.borderRadius};
  padding: 8px 16px;
  font-size: ${FONT_SIZE_16};
  cursor: pointer;
  line-height: 1.1;
`;
