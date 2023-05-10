import styled from "styled-components";

import { Text, FONT_SIZE_16, FONT_SIZE_12 } from "~/components";
import trash from "~/assets/bin.svg";

export const OnwersList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin: 8px 0;
`;

export const ThresoldContainer = styled.div`
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
    margin-top: -10px;
    max-height: 100px;
  }

  & section section p {
    text-align: center;
    margin: 8px 0;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
      transition: transform 200ms;
    }
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
    opacity: 0.4;
    transition: opacity 200ms;
  }
`;

export const YourWalletMsg = styled(Text)`
  font-size: ${FONT_SIZE_12};
  opacity: 0.6;
  margin-top: -10px;
  margin-left: 14px;
`;

export const TrashIcon = styled.img.attrs({
  src: trash,
  alt: "delete owner",
})`
  filter: invert(1);
  width: 16px;
`;

export const DeleteButton = styled.button`
  border-radius: none;
  border: none;
  background-color: inherit;
  color: inherit;
  padding: 0;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: transform 200ms;
  }
`;
