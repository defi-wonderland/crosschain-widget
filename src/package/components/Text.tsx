import styled from "styled-components";
import { FONT_SIZE_16 } from "./Variables";

export const Text = styled.p`
  color: ${(props) => props.theme.textPrimary};
  text-align: start;
  font-size: ${FONT_SIZE_16};
  line-height: 1.5;
  margin: 5px 0;
`;
