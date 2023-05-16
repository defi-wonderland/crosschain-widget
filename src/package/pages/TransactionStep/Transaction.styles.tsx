import styled from "styled-components";

export const TransactionTitleContainer = styled.div`
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

export const DropdownContainer = styled.div`
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
    margin-top: -10px;
    max-height: 140px;
  }

  & section section p {
    text-align: start;
    margin: 8px 0;
    cursor: pointer;
    padding: 4px 12px;
    transition: transform 200ms;

    &:hover {
      transform: scale(1.01);
    }
  }
`;
