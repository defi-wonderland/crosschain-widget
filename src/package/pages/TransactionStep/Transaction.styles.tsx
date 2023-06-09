import styled from "styled-components";

import { Box } from "~/components";

export const TransactionTitleContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;

  & div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }
`;

export const DropdownContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin: 12px 0 0px;

  & section button,
  & section {
    width: 100%;
  }

  & section section {
    max-height: 140px;
  }

  & section section p {
    text-align: start;
    cursor: pointer;
    padding: 8px 12px;
    background-color: inherit;
  }
`;

export const MethodOption = styled(Box)<{ active?: boolean }>`
  ${({ active, theme }) => active && `background-color: ${theme.actionHover}`};

  &:hover {
    background-color: ${({ theme }) => theme.actionHover};
  }
`;
