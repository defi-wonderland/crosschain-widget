import styled from "styled-components";

import { Text, FONT_SIZE_16, FONT_SIZE_12, Box } from "~/components";
import trash from "~/assets/bin.svg";

export const OnwersList = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: -10px;
  gap: 6px;

  & input {
    margin-bottom: 0;
    font-size: 15.5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 418px;
  }
`;

export const OwnersContainer = styled(Box)`
  position: relative;
  width: 100%;
`;

export const ThresoldContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin: 12px 0 7px;

  & section button,
  & section {
    width: 76px;
  }

  & section section {
    max-height: 100px;
  }

  & section section p {
    text-align: start;
    padding-left: 14px;
    cursor: pointer;
    background-color: inherit;
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;

export const AddOwnerButton = styled.button`
  border-radius: none;
  border: none;
  background-color: inherit;
  color: inherit;
  padding: 0;
  font-size: ${FONT_SIZE_16};
  line-height: 20px;
  margin: 0;
  cursor: pointer;
  margin: 12px 0 22px;

  &:disabled {
    cursor: auto;
    opacity: 0.4;
    transition: opacity 200ms;
  }

  &:not(:disabled):hover {
    opacity: 0.7;
  }
`;

export const YourWalletMsg = styled(Text)`
  position: absolute;
  left: 0;
  font-size: ${FONT_SIZE_12};
  opacity: 0.6;
  margin-top: -8px;
  margin-left: 14px;
`;

export const TrashIcon = styled.img.attrs({
  src: trash,
  alt: "delete owner",
})<{ lightTheme?: boolean }>`
  background-color: transparent;
  border-radius: unset;
  color: inherit;
  width: 16px;
  opacity: 0.87;
  ${({ lightTheme }) => !lightTheme && "filter: invert(1)"};
`;

export const DeleteButton = styled.button`
  color: inherit;
  background-color: inherit;
  border-radius: unset;
  border: none;
  background-color: inherit;
  color: inherit;
  padding: 0;
  cursor: pointer;
  opacity: 0.7;
  margin-bottom: 10px;

  &:hover {
    opacity: 1;
  }
`;

export const ThresholdOption = styled(Box)<{ active?: boolean }>`
  ${({ active, theme }) => active && `background-color: ${theme.actionHover}`};

  &:hover {
    background-color: ${({ theme }) => theme.actionHover};
  }
`;
