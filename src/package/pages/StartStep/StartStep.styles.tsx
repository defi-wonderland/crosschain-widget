import styled from "styled-components";

import { Box, FONT_SIZE_16, Text } from "~/components";
import writeIcon from "~/assets/add_address.svg";
import { PropTheme } from "~/types";

/* ------------------ StartStep styles ------------------ */

export const SText = styled(Text)`
  margin: 12px auto 7px;
`;

/* ------------------ ChainSection styles ------------------ */

export const ChainOption = styled(Box)<{ active?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 10px;
  padding: 12px;
  border-bottom: ${({ theme }) => theme.borderPrimary};
  border-radius: 0;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.actionHover};
  }

  & p {
    background-color: inherit;
  }

  ${({ active, theme }) => active && `background-color: ${theme.actionHover}`};
`;

export const ChainContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 12px;
`;

/* ------------------ SafeSection styles ------------------ */

export const SafeContainer = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 25px;

  & section button {
    width: 248px;
  }
  & section section {
    max-height: 130px;
  }
`;

export const SafeOption = styled(ChainOption)`
  border-bottom: none;

  & p {
    font-weight: normal;
  }
`;

export const WriteIcon = styled.img.attrs({
  src: writeIcon,
  alt: "",
})<{ lightTheme?: boolean }>`
  width: 16px;
  opacity: 0.87;
  ${({ lightTheme }) => !lightTheme && "filter: invert(1)"};
  background-color: inherit;
  color: inherit;
  border-radius: inherit;
`;

export const CustomInput = styled.input`
  width: 100%;
  margin: 0;
  padding: 0;
  border: none;
  background-color: ${({ theme }: PropTheme) => theme.background};
  color: ${({ theme }: PropTheme) => theme.textPrimary};
  font-size: ${FONT_SIZE_16};
  cursor: pointer;
  font-weight: 400;
  line-height: 19px;
  display: flex;
  align-items: center;
  border-radius: 0;

  &:disabled {
    user-select: none;
  }

  &:focus-visible {
    outline: none;
  }
`;
