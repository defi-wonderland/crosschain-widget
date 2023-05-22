import styled from "styled-components";

import { Box } from "./Box";

export const ArrowDown = styled(Box)<{ lightTheme?: boolean }>`
  width: 0;
  height: 0;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  border-top: 6px solid
    ${({ lightTheme }) => (lightTheme ? "#777777" : "#ebebeb")};
`;

export const ArrowUp = styled(Box)<{ lightTheme?: boolean }>`
  width: 0;
  height: 0;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  border-bottom: 6px solid
    ${({ lightTheme }) => (lightTheme ? "#777777" : "#ebebeb")};
`;

export const ArrowRight = styled(Box)<{ lightTheme?: boolean }>`
  width: 0;
  height: 0;
  border-bottom: 6px solid transparent;
  border-top: 6px solid transparent;
  border-left: 6px solid
    ${({ lightTheme }) => (lightTheme ? "#777777" : "#ebebeb")};
`;

export const ArrowLeft = styled(Box)<{ lightTheme?: boolean }>`
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid
    ${({ lightTheme }) => (lightTheme ? "#777777" : "#ebebeb")};
`;
