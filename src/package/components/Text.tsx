import styled from "styled-components";
import { FONT_SIZE_16 } from "./Variables";

export const Text = styled.p`
  color: ${(props) => props.theme.textPrimary};
  text-align: start;
  font-size: ${FONT_SIZE_16};
  line-height: 20px;
  margin: 0;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
