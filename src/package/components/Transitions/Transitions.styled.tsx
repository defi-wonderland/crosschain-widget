import { TransitionGroup } from "react-transition-group";
import styled from "styled-components";

import { Box } from "../Box";

export const StyledModals = styled(TransitionGroup)<{ modal?: string }>`
  ${({ modal }) =>
    modal === "true" &&
    `
    position: fixed;
    top: 0;
    left: 0;
  `}

  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1000;

  .slideBottom-enter {
    opacity: 0;
    transform: translate3d(5%, 0, 0);
    transition: opacity 200ms ease, transform 200ms ease;
  }
  .slideBottom-enter-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  .slideBottom-exit-active {
    opacity: 0;
    display: none;
    transform: translate3d(5%, 0, 0);
    transition: opacity 200ms ease, transform 200ms cubic-bezier(1, 0.5, 0.8, 1);
  }
`;

export const StyledBackdrop = styled(Box)`
  @media (min-width: 960px) {
    .backdrop {
      backdrop-filter: blur(3px);
    }

    .backdrop {
      background-color: inherit;
      border-radius: inherit;
      color: inherit;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      pointer-events: all;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 5;
    }

    .opacity-enter {
      opacity: 0;
      transition: opacity 200ms ease-in-out;
    }
    .opacity-enter-active {
      opacity: 1;
    }
    .opacity-exit-active {
      opacity: 0;
      transition: opacity 200ms ease-in-out;
    }
  }
`;
