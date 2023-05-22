import styled from "styled-components";
import { FONT_SIZE_16 } from "./Variables";
import { FONT_SIZE_12 } from "~/components";
import { PropTheme } from "~/types";

export const Text = styled.p`
  color: ${(props) => props.theme.textPrimary};
  background-color: ${({ theme }: PropTheme) => theme.background};
  text-align: start;
  font-size: ${FONT_SIZE_16};
  line-height: 20px;
  margin: 0;
`;

export const ErrorText = styled.p`
  background-color: ${({ theme }: PropTheme) => theme.background};
  border-radius: 0;
  color: #ff3f3f;
  position: absolute;
  left: 0;
  bottom: -10px;
  text-align: start;
  font-size: ${FONT_SIZE_12};
  line-height: 20px;
  margin: -12px 0 0 12px;
`;
