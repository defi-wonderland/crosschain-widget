import styled from "styled-components";
import { FONT_SIZE_12 } from "./Variables";

export const Text = styled.p`
  color: ${(props) => props.theme.textPrimary};
  text-align: start;
  font-size: ${FONT_SIZE_12};
`;
