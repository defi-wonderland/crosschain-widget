import styled from "styled-components";

export const ArrowDown = styled.div<{ lightTheme?: boolean }>`
  width: 0;
  height: 0;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  border-top: 6px solid ${({ lightTheme }) => (lightTheme ? "black" : "white")};
`;

export const ArrowUp = styled.div<{ lightTheme?: boolean }>`
  width: 0;
  height: 0;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  border-bottom: 6px solid
    ${({ lightTheme }) => (lightTheme ? "black" : "white")};
`;

export const ArrowRight = styled.div<{ lightTheme?: boolean }>`
  width: 0;
  height: 0;
  border-bottom: 6px solid transparent;
  border-top: 6px solid transparent;
  border-left: 6px solid ${({ lightTheme }) => (lightTheme ? "black" : "white")};
`;

export const ArrowLeft = styled.div<{ lightTheme?: boolean }>`
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid
    ${({ lightTheme }) => (lightTheme ? "black" : "white")};
`;
