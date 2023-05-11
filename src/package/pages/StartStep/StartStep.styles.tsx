import styled from "styled-components";

import { Text } from "~/components";

export const ChainOption = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 10px;
  padding: 12px;
  border-bottom: ${({ theme }) => theme.borderPrimary};
  cursor: pointer;
  transition: transform 200ms;

  &:hover {
    transform: scale(1.01);
  }
`;

export const ChainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const SafeContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 25px;

  & section button {
    width: 248px;
  }
`;

export const SText = styled(Text)`
  margin: 12px auto 7px;
`;
