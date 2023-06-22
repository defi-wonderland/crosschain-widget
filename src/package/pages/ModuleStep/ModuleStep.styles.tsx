import styled from "styled-components";

import { Box, Text } from "~/components";
import { PropTheme } from "~/types";

/* ------------------ ModuleStep styles ------------------ */

export const IntructionsContainer = styled(Box)`
  flex-direction: column;
  margin: 24px 0;
  display: flex;
  gap: 5px;
`;

export const ExternalLink = styled.a.attrs({
  target: "_blank",
})`
  background-color: inherit;
  border-radius: 0;
  border-bottom: 1px solid ${({ theme }: PropTheme) => theme.textPrimary};
  color: ${({ theme }: PropTheme) => theme.textPrimary};
  text-decoration: none;
  font-weight: bold;
  margin-left: 4px;
`;

export const IntructionsText = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 4px;

  &:hover img {
    opacity: 0.8;
    transition: opacity 0.2s ease-in-out;
  }
`;

export const ExternalLinkContainer = styled(Box)`
  display: flex;
  flex-direction: row;

  & p {
    display: flex;
  }
`;

export const TextToCopy = styled(Text)`
  text-decoration: underline;
  cursor: pointer;
`;

export const InfoMsg = styled(Box)`
  width: auto;
  background: ${({ theme }: PropTheme) => theme.actionActive};
  border: ${({ theme }: PropTheme) => theme.border};
  border-radius: 4px;
  margin-left: 8px;

  & p {
    color: #202021;
    font-size: 11px;
    font-style: italic;
    padding: 3px 8px;
    margin: 0;
    line-height: 13px;
  }
`;

export const SText = styled(Text)`
  font-size: 15px;
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
    text-align: center;
  }
`;
