import styled from "styled-components";

import { Box } from "~/components";
import { PropTheme } from "~/types";

/* ------------------ ModuleStep styles ------------------ */

export const IntructionsContainer = styled(Box)`
  flex-direction: column;
  margin: 24px 0;
  display: flex;
  gap: 4px;
`;

export const ExternalLink = styled.a.attrs({
  target: "_blank",
})`
  background-color: inherit;
  color: inherit;
  border-radius: 0;
  border-bottom: 1px solid ${({ theme }: PropTheme) => theme.buttonBackground};
  color: ${({ theme }: PropTheme) => theme.buttonBackground};
  text-decoration: none;
  font-weight: bold;
`;

/* ------------------ LoadingStep styles ------------------ */

export const LoadingContainer = styled(Box)`
  position: relative;
  padding-bottom: 63px;
  width: 100%;

  & p {
    position: absolute;
    text-align: center;
    width: 100%;
    left: 0;
  }

  & h1 {
    margin-bottom: 12px;
    margin-top: 20px;
  }
`;
