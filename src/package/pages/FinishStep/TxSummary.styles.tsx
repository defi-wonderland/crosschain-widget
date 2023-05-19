import styled from "styled-components";

import { Text } from "~/components";
import { PropTheme } from "~/types";
import copyIcon from "~/assets/copy.svg";
import checkIcon from "~/assets/checkmark.svg";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  & .details-section {
    display: none;
  }

  & .details-section.show {
    display: block;
    animation: slide-down 0.5s ease-out;
  }

  @keyframes slide-down {
    0% {
      transform: translateY(-5%);
    }
    100% {
      transform: translateY(0%);
    }
  }
`;

export const TitleContainer = styled.button`
  border: none;
  border-top: ${({ theme }: PropTheme) => theme.borderPrimary};
  background-color: ${({ theme }: PropTheme) => theme.background};
  color: inherit;
  cursor: pointer;
  font-size: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 28px 0;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: start;
  align-items: center;
  margin-bottom: 10px;
`;

export const DetailText = styled(Text)<{ isOpaque?: boolean }>`
  font-size: 14px;
  min-width: 70px;
  ${({ isOpaque }) => isOpaque && "opacity: 0.8;"}
`;

export const ToggleSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  margin-top: 24px;
  gap: 8px;

  & p {
    min-width: auto;
  }
`;

export const DetailsSection = styled.div`
  width: 100%;
  margin-bottom: -10px;
`;

export const DetailValue = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  cursor: pointer;

  &:hover img {
    opacity: 0.6;
    transition: opacity 0.2s ease-in-out;
  }

  & p {
    min-width: auto;
  }
`;

export const CopyIcon = styled.img.attrs({
  src: copyIcon,
  alt: "copy",
})<{ lightTheme?: boolean }>`
  height: 14px;
  margin: auto 0;
  ${({ lightTheme }) => !lightTheme && "filter: invert(1)"};
  opacity: 0;
`;

export const CheckIcon = styled.img.attrs({
  src: checkIcon,
  alt: "check",
})<{ lightTheme?: boolean }>`
  height: 14px;
  margin: auto 0;
  ${({ lightTheme }) => !lightTheme && "filter: invert(1)"};
  opacity: 0;
`;
