import styled from "styled-components";

export const ChainOption = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 10px;
  padding: 12px;
  border-bottom: ${({ theme }) => theme.borderPrimary};
  cursor: pointer;
`;

export const ChainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const ArrowIcon = styled.div`
  width: 0;
  height: 0;
  border-bottom: 6px solid transparent;
  border-top: 6px solid transparent;
  border-left: 6px solid white;
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
